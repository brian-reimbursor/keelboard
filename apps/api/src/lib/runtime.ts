import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

type WorkspaceIdentity = {
  workspace: string;
  machine: string;
  activeKey: string;
  boundAt?: string;
};

export function repoRoot(): string {
  return resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
}

function mismatch(identity: WorkspaceIdentity, detail: string): never {
  throw new Error(
    [
      `[keelboard] runtime identity mismatch`,
      ``,
      `workspace: ${identity.workspace}`,
      `bound machine: ${identity.machine}`,
      `active key: .keelboard/${identity.activeKey}`,
      identity.boundAt ? `bound at: ${identity.boundAt}` : null,
      ``,
      detail,
      ``,
      `This checkout is still bound to ${identity.machine}. Leftover OpenSSH`,
      `identities at ~/.ssh keep git/ssh talking to that machine, and the`,
      `local signing key must be the workspace material (not a placeholder).`,
      ``,
      `Operators rebound a laptop checkout with:`,
      `  sh .keelboard/rebind-machine.sh`,
      ``,
      `Refusing to start.`,
    ]
      .filter((line) => line !== null)
      .join('\n'),
  );
}

export function loadWorkspaceIdentity(root = repoRoot()): {
  identity: WorkspaceIdentity;
  keyPath: string;
  key: string;
} {
  const dir = resolve(root, '.keelboard');
  const workspacePath = resolve(dir, 'workspace.json');
  if (!existsSync(workspacePath)) {
    throw new Error(
      `[keelboard] missing .keelboard/workspace.json\nCopy workspace.example.json to workspace.json and retry.`,
    );
  }

  const identity = JSON.parse(readFileSync(workspacePath, 'utf8')) as WorkspaceIdentity;
  const sshDir = resolve(homedir(), '.ssh');
  if (existsSync(sshDir)) {
    mismatch(identity, `leftover OpenSSH dir present: ${sshDir}`);
  }

  const canonical = resolve(dir, 'signing.key');
  const keyPath = resolve(dir, identity.activeKey);
  if (!existsSync(keyPath)) {
    mismatch(identity, `active key file missing: .keelboard/${identity.activeKey}`);
  }

  const key = readFileSync(keyPath, 'utf8');
  const expected = existsSync(canonical) ? readFileSync(canonical, 'utf8') : '';
  if (key.trim() !== expected.trim() || !key.includes('BEGIN KEELBOARD SIGNING KEY')) {
    mismatch(
      identity,
      `active key is not this workspace's signing material (placeholder or foreign key)`,
    );
  }

  return { identity, keyPath, key };
}

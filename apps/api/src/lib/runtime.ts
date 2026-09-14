import { existsSync, readFileSync } from 'node:fs';
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
  const keyPath = resolve(dir, identity.activeKey);
  if (!existsSync(keyPath)) {
    throw new Error(
      [
        `[keelboard] runtime identity mismatch`,
        ``,
        `workspace: ${identity.workspace}`,
        `bound machine: ${identity.machine}`,
        `active key: .keelboard/${identity.activeKey} (missing)`,
        identity.boundAt ? `bound at: ${identity.boundAt}` : null,
        ``,
        `The API refuses to mint demo sessions without the local signing material`,
        `this checkout expects. This is common when the tree is copied onto a new`,
        `laptop while an older identity is still recorded in .keelboard/workspace.json.`,
        ``,
        `Leftover OpenSSH identities from maya-mbp will also keep git/ssh bound to`,
        `the previous machine. Operators rebound a laptop checkout with:`,
        `  sh .keelboard/rebind-machine.sh`,
        ``,
        `Refusing to start.`,
      ]
        .filter((line) => line !== null)
        .join('\n'),
    );
  }

  return {
    identity,
    keyPath,
    key: readFileSync(keyPath, 'utf8'),
  };
}

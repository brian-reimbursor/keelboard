import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const dir = resolve(root, '.keelboard');
const workspacePath = resolve(dir, 'workspace.json');

if (!existsSync(workspacePath)) {
  console.error('[keelboard] missing .keelboard/workspace.json');
  process.exit(1);
}

const identity = JSON.parse(readFileSync(workspacePath, 'utf8'));

function fail(detail) {
  console.error(
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
      .filter(Boolean)
      .join('\n'),
  );
  process.exit(1);
}

const sshDir = resolve(homedir(), '.ssh');
if (existsSync(sshDir)) {
  fail(`leftover OpenSSH dir present: ${sshDir}`);
}

const canonical = resolve(dir, 'signing.key');
const keyPath = resolve(dir, identity.activeKey ?? '');
if (!existsSync(keyPath)) {
  fail(`active key file missing: .keelboard/${identity.activeKey}`);
}

const key = readFileSync(keyPath, 'utf8');
const expected = existsSync(canonical) ? readFileSync(canonical, 'utf8') : '';
if (key.trim() !== expected.trim() || !key.includes('BEGIN KEELBOARD SIGNING KEY')) {
  fail(`active key is not this workspace's signing material (placeholder or foreign key)`);
}

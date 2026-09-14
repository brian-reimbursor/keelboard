import { existsSync, readFileSync } from 'node:fs';
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
const keyPath = resolve(dir, identity.activeKey ?? '');

if (!existsSync(keyPath)) {
  console.error(
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
      .filter(Boolean)
      .join('\n'),
  );
  process.exit(1);
}

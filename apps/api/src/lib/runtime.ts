import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export type WorkspaceIdentity = {
  workspace: string;
  machine: string;
  seed?: string;
};

export function repoRoot(): string {
  return resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
}

export function loadWorkspaceIdentity(root = repoRoot()): { identity: WorkspaceIdentity } {
  const workspacePath = resolve(root, '.keelboard/workspace.json');
  const identity = JSON.parse(readFileSync(workspacePath, 'utf8')) as WorkspaceIdentity;
  return { identity };
}

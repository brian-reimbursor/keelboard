#!/usr/bin/env npx tsx
import { KeelboardClient } from '@keelboard/sdk';

const base = process.env.KEELBOARD_URL ?? 'http://localhost:4000';
const client = new KeelboardClient(base);
const [cmd = 'help', ...rest] = process.argv.slice(2);

async function main() {
  if (cmd === 'health') {
    console.log(await client.health());
    return;
  }
  if (cmd === 'projects') {
    const { projects } = await client.projects();
    for (const p of projects) console.log(`${p.key.padEnd(6)} ${p.name}`);
    return;
  }
  if (cmd === 'issues') {
    const q = rest[0] ? `?project=${rest[0]}` : '';
    const { issues } = await client.issues(q);
    for (const i of issues) console.log(`${i.identifier.padEnd(10)} [${i.status}] ${i.title}`);
    return;
  }
  console.log(`keel <health|projects|issues [KEY]>
Talks to ${base}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

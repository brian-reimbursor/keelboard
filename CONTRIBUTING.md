# Contributing

Thanks for looking at Keelboard. The useful contributions are the boring ones: types that match the API, UI states that are not empty, tests that fail when a filter breaks.

## Setup

```bash
git clone git@github.com:brian-reimbursor/keelboard.git
cd keelboard
pnpm install
cp .env.example .env
pnpm dev
```

Node 20+ and pnpm 10 are required.

## Layout

- Domain types live in `packages/shared`. If you add an issue field, start there.
- Persistence contracts live in `packages/db`.
- HTTP handlers live in `apps/api/src/routes`.
- Screens live in `apps/web/src/app`.
- Reusable chrome lives in `apps/web/src/components`.

## Conventions

- No default exports except Next.js `page.tsx` / `layout.tsx`.
- Zod at the API boundary. Do not trust `req.body` as `any`.
- Status and priority are unions in `packages/shared`, not free strings.
- Seed data is deterministic. Do not randomize IDs in `seed.ts`.
- Keep the demo workspace coherent. If you add a project, add issues, members, and a wiki page.

## Checks

```bash
pnpm typecheck
pnpm test
pnpm lint
```

CI runs the same three jobs on every push to `main`.

## Pull requests

1. Branch from `main`.
2. One concern per PR.
3. Update docs if you change a route or a table.
4. Include a screenshot for UI work.

## Code of conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

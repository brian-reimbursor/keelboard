# Keelboard

Keelboard is an open-source workspace for product teams. Track issues, run cycles, keep a roadmap, and write team docs without leaving the board.

It is built as a TypeScript monorepo: a Fastify API, a Next.js app, shared types, a Drizzle schema, a TypeScript SDK, and a small CLI.

```
pnpm install
pnpm dev
```

- Web: http://localhost:3000
- API: http://localhost:4000
- Demo login: `maya@harbor.studio` / `keelboard`

## Why it exists

Most teams bounce between a tracker, a wiki, and a sprint spreadsheet. Keelboard keeps the work graph in one place:

- Issues with status, priority, estimates, labels, and blockers
- Projects with key prefixes (`NAV-142`)
- Cycles with capacity and burn-down
- Custom views (filters you can share)
- Team docs next to the work
- Activity, inbox, and insights

The default workspace is **Harbor Studio**, a seeded product org you can click through immediately. Demo mode uses an in-memory store so you can run the stack without Postgres.

## Monorepo

```
apps/
  api/          Fastify REST API (port 4000)
  web/          Next.js 15 App Router UI (port 3000)
packages/
  shared/       Zod schemas + domain types
  db/           Drizzle schema for Postgres
  ui/           Headless-ish presentational components
  sdk/          Typed API client
  cli/          `keel` command
docs/           Architecture, API, data model, product
```

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | API + web together |
| `pnpm test` | Vitest across packages |
| `pnpm typecheck` | `tsc --noEmit` in each package |
| `pnpm seed` | Re-load Harbor Studio demo data |
| `make docker-up` | Postgres + API + web |

## Demo workspace

Harbor Studio ships with six projects, eight people, three teams, four cycles, a backlog of issues, comments, wiki pages, and an insights snapshot.

| Project | Key | Focus |
| --- | --- | --- |
| Navigator | NAV | Customer-facing web app |
| Lighthouse | LTH | Public API + webhooks |
| Keel | KEEL | Platform / billing |
| Driftwood | DFT | Mobile |
| Marina | MAR | Internal admin |
| Beacon | BCN | Observability |

## Stack

- TypeScript 5
- Next.js 15 (App Router)
- Fastify 5
- Zod
- Drizzle ORM
- Postgres 16 (optional)
- pnpm workspaces
- Vitest
- Docker Compose

## Docs

- [Product](docs/product.md)
- [Architecture](docs/architecture.md)
- [Data model](docs/data-model.md)
- [HTTP API](docs/api.md)
- [Deployment](docs/deployment.md)
- [Contributing](CONTRIBUTING.md)

## License

MIT

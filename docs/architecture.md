# Architecture

```
browser  →  Next.js (apps/web)  →  Fastify (apps/api)  →  store
                                      │
                                      ├─ demo: in-memory (default)
                                      └─ prod: Postgres via Drizzle
```

## Boundaries

- `packages/shared` is the contract. Web, API, SDK, and CLI import types from here. They do not define parallel enums.
- `apps/api` owns mutations. The web app does not invent issue identifiers.
- `packages/db` is the SQL mapping. Demo mode does not import a live pool; it still shares column names with the schema so a later cutover is mechanical.
- `packages/sdk` is a thin fetch wrapper. The CLI uses it. The web app can use it or call `fetch` against the same routes.

## Request path

1. Browser hits `/inbox`, `/projects/NAV`, `/issues/NAV-142`, …
2. React Server Components render chrome. Issue lists currently load from the API on the client so the demo store stays the source of truth during `pnpm dev`.
3. `GET /v1/...` returns JSON matching Zod schemas in `packages/shared`.
4. Mutations (`POST`, `PATCH`) go through the same schemas, write the store, and append an activity event.

## Demo store

`apps/api/src/store` holds arrays of records. Seed runs at boot. Restarts reset the world. That is intentional for local exploration.

## Auth

Demo auth is a signed session cookie issued by `POST /v1/auth/login`. Credentials are public and documented. Production should replace this with SSO or magic links; the route shape stays.

## Extending

Add a field:

1. Zod schema in `packages/shared`
2. Column in `packages/db/src/schema`
3. Store type and seed row
4. Route handler
5. UI cell / form
6. Test

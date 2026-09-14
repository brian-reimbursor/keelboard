# Deployment

## Local

```bash
pnpm install
pnpm dev
```

No Postgres required. `DEMO_MODE` defaults to true.

## Docker

```bash
docker compose up --build
```

This starts Postgres, the API, and the web app. The API still boots in demo mode unless you change `DEMO_MODE`.

## Production sketch

1. Run Postgres 16.
2. Apply Drizzle migrations from `packages/db`.
3. Set `DEMO_MODE=false`, a real `SESSION_SECRET`, and `DATABASE_URL`.
4. Put the API behind TLS.
5. Point `NEXT_PUBLIC_API_URL` at the public API origin.
6. Disable demo credentials.

The current snapshot ships the schema and the demo store. The Postgres driver wiring is the next cut; do not point this revision at a public URL and expect durable tenants.

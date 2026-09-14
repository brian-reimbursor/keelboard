# ADR 0001 — In-memory demo store

## Status

Accepted for 0.1.

## Context

A new contributor should see Harbor Studio without installing Postgres. The product still needs a realistic board: dozens of issues, cycles, comments, wiki pages.

## Decision

Boot the API with `DEMO_MODE` (default true) and a deterministic in-memory graph defined in `apps/api/src/store/seed.ts`. Postgres schema lives in `packages/db` so a later cutover does not invent new column names.

## Consequences

Restarts wipe local mutations. That is acceptable for the snapshot. Do not point a public URL at this revision and expect durable tenants.

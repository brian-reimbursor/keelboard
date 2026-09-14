# HTTP API

Base URL: `http://localhost:4000/v1`

All JSON. Errors look like `{ "error": { "code": "not_found", "message": "..." } }`.

## Auth

| Method | Path | Notes |
| --- | --- | --- |
| POST | `/auth/login` | `{ email, password }` |
| POST | `/auth/logout` | Clears cookie |
| GET | `/auth/me` | Current user |

Demo users all share the password `keelboard`.

## Resources

| Method | Path |
| --- | --- |
| GET | `/health` |
| GET, POST | `/projects` |
| GET | `/projects/:key` |
| GET, POST | `/issues` |
| GET, PATCH | `/issues/:identifier` |
| GET, POST | `/issues/:identifier/comments` |
| GET | `/cycles` |
| GET | `/cycles/:id` |
| GET | `/teams` |
| GET | `/members` |
| GET | `/labels` |
| GET | `/views` |
| GET | `/wiki` |
| GET | `/wiki/:slug` |
| GET | `/activity` |
| GET | `/inbox` |
| GET | `/insights` |
| GET | `/search?q=` |
| GET, POST | `/webhooks` |
| PATCH | `/webhooks/:id` |

## Issue filters

`GET /issues` accepts:

- `project` project key
- `status` comma-separated
- `priority`
- `assignee` user id or `me`
- `cycle` cycle id
- `q` title search
- `limit` default 50

## Identifiers

Issues are addressed by `NAV-142`, not by internal UUID, in every public route.

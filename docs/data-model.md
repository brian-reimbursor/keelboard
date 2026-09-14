# Data model

Postgres-oriented. Demo mode mirrors these tables in memory.

## users

| Column | Type |
| --- | --- |
| id | text pk |
| name | text |
| email | text unique |
| handle | text unique |
| role | owner / admin / member / guest |
| title | text |
| team_id | text |
| avatar_hue | int |
| created_at | timestamptz |

## teams

| Column | Type |
| --- | --- |
| id | text pk |
| key | text unique |
| name | text |
| description | text |

## projects

| Column | Type |
| --- | --- |
| id | text pk |
| key | text unique |
| name | text |
| color | text |
| description | text |
| team_id | text |
| lead_id | text |
| status | active / paused / archived |

## issues

| Column | Type |
| --- | --- |
| id | text pk |
| number | int |
| identifier | text unique (NAV-142) |
| title | text |
| description | text |
| status | enum |
| priority | enum |
| estimate | int null |
| project_id | text |
| cycle_id | text null |
| assignee_id | text null |
| reporter_id | text |
| parent_id | text null |
| due_on | date null |
| created_at | timestamptz |
| updated_at | timestamptz |

## Supporting tables

- `labels` (id, name, color, project_id nullable)
- `issue_labels` (issue_id, label_id)
- `comments` (id, issue_id, author_id, body, created_at)
- `cycles` (id, project_id, name, start_on, end_on, status)
- `views` (id, name, filter_json, owner_id)
- `wiki_pages` (id, slug, title, body, updated_at)
- `activity_events` (id, type, actor_id, issue_id, payload, created_at)
- `notifications` (id, user_id, title, body, read, created_at)
- `webhooks` (id, url, events[], secret, active) — **user-configured outbound product webhooks**, never implicit

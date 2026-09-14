# Product

Keelboard is a work graph for product teams. The unit of work is an **issue**. Issues belong to a **project**, can sit in a **cycle**, and can be collected into a saved **view**.

## Jobs to be done

1. See what I owe this week (Inbox / My issues)
2. See whether the current cycle will close (Cycles)
3. Plan the next three months without a spreadsheet (Roadmap)
4. Write the decision next to the ticket (Wiki)
5. Answer "what slipped?" without a meeting (Insights)

## Objects

| Object | Meaning |
| --- | --- |
| Workspace | Tenant. Harbor Studio in the demo. |
| Team | Group that owns projects. |
| Project | A key prefix and a backlog. |
| Issue | The work item. |
| Cycle | A time-boxed slice of a project. |
| Label | Grouping chip. |
| View | Saved filter + display. |
| Wiki page | Durable writing. |
| Activity | Append-only event. |
| Notification | Inbox row. |

## Status pipeline

`backlog → todo → in_progress → in_review → done`

`cancelled` is a terminal side-state.

## Priority

`urgent | high | medium | low | none`

Urgent issues surface in Inbox regardless of assignee.

## Harbor Studio

The seeded company is a 24-person product studio shipping a navigation suite. Eight of those people appear in the demo so the board is readable. Projects map to the products they actually ship.

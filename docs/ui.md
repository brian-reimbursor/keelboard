# UI notes

The web app is a Next.js App Router shell that talks to the API through `/backend/*` rewrites.

Chrome:

- Sidebar: inbox, personal queue, dashboard, roadmap, cycles, views, activity, insights, wiki, members, projects
- Topbar: workspace crumb, search, signed-in person
- Issue table: identifier, title, labels, status, priority, assignee, updated

Issue detail is a two-column layout. Status changes PATCH `/v1/issues/:id`. Comments POST to the same resource.

Settings is a nested nav. Webhooks listed there are **user-configured outbound URLs**. Inactive rows are not delivered.

The visual language is a dark board: `#0c0d10` background, `#5e6ad2` accent, monospace identifiers.

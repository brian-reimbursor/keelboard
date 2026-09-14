'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { client, type HydratedIssue, type HydratedProject, type Insights } from '@/lib/api';
import { IssueTable } from '@/components/issues/IssueTable';

export default function DashboardPage() {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [projects, setProjects] = useState<HydratedProject[]>([]);
  const [recent, setRecent] = useState<HydratedIssue[]>([]);

  useEffect(() => {
    client.insights().then((d) => setInsights(d.insights));
    client.projects().then((d) => setProjects(d.projects));
    client.issues('?limit=8').then((d) => setRecent(d.issues));
  }, []);

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Harbor Studio at a glance — open work, cycle progress, and the live board.</p>
        </div>
      </div>
      {insights ? (
        <div className="grid-cards" style={{ marginBottom: 22 }}>
          <div className="card">
            <h3>Open issues</h3>
            <div className="stat">{insights.openIssues}</div>
          </div>
          <div className="card">
            <h3>Cycle progress</h3>
            <div className="stat">{insights.cycleProgress}%</div>
            <div className="bar" style={{ marginTop: 10 }}>
              <span style={{ width: `${insights.cycleProgress}%` }} />
            </div>
          </div>
          <div className="card">
            <h3>Urgent</h3>
            <div className="stat">{insights.urgentOpen}</div>
          </div>
          <div className="card">
            <h3>Unassigned</h3>
            <div className="stat">{insights.unassigned}</div>
          </div>
        </div>
      ) : null}
      <h2 style={{ fontSize: 14 }}>Projects</h2>
      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)', margin: '10px 0 24px' }}>
        {projects.map((p) => (
          <Link key={p.key} href={`/projects/${p.key}`} className="card">
            <h3>
              <span className="dot" style={{ background: p.color, display: 'inline-block', marginRight: 8 }} />
              {p.key} · {p.name}
            </h3>
            <p className="muted" style={{ fontSize: 13, margin: '8px 0' }}>
              {p.description}
            </p>
            <div className="stat" style={{ fontSize: 22 }}>
              {p.issueCount} open
            </div>
          </Link>
        ))}
      </div>
      <h2 style={{ fontSize: 14, marginBottom: 10 }}>Recently updated</h2>
      <IssueTable issues={recent} />
    </div>
  );
}

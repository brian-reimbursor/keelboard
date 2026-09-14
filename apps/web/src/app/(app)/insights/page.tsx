'use client';

import { useEffect, useState } from 'react';
import { client, type Insights } from '@/lib/api';

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insights | null>(null);
  useEffect(() => {
    client.insights().then((d) => setInsights(d.insights));
  }, []);
  if (!insights) return <p className="muted">Computing…</p>;
  const max = Math.max(...insights.throughput.map((t) => Math.max(t.created, t.completed)), 1);
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Insights</h1>
          <p>Counts, not vibes. Cycle 24 is the active Navigator slice.</p>
        </div>
      </div>
      <div className="grid-cards" style={{ marginBottom: 22 }}>
        <div className="card">
          <h3>Open</h3>
          <div className="stat">{insights.openIssues}</div>
        </div>
        <div className="card">
          <h3>Done this cycle</h3>
          <div className="stat">{insights.doneThisCycle}</div>
        </div>
        <div className="card">
          <h3>Urgent open</h3>
          <div className="stat">{insights.urgentOpen}</div>
        </div>
        <div className="card">
          <h3>Unassigned</h3>
          <div className="stat">{insights.unassigned}</div>
        </div>
      </div>
      <div className="split">
        <div className="panel">
          <h3>By status</h3>
          {Object.entries(insights.byStatus).map(([k, v]) => (
            <div key={k} className="meta-row">
              <span>{k}</span>
              {v}
            </div>
          ))}
        </div>
        <div className="panel">
          <h3>Throughput</h3>
          {insights.throughput.map((t) => (
            <div key={t.week} style={{ marginBottom: 10 }}>
              <div className="muted" style={{ fontSize: 12 }}>
                {t.week} · created {t.created} · done {t.completed}
              </div>
              <div className="bar">
                <span style={{ width: `${(t.completed / max) * 100}%`, background: 'var(--good)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="panel" style={{ marginTop: 16 }}>
        <h3>By project</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Open</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {insights.byProject.map((p) => (
              <tr key={p.key}>
                <td>
                  {p.key} {p.name}
                </td>
                <td>{p.open}</td>
                <td>{p.done}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

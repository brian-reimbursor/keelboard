'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IssueTable } from '@/components/issues/IssueTable';
import { client, type Inbox } from '@/lib/api';
import { relativeTime } from '@/lib/format';

export default function InboxPage() {
  const [data, setData] = useState<Inbox | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    client
      .inbox()
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!data) return <p className="muted">Loading inbox…</p>;

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Inbox</h1>
          <p>Assigned to you, plus anything urgent in Harbor Studio.</p>
        </div>
      </div>
      <div className="grid-cards" style={{ marginBottom: 22 }}>
        <div className="card">
          <h3>Assigned</h3>
          <div className="stat">{data.assigned.length}</div>
        </div>
        <div className="card">
          <h3>Urgent open</h3>
          <div className="stat">{data.urgent.length}</div>
        </div>
        <div className="card">
          <h3>Unread</h3>
          <div className="stat">{data.notifications.filter((n) => !n.read).length}</div>
        </div>
        <div className="card">
          <h3>Notifications</h3>
          <div className="stat">{data.notifications.length}</div>
        </div>
      </div>
      <h2 style={{ fontSize: 14, margin: '0 0 10px' }}>Assigned to Maya</h2>
      <IssueTable issues={data.assigned} />
      <h2 style={{ fontSize: 14, margin: '28px 0 10px' }}>Urgent across the workspace</h2>
      <IssueTable issues={data.urgent} />
      <h2 style={{ fontSize: 14, margin: '28px 0 10px' }}>Notifications</h2>
      <div className="list-block">
        {data.notifications.map((n) => (
          <Link
            key={n.id}
            href={n.href}
            style={{ display: 'block', padding: '12px 14px', borderBottom: '1px solid var(--line)' }}
          >
            <strong>{n.title}</strong>
            {!n.read ? (
              <span className="chip" style={{ marginLeft: 8, color: 'var(--accent-2)' }}>
                new
              </span>
            ) : null}
            <div className="muted">{n.body}</div>
            <div className="faint" style={{ fontSize: 12, marginTop: 4 }}>
              {relativeTime(n.createdAt)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

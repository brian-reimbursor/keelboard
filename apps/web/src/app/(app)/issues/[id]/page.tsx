'use client';

import { ISSUE_STATUSES } from '@keelboard/shared';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { client, type HydratedIssue } from '@/lib/api';
import { relativeTime } from '@/lib/format';
import { Avatar } from '@/components/ui/Avatar';
import { Priority } from '@/components/ui/Status';

export default function IssuePage() {
  const { id } = useParams<{ id: string }>();
  const [issue, setIssue] = useState<HydratedIssue | null>(null);
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  function load() {
    client
      .issue(id)
      .then((d) => setIssue(d.issue))
      .catch((e) => setError(e.message));
  }

  useEffect(load, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!issue) return <p className="muted">Loading issue…</p>;

  return (
    <div className="issue-hero">
      <div>
        <div className="page-head">
          <div>
            <p className="ident" style={{ width: 'auto' }}>
              {issue.identifier}
            </p>
            <h1>{issue.title}</h1>
          </div>
        </div>
        <div className="md" style={{ whiteSpace: 'pre-wrap', marginBottom: 28 }}>
          {issue.description}
        </div>
        <h2 style={{ fontSize: 14 }}>Comments</h2>
        {(issue.comments ?? []).map((c) => (
          <div className="comment" key={c.id}>
            <span className="who">{c.authorId.replace('usr_', '')}</span>
            <span className="when">{relativeTime(c.createdAt)}</span>
            <div>{c.body}</div>
          </div>
        ))}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await client.comment(issue.identifier, body);
            setBody('');
            load();
          }}
          style={{ marginTop: 12 }}
        >
          <textarea
            className="search"
            style={{ width: '100%', minHeight: 80 }}
            placeholder="Leave a comment"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button className="btn primary" style={{ marginTop: 8 }} disabled={!body.trim()}>
            Comment
          </button>
        </form>
      </div>
      <aside className="panel">
        <div className="meta-row">
          <span>Status</span>
          <select
            className="search"
            style={{ minWidth: 140 }}
            value={issue.status}
            onChange={async (e) => {
              const next = await client.patchIssue(issue.identifier, { status: e.target.value });
              setIssue(next.issue);
            }}
          >
            {ISSUE_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="meta-row">
          <span>Priority</span>
          <Priority value={issue.priority} />
        </div>
        <div className="meta-row">
          <span>Assignee</span>
          {issue.assignee ? (
            <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
              <Avatar name={issue.assignee.name} hue={issue.assignee.avatarHue} />
              {issue.assignee.name}
            </span>
          ) : (
            'Unassigned'
          )}
        </div>
        <div className="meta-row">
          <span>Reporter</span>
          {issue.reporter.name}
        </div>
        <div className="meta-row">
          <span>Estimate</span>
          {issue.estimate ?? '—'}
        </div>
        <div className="meta-row">
          <span>Due</span>
          {issue.dueOn ?? '—'}
        </div>
        <div className="meta-row">
          <span>Project</span>
          {issue.projectKey}
        </div>
        <div className="meta-row">
          <span>Labels</span>
          <span className="chips">
            {issue.labels.map((l) => (
              <span key={l.id} className="chip">
                {l.name}
              </span>
            ))}
          </span>
        </div>
      </aside>
    </div>
  );
}

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IssueTable } from '@/components/issues/IssueTable';
import { client, type HydratedIssue, type SavedView } from '@/lib/api';

export default function ViewDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [view, setView] = useState<SavedView | null>(null);
  const [issues, setIssues] = useState<HydratedIssue[]>([]);

  useEffect(() => {
    client.views().then((d) => {
      const v = d.views.find((x) => x.id === id) ?? null;
      setView(v);
      if (!v) return;
      const params = new URLSearchParams();
      if (v.filter.status?.length) params.set('status', v.filter.status.join(','));
      if (v.filter.priority?.length) params.set('priority', v.filter.priority.join(','));
      if (v.filter.project) params.set('project', v.filter.project);
      if (v.filter.assignee === 'none') params.set('assignee', 'none');
      else if (v.filter.assignee) params.set('assignee', v.filter.assignee);
      client.issues(`?${params.toString()}`).then((r) => setIssues(r.issues));
    });
  }, [id]);

  if (!view) return <p className="muted">Loading view…</p>;
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>{view.name}</h1>
          <p>{view.description}</p>
        </div>
      </div>
      <IssueTable issues={issues} />
    </div>
  );
}

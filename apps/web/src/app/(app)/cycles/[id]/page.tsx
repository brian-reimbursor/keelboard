'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IssueTable } from '@/components/issues/IssueTable';
import { client, type Cycle, type HydratedIssue } from '@/lib/api';

export default function CycleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [cycle, setCycle] = useState<Cycle | null>(null);
  const [issues, setIssues] = useState<HydratedIssue[]>([]);
  useEffect(() => {
    client.cycle(id).then((d) => {
      setCycle(d.cycle);
      setIssues(d.issues as HydratedIssue[]);
    });
  }, [id]);
  if (!cycle) return <p className="muted">Loading cycle…</p>;
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>{cycle.name}</h1>
          <p>
            {cycle.goal} · {cycle.startOn} → {cycle.endOn}
          </p>
        </div>
      </div>
      <IssueTable issues={issues} />
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { client, type HydratedIssue } from '@/lib/api';

const COLS = [
  ['Now', ['in_progress', 'in_review']],
  ['Next', ['todo']],
  ['Later', ['backlog']],
] as const;

export default function RoadmapPage() {
  const [issues, setIssues] = useState<HydratedIssue[]>([]);
  useEffect(() => {
    client.issues('?limit=80').then((d) => setIssues(d.issues.filter((i) => i.status !== 'done' && i.status !== 'cancelled')));
  }, []);
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Roadmap</h1>
          <p>Now / Next / Later across every Harbor Studio project.</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {COLS.map(([label, statuses]) => (
          <div key={label} className="panel">
            <h3 style={{ marginTop: 0 }}>{label}</h3>
            {issues
              .filter((i) => (statuses as readonly string[]).includes(i.status))
              .map((i) => (
                <Link
                  key={i.id}
                  href={`/issues/${i.identifier}`}
                  style={{ display: 'block', padding: '8px 0', borderBottom: '1px solid var(--line)' }}
                >
                  <div className="ident" style={{ width: 'auto' }}>
                    {i.identifier}
                  </div>
                  <div>{i.title}</div>
                </Link>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { client, type CycleStat } from '@/lib/api';

export default function CyclesPage() {
  const [cycles, setCycles] = useState<CycleStat[]>([]);
  useEffect(() => {
    client.cycles().then((d) => setCycles(d.cycles));
  }, []);
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Cycles</h1>
          <p>Time-boxed slices of a project. Active ones are the ones that can still slip.</p>
        </div>
      </div>
      <div className="grid-cards" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {cycles.map((c) => {
          const pct = c.total ? Math.round((c.done / c.total) * 100) : 0;
          return (
            <Link key={c.id} href={`/cycles/${c.id}`} className="card">
              <h3>
                {c.projectKey} · {c.status}
              </h3>
              <div style={{ fontSize: 18, fontWeight: 650, margin: '8px 0' }}>{c.name}</div>
              <p className="muted" style={{ fontSize: 13 }}>
                {c.goal}
              </p>
              <p className="faint" style={{ fontSize: 12 }}>
                {c.startOn} → {c.endOn} · {c.done}/{c.total} done
              </p>
              <div className="bar" style={{ marginTop: 10 }}>
                <span style={{ width: `${pct}%` }} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

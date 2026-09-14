'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { client, type SavedView } from '@/lib/api';

export default function ViewsPage() {
  const [views, setViews] = useState<SavedView[]>([]);
  useEffect(() => {
    client.views().then((d) => setViews(d.views));
  }, []);
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Views</h1>
          <p>Saved filters the team actually uses.</p>
        </div>
      </div>
      <div className="grid-cards" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {views.map((v) => (
          <Link key={v.id} href={`/views/${v.id}`} className="card">
            <h3>{v.name}</h3>
            <p className="muted" style={{ fontSize: 13 }}>
              {v.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

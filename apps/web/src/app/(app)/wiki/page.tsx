'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { client, type WikiPage } from '@/lib/api';
import { relativeTime } from '@/lib/format';

export default function WikiIndexPage() {
  const [pages, setPages] = useState<WikiPage[]>([]);
  useEffect(() => {
    client.wiki().then((d) => setPages(d.pages));
  }, []);
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Wiki</h1>
          <p>Handbooks and runbooks that belong next to the board.</p>
        </div>
      </div>
      <div className="list-block">
        {pages.map((p) => (
          <Link
            key={p.id}
            href={`/wiki/${p.slug}`}
            style={{ display: 'block', padding: '14px 16px', borderBottom: '1px solid var(--line)' }}
          >
            <strong>{p.title}</strong>
            <div className="muted">/{p.slug}</div>
            <div className="faint" style={{ fontSize: 12 }}>
              Updated {relativeTime(p.updatedAt)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

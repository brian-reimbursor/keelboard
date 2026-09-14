'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { client, type SearchResult } from '@/lib/api';

function SearchInner() {
  const params = useSearchParams();
  const q = params.get('q') ?? '';
  const [result, setResult] = useState<SearchResult | null>(null);
  useEffect(() => {
    if (!q) return;
    client.search(q).then(setResult);
  }, [q]);
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Search</h1>
          <p>Query: {q || 'type something in the top bar'}</p>
        </div>
      </div>
      {result ? (
        <div className="split">
          <div className="panel">
            <h3>Issues</h3>
            {result.issues.map((i) => (
              <Link key={i.identifier} href={`/issues/${i.identifier}`} style={{ display: 'block', padding: '8px 0' }}>
                <span className="ident">{i.identifier}</span> {i.title}
              </Link>
            ))}
          </div>
          <div className="panel">
            <h3>Wiki</h3>
            {result.wiki.map((w) => (
              <Link key={w.slug} href={`/wiki/${w.slug}`} style={{ display: 'block', padding: '8px 0' }}>
                {w.title}
              </Link>
            ))}
            <h3>Projects</h3>
            {result.projects.map((p) => (
              <Link key={p.key} href={`/projects/${p.key}`} style={{ display: 'block', padding: '8px 0' }}>
                {p.key} {p.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="muted">Search…</p>}>
      <SearchInner />
    </Suspense>
  );
}

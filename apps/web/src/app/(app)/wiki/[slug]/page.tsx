'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Markdown } from '@/components/wiki/Markdown';
import { client, type WikiPage } from '@/lib/api';

export default function WikiDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<WikiPage | null>(null);
  useEffect(() => {
    client.wikiPage(slug).then((d) => setPage(d.page));
  }, [slug]);
  if (!page) return <p className="muted">Loading page…</p>;
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>{page.title}</h1>
          <p>/{page.slug}</p>
        </div>
      </div>
      <div className="panel">
        <Markdown body={page.body} />
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { client } from '@/lib/api';

export function CreateIssueForm({ projectKey }: { projectKey: string }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
          const { issue } = await client.createIssue({ title, projectKey, description: '' });
          router.push(`/issues/${issue.identifier}`);
        } finally {
          setBusy(false);
        }
      }}
      style={{ display: 'flex', gap: 8 }}
    >
      <input
        className="search"
        placeholder={`New ${projectKey} issue`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn primary" disabled={busy || title.trim().length < 3}>
        Create
      </button>
    </form>
  );
}

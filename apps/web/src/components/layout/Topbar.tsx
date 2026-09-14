'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { DemoUser } from '@/lib/api';
import { Avatar } from '../ui/Avatar';

export function Topbar({ user, title }: { user: DemoUser; title: string }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  return (
    <header className="topbar">
      <div className="crumb">
        Harbor Studio / <strong>{title}</strong>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search?q=${encodeURIComponent(q)}`);
        }}
      >
        <input
          className="search"
          placeholder="Search issues, wiki, projects"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </form>
      <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center', fontSize: 13 }}>
        <Avatar name={user.name} hue={user.avatarHue} />
        {user.name}
      </span>
    </header>
  );
}

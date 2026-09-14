'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ApiError, client, type DemoUser } from '@/lib/api';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppShell({ children, title }: { children: React.ReactNode; title: string }) {
  const router = useRouter();
  const path = usePathname();
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    client
      .me()
      .then((d) => setUser(d.user))
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) router.replace('/login');
      });
  }, [router, path]);

  if (!user) {
    return (
      <div className="page">
        <p className="muted">Loading Harbor Studio…</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main">
        <Topbar user={user} title={title} />
        <div className="page">{children}</div>
      </div>
    </div>
  );
}

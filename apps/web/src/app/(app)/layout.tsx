'use client';

import { AppShell } from '@/components/layout/AppShell';
import { usePathname } from 'next/navigation';

function titleFrom(path: string) {
  if (path.startsWith('/issues/')) return path.replace('/issues/', '');
  if (path.startsWith('/projects/')) return path.replace('/projects/', '');
  if (path.startsWith('/wiki/')) return 'Wiki';
  if (path.startsWith('/settings')) return 'Settings';
  if (path.startsWith('/cycles/')) return 'Cycle';
  if (path.startsWith('/teams/')) return 'Team';
  if (path.startsWith('/views/')) return 'View';
  const map: Record<string, string> = {
    '/inbox': 'Inbox',
    '/my-issues': 'My issues',
    '/dashboard': 'Dashboard',
    '/roadmap': 'Roadmap',
    '/cycles': 'Cycles',
    '/views': 'Views',
    '/activity': 'Activity',
    '/insights': 'Insights',
    '/wiki': 'Wiki',
    '/members': 'Members',
    '/teams': 'Teams',
    '/search': 'Search',
  };
  return map[path] ?? 'Keelboard';
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return <AppShell title={titleFrom(path)}>{children}</AppShell>;
}

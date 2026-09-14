'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { client, type HydratedProject } from '@/lib/api';

const MAIN = [
  ['Inbox', '/inbox'],
  ['My issues', '/my-issues'],
  ['Dashboard', '/dashboard'],
  ['Roadmap', '/roadmap'],
  ['Cycles', '/cycles'],
  ['Views', '/views'],
  ['Activity', '/activity'],
  ['Insights', '/insights'],
  ['Wiki', '/wiki'],
  ['Members', '/members'],
];

export function Sidebar() {
  const path = usePathname();
  const [projects, setProjects] = useState<HydratedProject[]>([]);

  useEffect(() => {
    client
      .projects()
      .then((d) => setProjects(d.projects))
      .catch(() => setProjects([]));
  }, []);

  return (
    <aside className="sidebar">
      <Link href="/inbox" className="brand">
        <span className="brand-mark" />
        Harbor Studio
      </Link>
      <nav className="nav-section">
        {MAIN.map(([label, href]) => (
          <Link key={href} href={href} className={`nav-link${path === href ? ' active' : ''}`}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="nav-section">
        <div className="nav-label">Projects</div>
        {projects.map((p) => (
          <Link
            key={p.key}
            href={`/projects/${p.key}`}
            className={`nav-link${path === `/projects/${p.key}` ? ' active' : ''}`}
          >
            <span className="dot" style={{ background: p.color }} />
            {p.name}
            <span className="faint" style={{ marginLeft: 'auto', fontSize: 11 }}>
              {p.issueCount}
            </span>
          </Link>
        ))}
      </div>
      <div className="nav-section" style={{ marginTop: 'auto' }}>
        <Link href="/settings/workspace" className={`nav-link${path.startsWith('/settings') ? ' active' : ''}`}>
          Settings
        </Link>
        <Link href="/teams" className={`nav-link${path.startsWith('/teams') ? ' active' : ''}`}>
          Teams
        </Link>
      </div>
    </aside>
  );
}

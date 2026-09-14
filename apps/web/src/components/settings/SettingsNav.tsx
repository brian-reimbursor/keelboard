'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  ['Workspace', '/settings/workspace'],
  ['Profile', '/settings/profile'],
  ['Notifications', '/settings/notifications'],
  ['API', '/settings/api'],
  ['Webhooks', '/settings/webhooks'],
  ['Billing', '/settings/billing'],
];

export function SettingsNav() {
  const path = usePathname();
  return (
    <div className="nav-section">
      {LINKS.map(([label, href]) => (
        <Link key={href} href={href} className={`nav-link${path === href ? ' active' : ''}`}>
          {label}
        </Link>
      ))}
    </div>
  );
}

'use client';

import { SettingsNav } from '@/components/settings/SettingsNav';

export default function WorkspaceSettingsPage() {
  return (
    <div className="split">
      <SettingsNav />
      <div>
        <div className="page-head">
          <div>
            <h1>Workspace</h1>
            <p>Harbor Studio is the seeded tenant. URL slug `harbor`.</p>
          </div>
        </div>
        <div className="panel">
          <div className="meta-row">
            <span>Name</span>Harbor Studio
          </div>
          <div className="meta-row">
            <span>Slug</span>harbor
          </div>
          <div className="meta-row">
            <span>Region</span>us-east-1 (demo)
          </div>
          <div className="meta-row">
            <span>Mode</span>In-memory demo store
          </div>
          <p className="muted" style={{ fontSize: 13, marginTop: 12 }}>
            Deleting a workspace in production soft-deletes for 14 days (MAR-6). The demo never deletes Harbor
            Studio.
          </p>
        </div>
      </div>
    </div>
  );
}

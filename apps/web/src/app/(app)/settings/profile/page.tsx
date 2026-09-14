'use client';

import { useEffect, useState } from 'react';
import { SettingsNav } from '@/components/settings/SettingsNav';
import { client, type DemoUser } from '@/lib/api';

export default function ProfileSettingsPage() {
  const [user, setUser] = useState<DemoUser | null>(null);
  useEffect(() => {
    client.me().then((d) => setUser(d.user));
  }, []);
  return (
    <div className="split">
      <SettingsNav />
      <div>
        <div className="page-head">
          <div>
            <h1>Profile</h1>
            <p>Signed-in member.</p>
          </div>
        </div>
        {user ? (
          <div className="panel">
            <div className="meta-row">
              <span>Name</span>
              {user.name}
            </div>
            <div className="meta-row">
              <span>Email</span>
              {user.email}
            </div>
            <div className="meta-row">
              <span>Handle</span>@{user.handle}
            </div>
            <div className="meta-row">
              <span>Title</span>
              {user.title}
            </div>
            <div className="meta-row">
              <span>Role</span>
              {user.role}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

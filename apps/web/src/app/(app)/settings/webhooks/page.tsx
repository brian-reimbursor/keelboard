'use client';

import { useEffect, useState } from 'react';
import { SettingsNav } from '@/components/settings/SettingsNav';
import { client, type WebhookRow } from '@/lib/api';

export default function WebhooksSettingsPage() {
  const [rows, setRows] = useState<WebhookRow[]>([]);
  useEffect(() => {
    client.webhooks().then((d) => setRows(d.webhooks));
  }, []);
  return (
    <div className="split">
      <SettingsNav />
      <div>
        <div className="page-head">
          <div>
            <h1>Webhooks</h1>
            <p>
              Outbound product webhooks that a workspace owner configures. Inactive rows are never called. The
              demo ships one disabled example pointing at example.com.
            </p>
          </div>
        </div>
        <div className="list-block">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>URL</th>
                <th>Events</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((w) => (
                <tr key={w.id}>
                  <td>{w.name}</td>
                  <td className="muted">{w.url}</td>
                  <td>{w.events.join(', ')}</td>
                  <td>{w.active ? 'yes' : 'no'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

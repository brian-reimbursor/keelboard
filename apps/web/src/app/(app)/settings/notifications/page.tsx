'use client';

import { SettingsNav } from '@/components/settings/SettingsNav';

export default function NotificationSettingsPage() {
  return (
    <div className="split">
      <SettingsNav />
      <div>
        <div className="page-head">
          <div>
            <h1>Notifications</h1>
            <p>Inbox rows are generated from assignment, comments, and urgent issues.</p>
          </div>
        </div>
        <div className="panel">
          {['Assigned to me', 'Comments on my issues', 'Urgent anywhere', 'Cycle start', 'Billing alerts'].map(
            (row) => (
              <div className="meta-row" key={row}>
                <span>{row}</span>
                <span className="chip">on</span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

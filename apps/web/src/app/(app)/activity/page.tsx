'use client';

import { useEffect, useState } from 'react';
import { client, type Activity } from '@/lib/api';
import { relativeTime } from '@/lib/format';

export default function ActivityPage() {
  const [rows, setRows] = useState<Activity[]>([]);
  useEffect(() => {
    client.activity().then((d) => setRows(d.activity));
  }, []);
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Activity</h1>
          <p>The last things that happened on the board.</p>
        </div>
      </div>
      <div className="list-block">
        {rows.map((a) => (
          <div key={a.id} style={{ padding: '12px 14px', borderBottom: '1px solid var(--line)' }}>
            <div>{a.message}</div>
            <div className="faint" style={{ fontSize: 12 }}>
              {a.type} · {relativeTime(a.createdAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { client, type Member } from '@/lib/api';
import { Avatar } from '@/components/ui/Avatar';

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    client.members().then((d) => setMembers(d.members));
  }, []);
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Members</h1>
          <p>Everyone in the Harbor Studio demo. Password for all accounts: keelboard.</p>
        </div>
      </div>
      <div className="list-block">
        <table className="table">
          <thead>
            <tr>
              <th>Person</th>
              <th>Title</th>
              <th>Team</th>
              <th>Role</th>
              <th>Open</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td>
                  <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                    <Avatar name={m.name} hue={m.avatarHue} />
                    {m.name}
                    <span className="muted">@{m.handle}</span>
                  </span>
                </td>
                <td className="muted">{m.title}</td>
                <td>{m.team?.name ?? '—'}</td>
                <td>{m.role}</td>
                <td>{m.openIssues}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

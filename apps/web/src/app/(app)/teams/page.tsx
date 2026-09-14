'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { client, type Team } from '@/lib/api';
import { Avatar } from '@/components/ui/Avatar';

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  useEffect(() => {
    client.teams().then((d) => setTeams(d.teams));
  }, []);
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Teams</h1>
          <p>Product, Platform, and Mobile — the three groups that own Harbor Studio.</p>
        </div>
      </div>
      <div className="grid-cards" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        {teams.map((t) => (
          <Link key={t.id} href={`/teams/${t.key}`} className="card">
            <h3>
              <span className="dot" style={{ background: t.color, display: 'inline-block', marginRight: 8 }} />
              {t.name}
            </h3>
            <p className="muted" style={{ fontSize: 13 }}>
              {t.description}
            </p>
            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              {t.members.map((m) => (
                <Avatar key={m.id} name={m.name} hue={m.avatarHue} />
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

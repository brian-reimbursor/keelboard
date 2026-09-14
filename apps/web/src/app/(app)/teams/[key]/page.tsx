'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { client, type Team } from '@/lib/api';
import { Avatar } from '@/components/ui/Avatar';

export default function TeamDetailPage() {
  const { key } = useParams<{ key: string }>();
  const [team, setTeam] = useState<Team | null>(null);
  useEffect(() => {
    client.teams().then((d) => setTeam(d.teams.find((t) => t.key === key) ?? null));
  }, [key]);
  if (!team) return <p className="muted">Loading team…</p>;
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>{team.name}</h1>
          <p>{team.description}</p>
        </div>
      </div>
      <h2 style={{ fontSize: 14 }}>Members</h2>
      <div className="list-block" style={{ marginBottom: 24 }}>
        {team.members.map((m) => (
          <div key={m.id} style={{ display: 'flex', gap: 10, padding: 12, borderBottom: '1px solid var(--line)' }}>
            <Avatar name={m.name} hue={m.avatarHue} size={28} />
            <div>
              <div>{m.name}</div>
              <div className="muted">{m.title}</div>
            </div>
          </div>
        ))}
      </div>
      <h2 style={{ fontSize: 14 }}>Projects</h2>
      <div className="chips">
        {team.projects.map((p) => (
          <Link key={p.key} className="chip" href={`/projects/${p.key}`}>
            <b>{p.key}</b> {p.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

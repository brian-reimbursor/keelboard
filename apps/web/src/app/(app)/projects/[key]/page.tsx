'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CreateIssueForm } from '@/components/issues/CreateIssueForm';
import { IssueTable } from '@/components/issues/IssueTable';
import { client, type HydratedIssue, type HydratedProject } from '@/lib/api';

export default function ProjectPage() {
  const { key } = useParams<{ key: string }>();
  const [project, setProject] = useState<HydratedProject | null>(null);
  const [issues, setIssues] = useState<HydratedIssue[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    client.project(key).then((d) => setProject(d.project));
  }, [key]);

  useEffect(() => {
    const q = status ? `?project=${key}&status=${status}` : `?project=${key}`;
    client.issues(q).then((d) => setIssues(d.issues));
  }, [key, status]);

  if (!project) return <p className="muted">Loading project…</p>;

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>
            <span className="dot" style={{ background: project.color, display: 'inline-block', marginRight: 8 }} />
            {project.key} {project.name}
          </h1>
          <p>
            {project.description} · Lead {project.lead?.name} · {project.team?.name}
          </p>
        </div>
        <CreateIssueForm projectKey={project.key} />
      </div>
      <div className="chips" style={{ marginBottom: 14 }}>
        {['', 'backlog', 'todo', 'in_progress', 'in_review', 'done'].map((s) => (
          <button
            key={s || 'all'}
            className="chip"
            onClick={() => setStatus(s)}
            style={{ cursor: 'pointer', borderColor: status === s ? 'var(--accent)' : undefined }}
          >
            {s || 'all'}
          </button>
        ))}
      </div>
      <IssueTable issues={issues} />
    </div>
  );
}

import Link from 'next/link';
import type { HydratedIssue } from '@/lib/api';
import { relativeTime } from '@/lib/format';
import { Avatar } from '../ui/Avatar';
import { Priority, Status } from '../ui/Status';

export function IssueTable({ issues }: { issues: HydratedIssue[] }) {
  if (!issues.length) {
    return <p className="muted">Nothing here. Either the filter is tight or the cycle is actually done.</p>;
  }
  return (
    <div className="list-block">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assignee</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id}>
              <td className="ident">{issue.identifier}</td>
              <td className="title-cell">
                <Link href={`/issues/${issue.identifier}`}>{issue.title}</Link>
                <div className="chips" style={{ marginTop: 4 }}>
                  {issue.labels?.map((l) => (
                    <span key={l.id} className="chip" style={{ borderColor: l.color, color: l.color }}>
                      {l.name}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <Status value={issue.status} />
              </td>
              <td>
                <Priority value={issue.priority} />
              </td>
              <td>
                {issue.assignee ? (
                  <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                    <Avatar name={issue.assignee.name} hue={issue.assignee.avatarHue} />
                    {issue.assignee.name.split(' ')[0]}
                  </span>
                ) : (
                  <span className="faint">Unassigned</span>
                )}
              </td>
              <td className="muted">{relativeTime(issue.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

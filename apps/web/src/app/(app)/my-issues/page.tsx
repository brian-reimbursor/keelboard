'use client';

import { useEffect, useState } from 'react';
import { IssueTable } from '@/components/issues/IssueTable';
import { client, type HydratedIssue } from '@/lib/api';

export default function MyIssuesPage() {
  const [issues, setIssues] = useState<HydratedIssue[]>([]);
  useEffect(() => {
    client.issues('?assignee=me').then((d) => setIssues(d.issues));
  }, []);
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>My issues</h1>
          <p>Everything assigned to the signed-in member, newest update first.</p>
        </div>
      </div>
      <IssueTable issues={issues} />
    </div>
  );
}

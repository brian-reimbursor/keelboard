import type { CreateIssue, Insights, Issue, IssuePriority, IssueStatus, PatchIssue } from '@keelboard/shared';
import { nid } from '../lib/ids.js';
import { buildSeed } from './seed.js';
import type { Store, StoredUser } from './types.js';

let store: Store = buildSeed();

export function getStore(): Store {
  return store;
}

export function resetStore(): void {
  store = buildSeed();
}

export function findUserByEmail(email: string): StoredUser | undefined {
  return store.users.find((u) => u.email === email);
}

export function findUser(id: string): StoredUser | undefined {
  return store.users.find((u) => u.id === id);
}

export function publicUser(user: StoredUser) {
  const { password: _password, ...rest } = user;
  return rest;
}

export function projectByKey(key: string) {
  return store.projects.find((p) => p.key.toLowerCase() === key.toLowerCase());
}

export function issueByIdentifier(identifier: string) {
  return store.issues.find((i) => i.identifier.toLowerCase() === identifier.toLowerCase());
}

export type IssueQuery = {
  project?: string;
  status?: string;
  priority?: string;
  assignee?: string;
  cycle?: string;
  q?: string;
  label?: string;
  limit?: number;
};

export function queryIssues(query: IssueQuery): Issue[] {
  let rows = [...store.issues];
  if (query.project) {
    const key = query.project.toUpperCase();
    rows = rows.filter((i) => i.projectKey === key);
  }
  if (query.status) {
    const set = new Set(query.status.split(','));
    rows = rows.filter((i) => set.has(i.status));
  }
  if (query.priority) {
    const set = new Set(query.priority.split(','));
    rows = rows.filter((i) => set.has(i.priority));
  }
  if (query.assignee === 'none') {
    rows = rows.filter((i) => !i.assigneeId);
  } else if (query.assignee && query.assignee !== 'me') {
    rows = rows.filter((i) => i.assigneeId === query.assignee);
  }
  if (query.cycle) rows = rows.filter((i) => i.cycleId === query.cycle);
  if (query.label) rows = rows.filter((i) => i.labelIds.includes(query.label!));
  if (query.q) {
    const q = query.q.toLowerCase();
    rows = rows.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.identifier.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q),
    );
  }
  rows.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const limit = query.limit ?? 80;
  return rows.slice(0, limit);
}

export function createIssue(input: CreateIssue, actorId: string): Issue {
  const project = projectByKey(input.projectKey);
  if (!project) throw Object.assign(new Error('Unknown project'), { statusCode: 400 });
  const n = (store.counters[project.key] ?? 0) + 1;
  store.counters[project.key] = n;
  const now = new Date().toISOString();
  const issue: Issue = {
    id: nid('iss'),
    number: n,
    identifier: `${project.key}-${n}`,
    title: input.title,
    description: input.description ?? '',
    status: input.status ?? 'backlog',
    priority: input.priority ?? 'none',
    estimate: input.estimate ?? null,
    projectId: project.id,
    projectKey: project.key,
    cycleId: input.cycleId ?? null,
    assigneeId: input.assigneeId ?? null,
    reporterId: actorId,
    parentId: null,
    labelIds: input.labelIds ?? [],
    dueOn: null,
    createdAt: now,
    updatedAt: now,
  };
  store.issues.unshift(issue);
  store.activity.unshift({
    id: nid('act'),
    type: 'issue.created',
    actorId,
    issueId: issue.id,
    message: `${findUser(actorId)?.name ?? 'Someone'} created ${issue.identifier} ${issue.title}`,
    createdAt: now,
  });
  return issue;
}

export function patchIssue(identifier: string, input: PatchIssue, actorId: string): Issue {
  const issue = issueByIdentifier(identifier);
  if (!issue) throw Object.assign(new Error('Issue not found'), { statusCode: 404 });
  const before = issue.status;
  if (input.title !== undefined) issue.title = input.title;
  if (input.description !== undefined) issue.description = input.description;
  if (input.status !== undefined) issue.status = input.status;
  if (input.priority !== undefined) issue.priority = input.priority;
  if (input.estimate !== undefined) issue.estimate = input.estimate ?? null;
  if (input.assigneeId !== undefined) issue.assigneeId = input.assigneeId ?? null;
  if (input.cycleId !== undefined) issue.cycleId = input.cycleId ?? null;
  if (input.labelIds !== undefined) issue.labelIds = input.labelIds;
  issue.updatedAt = new Date().toISOString();
  if (input.status && input.status !== before) {
    store.activity.unshift({
      id: nid('act'),
      type: 'issue.status_changed',
      actorId,
      issueId: issue.id,
      message: `${findUser(actorId)?.name ?? 'Someone'} moved ${issue.identifier} to ${input.status}`,
      createdAt: issue.updatedAt,
    });
  }
  return issue;
}

export function addComment(issueId: string, authorId: string, body: string) {
  const now = new Date().toISOString();
  const comment = {
    id: nid('cmt'),
    issueId,
    authorId,
    body,
    createdAt: now,
  };
  store.comments.push(comment);
  const issue = store.issues.find((i) => i.id === issueId);
  store.activity.unshift({
    id: nid('act'),
    type: 'issue.commented',
    actorId: authorId,
    issueId,
    message: `${findUser(authorId)?.name ?? 'Someone'} commented on ${issue?.identifier ?? issueId}`,
    createdAt: now,
  });
  return comment;
}

export function computeInsights(): Insights {
  const open = store.issues.filter((i) => i.status !== 'done' && i.status !== 'cancelled');
  const doneThisCycle = store.issues.filter(
    (i) => i.cycleId === 'cyc_nav_24' && i.status === 'done',
  ).length;
  const cycleIssues = store.issues.filter((i) => i.cycleId === 'cyc_nav_24');
  const cycleDone = cycleIssues.filter((i) => i.status === 'done' || i.status === 'cancelled').length;
  const byStatus: Record<string, number> = {};
  const byPriority: Record<string, number> = {};
  for (const i of store.issues) {
    byStatus[i.status] = (byStatus[i.status] ?? 0) + 1;
    byPriority[i.priority] = (byPriority[i.priority] ?? 0) + 1;
  }
  const byProject = store.projects.map((p) => {
    const rows = store.issues.filter((i) => i.projectId === p.id);
    return {
      key: p.key,
      name: p.name,
      open: rows.filter((i) => i.status !== 'done' && i.status !== 'cancelled').length,
      done: rows.filter((i) => i.status === 'done').length,
    };
  });
  const throughput = [
    { week: 'Aug 17', created: 7, completed: 5 },
    { week: 'Aug 24', created: 6, completed: 8 },
    { week: 'Aug 31', created: 9, completed: 4 },
    { week: 'Sep 07', created: 8, completed: 6 },
  ];
  return {
    openIssues: open.length,
    doneThisCycle,
    cycleProgress: cycleIssues.length ? Math.round((cycleDone / cycleIssues.length) * 100) : 0,
    urgentOpen: open.filter((i) => i.priority === 'urgent').length,
    unassigned: open.filter((i) => !i.assigneeId).length,
    byStatus,
    byPriority,
    byProject,
    throughput,
  };
}

export function searchAll(q: string) {
  const query = q.trim().toLowerCase();
  if (!query) return { issues: [], wiki: [], projects: [] };
  return {
    issues: store.issues
      .filter((i) => i.title.toLowerCase().includes(query) || i.identifier.toLowerCase().includes(query))
      .slice(0, 12),
    wiki: store.wiki.filter((w) => w.title.toLowerCase().includes(query) || w.body.toLowerCase().includes(query)).slice(0, 8),
    projects: store.projects.filter((p) => p.name.toLowerCase().includes(query) || p.key.toLowerCase().includes(query)),
  };
}

export function inboxFor(userId: string) {
  const mine = queryIssues({ assignee: userId }).filter(
    (i) => i.status !== 'done' && i.status !== 'cancelled',
  );
  const urgent = queryIssues({ priority: 'urgent' }).filter(
    (i) => i.status !== 'done' && i.status !== 'cancelled',
  );
  const notes = store.notifications.filter((n) => n.userId === userId);
  return { assigned: mine, urgent, notifications: notes };
}

export function hydrateIssue(issue: Issue) {
  return {
    ...issue,
    assignee: issue.assigneeId ? publicUser(findUser(issue.assigneeId)!) : null,
    reporter: publicUser(findUser(issue.reporterId)!),
    project: store.projects.find((p) => p.id === issue.projectId),
    cycle: store.cycles.find((c) => c.id === issue.cycleId) ?? null,
    labels: store.labels.filter((l) => issue.labelIds.includes(l.id)),
    comments: store.comments.filter((c) => c.issueId === issue.id),
  };
}

export function projectsWithCounts() {
  return store.projects.map((p) => ({
    ...p,
    issueCount: store.issues.filter((i) => i.projectId === p.id && i.status !== 'done' && i.status !== 'cancelled')
      .length,
    lead: publicUser(findUser(p.leadId)!),
    team: store.teams.find((t) => t.id === p.teamId),
  }));
}

export type { IssueStatus, IssuePriority };

const BASE = '/backend';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (init?.body && !headers.has('content-type')) headers.set('content-type', 'application/json');
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers,
    credentials: 'include',
  });
  if (res.status === 204) return undefined as T;
  const json = (await res.json().catch(() => ({}))) as { error?: { message?: string } } & T;
  if (!res.ok) throw new ApiError(res.status, json.error?.message ?? res.statusText);
  return json;
}

export const client = {
  login: (email: string, password: string) =>
    api<{ user: DemoUser }>('/v1/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => api('/v1/auth/logout', { method: 'POST' }),
  me: () => api<{ user: DemoUser }>('/v1/auth/me'),
  issues: (query = '') => api<{ issues: HydratedIssue[]; count: number }>(`/v1/issues${query}`),
  issue: (id: string) => api<{ issue: HydratedIssue }>(`/v1/issues/${id}`),
  patchIssue: (id: string, body: Record<string, unknown>) =>
    api<{ issue: HydratedIssue }>(`/v1/issues/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  comment: (id: string, body: string) =>
    api(`/v1/issues/${id}/comments`, { method: 'POST', body: JSON.stringify({ body }) }),
  createIssue: (body: Record<string, unknown>) =>
    api<{ issue: HydratedIssue }>('/v1/issues', { method: 'POST', body: JSON.stringify(body) }),
  projects: () => api<{ projects: HydratedProject[] }>('/v1/projects'),
  project: (key: string) => api<{ project: HydratedProject; cycles: Cycle[] }>(`/v1/projects/${key}`),
  cycles: () => api<{ cycles: CycleStat[] }>('/v1/cycles'),
  cycle: (id: string) => api<{ cycle: Cycle; issues: HydratedIssue[] }>(`/v1/cycles/${id}`),
  teams: () => api<{ teams: Team[] }>('/v1/teams'),
  members: () => api<{ members: Member[] }>('/v1/members'),
  views: () => api<{ views: SavedView[] }>('/v1/views'),
  wiki: () => api<{ pages: WikiPage[] }>('/v1/wiki'),
  wikiPage: (slug: string) => api<{ page: WikiPage }>(`/v1/wiki/${slug}`),
  activity: () => api<{ activity: Activity[] }>('/v1/activity'),
  inbox: () => api<Inbox>('/v1/inbox'),
  insights: () => api<{ insights: Insights }>('/v1/insights'),
  search: (q: string) => api<SearchResult>(`/v1/search?q=${encodeURIComponent(q)}`),
  webhooks: () => api<{ webhooks: WebhookRow[] }>('/v1/webhooks'),
  labels: () => api<{ labels: Label[] }>('/v1/labels'),
};

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  handle: string;
  role: string;
  title: string;
  avatarHue: number;
  teamId: string | null;
};

export type Label = { id: string; name: string; color: string };
export type Cycle = {
  id: string;
  name: string;
  goal: string;
  startOn: string;
  endOn: string;
  status: string;
  projectKey: string;
};
export type CycleStat = Cycle & { open: number; done: number; total: number };
export type HydratedIssue = {
  id: string;
  identifier: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  estimate: number | null;
  projectKey: string;
  cycleId: string | null;
  dueOn: string | null;
  updatedAt: string;
  createdAt: string;
  labelIds: string[];
  assignee: DemoUser | null;
  reporter: DemoUser;
  project?: { name: string; color: string; key: string };
  cycle?: Cycle | null;
  labels: Label[];
  comments?: { id: string; body: string; authorId: string; createdAt: string }[];
};
export type HydratedProject = {
  id: string;
  key: string;
  name: string;
  color: string;
  description: string;
  status: string;
  issueCount?: number;
  lead?: DemoUser | null;
  team?: { name: string; key: string } | null;
};
export type Team = {
  id: string;
  key: string;
  name: string;
  description: string;
  color: string;
  members: DemoUser[];
  projects: HydratedProject[];
};
export type Member = DemoUser & { team: { name: string } | null; openIssues: number };
export type SavedView = {
  id: string;
  name: string;
  description: string;
  filter: { status?: string[]; priority?: string[]; assignee?: string; project?: string };
};
export type WikiPage = {
  id: string;
  slug: string;
  title: string;
  body: string;
  updatedAt: string;
  author?: DemoUser | null;
};
export type Activity = { id: string; message: string; createdAt: string; type: string };
export type Inbox = { assigned: HydratedIssue[]; urgent: HydratedIssue[]; notifications: Notification[] };
export type Notification = { id: string; title: string; body: string; href: string; read: boolean; createdAt: string };
export type Insights = {
  openIssues: number;
  doneThisCycle: number;
  cycleProgress: number;
  urgentOpen: number;
  unassigned: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  byProject: { key: string; name: string; open: number; done: number }[];
  throughput: { week: string; created: number; completed: number }[];
};
export type SearchResult = { issues: HydratedIssue[]; wiki: WikiPage[]; projects: HydratedProject[] };
export type WebhookRow = { id: string; name: string; url: string; events: string[]; active: boolean };

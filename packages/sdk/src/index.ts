import type { CreateIssue, Issue, PatchIssue, Project, User } from '@keelboard/shared';

export class KeelboardClient {
  constructor(
    private readonly baseUrl: string,
    private readonly cookie?: string,
  ) {}

  private async req<T>(path: string, init?: RequestInit): Promise<T> {
    const headers = new Headers(init?.headers);
    headers.set('content-type', 'application/json');
    if (this.cookie) headers.set('cookie', this.cookie);
    const res = await fetch(`${this.baseUrl}${path}`, { ...init, headers });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`${res.status} ${path}: ${body}`);
    }
    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  }

  health() {
    return this.req<{ ok: boolean }>('/v1/health');
  }

  me() {
    return this.req<{ user: User }>('/v1/auth/me');
  }

  login(email: string, password: string) {
    return this.req<{ user: User }>('/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  projects() {
    return this.req<{ projects: Project[] }>('/v1/projects');
  }

  issues(query = '') {
    return this.req<{ issues: Issue[] }>(`/v1/issues${query}`);
  }

  issue(identifier: string) {
    return this.req<{ issue: Issue }>(`/v1/issues/${identifier}`);
  }

  createIssue(input: CreateIssue) {
    return this.req<{ issue: Issue }>('/v1/issues', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  patchIssue(identifier: string, input: PatchIssue) {
    return this.req<{ issue: Issue }>(`/v1/issues/${identifier}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    });
  }
}

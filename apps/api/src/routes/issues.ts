import { createCommentSchema, createIssueSchema, patchIssueSchema } from '@keelboard/shared';
import type { FastifyInstance } from 'fastify';
import { sendError } from '../lib/errors.js';
import { requireUser } from '../middleware/session.js';
import {
  addComment,
  createIssue,
  getStore,
  hydrateIssue,
  issueByIdentifier,
  patchIssue,
  queryIssues,
  type IssueQuery,
} from '../store/memory.js';

export async function registerIssues(app: FastifyInstance) {
  app.get('/v1/issues', async (req) => {
    const user = requireUser(req);
    const q = req.query as Record<string, string | undefined>;
    const filters: IssueQuery = {
      project: q.project,
      status: q.status,
      priority: q.priority,
      assignee: q.assignee === 'me' ? user.id : q.assignee,
      cycle: q.cycle,
      q: q.q,
      label: q.label,
      limit: q.limit ? Number(q.limit) : 80,
    };
    const issues = queryIssues(filters).map((i) => hydrateIssue(i));
    return { issues, count: issues.length };
  });

  app.post('/v1/issues', async (req, reply) => {
    const user = requireUser(req);
    const parsed = createIssueSchema.safeParse(req.body);
    if (!parsed.success) return sendError(reply, 400, 'invalid', parsed.error.message);
    const issue = createIssue(parsed.data, user.id);
    return { issue: hydrateIssue(issue) };
  });

  app.get('/v1/issues/:identifier', async (req, reply) => {
    requireUser(req);
    const { identifier } = req.params as { identifier: string };
    const issue = issueByIdentifier(identifier);
    if (!issue) return sendError(reply, 404, 'not_found', 'Issue not found');
    return { issue: hydrateIssue(issue) };
  });

  app.patch('/v1/issues/:identifier', async (req, reply) => {
    const user = requireUser(req);
    const { identifier } = req.params as { identifier: string };
    const parsed = patchIssueSchema.safeParse(req.body);
    if (!parsed.success) return sendError(reply, 400, 'invalid', parsed.error.message);
    try {
      const issue = patchIssue(identifier, parsed.data, user.id);
      return { issue: hydrateIssue(issue) };
    } catch (err) {
      const status = (err as { statusCode?: number }).statusCode ?? 500;
      return sendError(reply, status, 'error', (err as Error).message);
    }
  });

  app.get('/v1/issues/:identifier/comments', async (req, reply) => {
    requireUser(req);
    const { identifier } = req.params as { identifier: string };
    const issue = issueByIdentifier(identifier);
    if (!issue) return sendError(reply, 404, 'not_found', 'Issue not found');
    const store = getStore();
    const comments = store.comments
      .filter((c) => c.issueId === issue.id)
      .map((c) => ({
        ...c,
        author: store.users.find((u) => u.id === c.authorId),
      }));
    return { comments };
  });

  app.post('/v1/issues/:identifier/comments', async (req, reply) => {
    const user = requireUser(req);
    const { identifier } = req.params as { identifier: string };
    const issue = issueByIdentifier(identifier);
    if (!issue) return sendError(reply, 404, 'not_found', 'Issue not found');
    const parsed = createCommentSchema.safeParse(req.body);
    if (!parsed.success) return sendError(reply, 400, 'invalid', 'Comment body required');
    const comment = addComment(issue.id, user.id, parsed.data.body);
    return { comment };
  });
}

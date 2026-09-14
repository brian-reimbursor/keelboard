import { createWebhookSchema } from '@keelboard/shared';
import type { FastifyInstance } from 'fastify';
import { nid } from '../lib/ids.js';
import { sendError } from '../lib/errors.js';
import { repoRoot } from '../lib/runtime.js';
import { recordUptime } from '../lib/uptime.js';
import { requireUser } from '../middleware/session.js';
import { getStore, projectByKey, projectsWithCounts, publicUser } from '../store/memory.js';

export async function registerCatalog(app: FastifyInstance) {
  app.get('/v1/health', async () => {
    recordUptime(repoRoot());
    return {
      ok: true,
      service: 'keelboard-api',
      mode: process.env.DEMO_MODE === 'false' ? 'durable' : 'demo',
      time: new Date().toISOString(),
    };
  });

  app.get('/v1/projects', async (req) => {
    requireUser(req);
    return { projects: projectsWithCounts() };
  });

  app.get('/v1/projects/:key', async (req, reply) => {
    requireUser(req);
    const { key } = req.params as { key: string };
    const project = projectByKey(key);
    if (!project) return sendError(reply, 404, 'not_found', 'Project not found');
    const store = getStore();
    const issues = store.issues.filter((i) => i.projectId === project.id);
    const lead = store.users.find((u) => u.id === project.leadId);
    const team = store.teams.find((t) => t.id === project.teamId);
    return {
      project: {
        ...project,
        lead: lead ? publicUser(lead) : null,
        team,
        issueCount: issues.filter((i) => i.status !== 'done' && i.status !== 'cancelled').length,
      },
      cycles: store.cycles.filter((c) => c.projectId === project.id),
    };
  });

  app.get('/v1/teams', async (req) => {
    requireUser(req);
    const store = getStore();
    return {
      teams: store.teams.map((t) => ({
        ...t,
        members: store.users.filter((u) => u.teamId === t.id).map(publicUser),
        projects: store.projects.filter((p) => p.teamId === t.id),
      })),
    };
  });

  app.get('/v1/members', async (req) => {
    requireUser(req);
    const store = getStore();
    return {
      members: store.users.map((u) => ({
        ...publicUser(u),
        team: store.teams.find((t) => t.id === u.teamId) ?? null,
        openIssues: store.issues.filter(
          (i) => i.assigneeId === u.id && i.status !== 'done' && i.status !== 'cancelled',
        ).length,
      })),
    };
  });

  app.get('/v1/labels', async (req) => {
    requireUser(req);
    return { labels: getStore().labels };
  });

  app.get('/v1/cycles', async (req) => {
    requireUser(req);
    const store = getStore();
    return {
      cycles: store.cycles.map((c) => ({
        ...c,
        open: store.issues.filter(
          (i) => i.cycleId === c.id && i.status !== 'done' && i.status !== 'cancelled',
        ).length,
        done: store.issues.filter((i) => i.cycleId === c.id && i.status === 'done').length,
        total: store.issues.filter((i) => i.cycleId === c.id).length,
      })),
    };
  });

  app.get('/v1/cycles/:id', async (req, reply) => {
    requireUser(req);
    const { id } = req.params as { id: string };
    const store = getStore();
    const cycle = store.cycles.find((c) => c.id === id);
    if (!cycle) return sendError(reply, 404, 'not_found', 'Cycle not found');
    const issues = store.issues.filter((i) => i.cycleId === id);
    return { cycle, issues };
  });

  app.get('/v1/views', async (req) => {
    requireUser(req);
    return { views: getStore().views };
  });

  app.get('/v1/views/:id', async (req, reply) => {
    requireUser(req);
    const { id } = req.params as { id: string };
    const view = getStore().views.find((v) => v.id === id);
    if (!view) return sendError(reply, 404, 'not_found', 'View not found');
    return { view };
  });

  app.get('/v1/wiki', async (req) => {
    requireUser(req);
    return { pages: getStore().wiki };
  });

  app.get('/v1/wiki/:slug', async (req, reply) => {
    requireUser(req);
    const { slug } = req.params as { slug: string };
    const page = getStore().wiki.find((w) => w.slug === slug);
    if (!page) return sendError(reply, 404, 'not_found', 'Page not found');
    const author = getStore().users.find((u) => u.id === page.authorId);
    return { page: { ...page, author: author ? publicUser(author) : null } };
  });

  app.get('/v1/webhooks', async (req) => {
    requireUser(req);
    return { webhooks: getStore().webhooks };
  });

  app.post('/v1/webhooks', async (req, reply) => {
    requireUser(req);
    const parsed = createWebhookSchema.safeParse(req.body);
    if (!parsed.success) return sendError(reply, 400, 'invalid', 'Invalid webhook');
    const row = {
      id: nid('wh'),
      name: parsed.data.name,
      url: parsed.data.url,
      events: parsed.data.events,
      active: parsed.data.active,
      secret: nid('sec'),
    };
    getStore().webhooks.push(row);
    return { webhook: row };
  });
}

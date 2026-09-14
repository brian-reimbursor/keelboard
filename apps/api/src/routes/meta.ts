import type { FastifyInstance } from 'fastify';
import { requireUser } from '../middleware/session.js';
import { computeInsights, getStore, inboxFor, publicUser, searchAll } from '../store/memory.js';

export async function registerMeta(app: FastifyInstance) {
  app.get('/v1/activity', async (req) => {
    requireUser(req);
    const store = getStore();
    return {
      activity: store.activity.slice(0, 40).map((a) => ({
        ...a,
        actor: store.users.find((u) => u.id === a.actorId)
          ? publicUser(store.users.find((u) => u.id === a.actorId)!)
          : null,
      })),
    };
  });

  app.get('/v1/inbox', async (req) => {
    const user = requireUser(req);
    return inboxFor(user.id);
  });

  app.get('/v1/insights', async (req) => {
    requireUser(req);
    return { insights: computeInsights() };
  });

  app.get('/v1/search', async (req) => {
    requireUser(req);
    const q = String((req.query as { q?: string }).q ?? '');
    return searchAll(q);
  });

  app.get('/v1/notifications', async (req) => {
    const user = requireUser(req);
    const store = getStore();
    return { notifications: store.notifications.filter((n) => n.userId === user.id) };
  });
}

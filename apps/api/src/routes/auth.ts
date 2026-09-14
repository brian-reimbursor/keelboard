import { loginSchema } from '@keelboard/shared';
import type { FastifyInstance } from 'fastify';
import { sendError } from '../lib/errors.js';
import { clearSession, currentUser, setSession } from '../middleware/session.js';
import { findUserByEmail, publicUser } from '../store/memory.js';

export async function registerAuth(app: FastifyInstance) {
  app.post('/v1/auth/login', async (req, reply) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return sendError(reply, 400, 'invalid', 'Invalid login payload');
    const user = findUserByEmail(parsed.data.email);
    if (!user || user.password !== parsed.data.password) {
      return sendError(reply, 401, 'unauthorized', 'Unknown email or password');
    }
    setSession(reply, user.id);
    return { user: publicUser(user) };
  });

  app.post('/v1/auth/logout', async (_req, reply) => {
    clearSession(reply);
    return { ok: true };
  });

  app.get('/v1/auth/me', async (req, reply) => {
    const user = currentUser(req);
    if (!user) return sendError(reply, 401, 'unauthorized', 'Not signed in');
    return { user };
  });
}

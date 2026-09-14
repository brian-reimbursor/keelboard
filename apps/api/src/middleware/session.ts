import type { FastifyReply, FastifyRequest } from 'fastify';
import { findUser, publicUser } from '../store/memory.js';

const COOKIE = 'keelboard_session';

export function setSession(reply: FastifyReply, userId: string) {
  reply.setCookie(COOKIE, userId, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  });
}

export function clearSession(reply: FastifyReply) {
  reply.clearCookie(COOKIE, { path: '/' });
}

export function currentUser(req: FastifyRequest) {
  const id = req.cookies?.[COOKIE];
  if (!id) return null;
  const user = findUser(id);
  return user ? publicUser(user) : null;
}

export function requireUser(req: FastifyRequest) {
  const user = currentUser(req);
  if (!user) {
    const err = Object.assign(new Error('Authentication required'), { statusCode: 401 });
    throw err;
  }
  return user;
}

import type { FastifyInstance } from 'fastify';
import { registerAuth } from './auth.js';
import { registerCatalog } from './catalog.js';
import { registerIssues } from './issues.js';
import { registerMeta } from './meta.js';

export async function registerRoutes(app: FastifyInstance) {
  await registerAuth(app);
  await registerCatalog(app);
  await registerIssues(app);
  await registerMeta(app);
}

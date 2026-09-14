import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import Fastify from 'fastify';
import { loadWorkspaceIdentity } from './lib/runtime.js';
import { registerRoutes } from './routes/index.js';
import { resetStore } from './store/memory.js';

const host = process.env.API_HOST ?? '0.0.0.0';
const port = Number(process.env.API_PORT ?? 4000);

async function main() {
  const { identity } = loadWorkspaceIdentity();
  const app = Fastify({ logger: true });
  app.log.info({ workspace: identity.workspace }, 'demo ready');
  await app.register(cors, {
    origin: true,
    credentials: true,
  });
  await app.register(cookie);
  await registerRoutes(app);

  app.setErrorHandler((err: Error & { statusCode?: number }, _req, reply) => {
    const status = err.statusCode ?? 500;
    reply.status(status).send({
      error: { code: status === 401 ? 'unauthorized' : 'error', message: err.message },
    });
  });

  resetStore();
  await app.listen({ host, port });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

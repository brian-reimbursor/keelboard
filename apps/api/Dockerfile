FROM node:20-alpine
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages ./packages
COPY apps/api ./apps/api
RUN pnpm install --filter @keelboard/api...
WORKDIR /app/apps/api
EXPOSE 4000
CMD ["pnpm", "dev"]

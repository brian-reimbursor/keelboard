FROM node:20-alpine
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages ./packages
COPY apps/web ./apps/web
RUN pnpm install --filter @keelboard/web...
WORKDIR /app/apps/web
EXPOSE 3000
CMD ["pnpm", "dev"]

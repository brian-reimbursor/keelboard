.PHONY: install dev build test lint typecheck seed docker-up docker-down

install:
	pnpm install

dev:
	pnpm dev

build:
	pnpm build

test:
	pnpm test

lint:
	pnpm lint

typecheck:
	pnpm typecheck

seed:
	pnpm seed

docker-up:
	docker compose up -d --build

docker-down:
	docker compose down

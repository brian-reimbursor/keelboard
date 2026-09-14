import { boolean, integer, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  handle: text('handle').notNull(),
  role: text('role').notNull(),
  title: text('title').notNull(),
  teamId: text('team_id'),
  avatarHue: integer('avatar_hue').notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const teams = pgTable('teams', {
  id: text('id').primaryKey(),
  key: text('key').notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  color: text('color').notNull(),
});

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  key: text('key').notNull(),
  name: text('name').notNull(),
  color: text('color').notNull(),
  description: text('description').notNull(),
  teamId: text('team_id').notNull(),
  leadId: text('lead_id').notNull(),
  status: text('status').notNull(),
});

export const labels = pgTable('labels', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  color: text('color').notNull(),
  projectId: text('project_id'),
});

export const cycles = pgTable('cycles', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull(),
  name: text('name').notNull(),
  goal: text('goal').notNull(),
  startOn: text('start_on').notNull(),
  endOn: text('end_on').notNull(),
  status: text('status').notNull(),
});

export const issues = pgTable('issues', {
  id: text('id').primaryKey(),
  number: integer('number').notNull(),
  identifier: text('identifier').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull(),
  priority: text('priority').notNull(),
  estimate: integer('estimate'),
  projectId: text('project_id').notNull(),
  cycleId: text('cycle_id'),
  assigneeId: text('assignee_id'),
  reporterId: text('reporter_id').notNull(),
  parentId: text('parent_id'),
  dueOn: text('due_on'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
});

export const issueLabels = pgTable('issue_labels', {
  issueId: text('issue_id').notNull(),
  labelId: text('label_id').notNull(),
});

export const comments = pgTable('comments', {
  id: text('id').primaryKey(),
  issueId: text('issue_id').notNull(),
  authorId: text('author_id').notNull(),
  body: text('body').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const views = pgTable('views', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  ownerId: text('owner_id').notNull(),
  filter: jsonb('filter').notNull(),
});

export const wikiPages = pgTable('wiki_pages', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  authorId: text('author_id').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
});

export const activityEvents = pgTable('activity_events', {
  id: text('id').primaryKey(),
  type: text('type').notNull(),
  actorId: text('actor_id').notNull(),
  issueId: text('issue_id'),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const notifications = pgTable('notifications', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  href: text('href').notNull(),
  read: boolean('read').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const webhooks = pgTable('webhooks', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  url: text('url').notNull(),
  events: jsonb('events').notNull(),
  active: boolean('active').notNull(),
  secret: text('secret').notNull(),
});

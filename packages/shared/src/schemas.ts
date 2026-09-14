import { z } from 'zod';
import {
  CYCLE_STATUSES,
  ISSUE_PRIORITIES,
  ISSUE_STATUSES,
  PROJECT_STATUSES,
  USER_ROLES,
  WEBHOOK_EVENTS,
} from './enums';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  handle: z.string(),
  role: z.enum(USER_ROLES),
  title: z.string(),
  teamId: z.string().nullable(),
  avatarHue: z.number(),
  createdAt: z.string(),
});

export const teamSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  description: z.string(),
  color: z.string(),
});

export const projectSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  color: z.string(),
  description: z.string(),
  teamId: z.string(),
  leadId: z.string(),
  status: z.enum(PROJECT_STATUSES),
  issueCount: z.number().optional(),
});

export const labelSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  projectId: z.string().nullable(),
});

export const issueSchema = z.object({
  id: z.string(),
  number: z.number(),
  identifier: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(ISSUE_STATUSES),
  priority: z.enum(ISSUE_PRIORITIES),
  estimate: z.number().nullable(),
  projectId: z.string(),
  projectKey: z.string(),
  cycleId: z.string().nullable(),
  assigneeId: z.string().nullable(),
  reporterId: z.string(),
  parentId: z.string().nullable(),
  labelIds: z.array(z.string()),
  dueOn: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const commentSchema = z.object({
  id: z.string(),
  issueId: z.string(),
  authorId: z.string(),
  body: z.string(),
  createdAt: z.string(),
});

export const cycleSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  projectKey: z.string(),
  name: z.string(),
  goal: z.string(),
  startOn: z.string(),
  endOn: z.string(),
  status: z.enum(CYCLE_STATUSES),
});

export const viewSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  ownerId: z.string(),
  filter: z.object({
    status: z.array(z.string()).optional(),
    priority: z.array(z.string()).optional(),
    assignee: z.string().optional(),
    project: z.string().optional(),
  }),
});

export const wikiPageSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  body: z.string(),
  authorId: z.string(),
  updatedAt: z.string(),
});

export const activitySchema = z.object({
  id: z.string(),
  type: z.string(),
  actorId: z.string(),
  issueId: z.string().nullable(),
  message: z.string(),
  createdAt: z.string(),
});

export const notificationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  body: z.string(),
  href: z.string(),
  read: z.boolean(),
  createdAt: z.string(),
});

export const webhookSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  events: z.array(z.enum(WEBHOOK_EVENTS)),
  active: z.boolean(),
  secret: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const createIssueSchema = z.object({
  title: z.string().min(3),
  description: z.string().default(''),
  projectKey: z.string(),
  status: z.enum(ISSUE_STATUSES).default('backlog'),
  priority: z.enum(ISSUE_PRIORITIES).default('none'),
  estimate: z.number().int().min(1).max(8).nullable().optional(),
  assigneeId: z.string().nullable().optional(),
  cycleId: z.string().nullable().optional(),
  labelIds: z.array(z.string()).optional(),
});

export const patchIssueSchema = createIssueSchema.partial().omit({ projectKey: true }).extend({
  status: z.enum(ISSUE_STATUSES).optional(),
});

export const createCommentSchema = z.object({
  body: z.string().min(1),
});

export const createWebhookSchema = z.object({
  name: z.string().min(2),
  url: z.string().url(),
  events: z.array(z.enum(WEBHOOK_EVENTS)).min(1),
  active: z.boolean().default(true),
});

export const insightsSchema = z.object({
  openIssues: z.number(),
  doneThisCycle: z.number(),
  cycleProgress: z.number(),
  urgentOpen: z.number(),
  unassigned: z.number(),
  byStatus: z.record(z.number()),
  byPriority: z.record(z.number()),
  byProject: z.array(
    z.object({
      key: z.string(),
      name: z.string(),
      open: z.number(),
      done: z.number(),
    }),
  ),
  throughput: z.array(
    z.object({
      week: z.string(),
      completed: z.number(),
      created: z.number(),
    }),
  ),
});

export type User = z.infer<typeof userSchema>;
export type Team = z.infer<typeof teamSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Label = z.infer<typeof labelSchema>;
export type Issue = z.infer<typeof issueSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type Cycle = z.infer<typeof cycleSchema>;
export type View = z.infer<typeof viewSchema>;
export type WikiPage = z.infer<typeof wikiPageSchema>;
export type Activity = z.infer<typeof activitySchema>;
export type Notification = z.infer<typeof notificationSchema>;
export type Webhook = z.infer<typeof webhookSchema>;
export type Insights = z.infer<typeof insightsSchema>;
export type CreateIssue = z.input<typeof createIssueSchema>;
export type PatchIssue = z.input<typeof patchIssueSchema>;

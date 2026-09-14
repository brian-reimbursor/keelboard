export const ISSUE_STATUSES = [
  'backlog',
  'todo',
  'in_progress',
  'in_review',
  'done',
  'cancelled',
] as const;

export type IssueStatus = (typeof ISSUE_STATUSES)[number];

export const ISSUE_PRIORITIES = ['urgent', 'high', 'medium', 'low', 'none'] as const;
export type IssuePriority = (typeof ISSUE_PRIORITIES)[number];

export const USER_ROLES = ['owner', 'admin', 'member', 'guest'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const PROJECT_STATUSES = ['active', 'paused', 'archived'] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const CYCLE_STATUSES = ['planned', 'active', 'completed'] as const;
export type CycleStatus = (typeof CYCLE_STATUSES)[number];

export const ACTIVITY_TYPES = [
  'issue.created',
  'issue.updated',
  'issue.commented',
  'issue.assigned',
  'issue.status_changed',
  'cycle.started',
  'cycle.completed',
  'wiki.updated',
] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export const WEBHOOK_EVENTS = [
  'issue.created',
  'issue.updated',
  'issue.deleted',
  'comment.created',
  'cycle.started',
] as const;
export type WebhookEvent = (typeof WEBHOOK_EVENTS)[number];

export const STATUS_LABEL: Record<IssueStatus, string> = {
  backlog: 'Backlog',
  todo: 'Todo',
  in_progress: 'In progress',
  in_review: 'In review',
  done: 'Done',
  cancelled: 'Cancelled',
};

export const PRIORITY_LABEL: Record<IssuePriority, string> = {
  urgent: 'Urgent',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  none: 'No priority',
};

export const PRIORITY_RANK: Record<IssuePriority, number> = {
  urgent: 4,
  high: 3,
  medium: 2,
  low: 1,
  none: 0,
};

export const STATUS_RANK: Record<IssueStatus, number> = {
  backlog: 0,
  todo: 1,
  in_progress: 2,
  in_review: 3,
  done: 4,
  cancelled: 5,
};

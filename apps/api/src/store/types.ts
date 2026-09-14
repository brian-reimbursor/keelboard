import type {
  Activity,
  Comment,
  Cycle,
  Issue,
  Label,
  Notification,
  Project,
  Team,
  User,
  View,
  Webhook,
  WikiPage,
} from '@keelboard/shared';

export type StoredUser = User & { password: string };

export type Store = {
  users: StoredUser[];
  teams: Team[];
  projects: Project[];
  labels: Label[];
  issues: Issue[];
  comments: Comment[];
  cycles: Cycle[];
  views: View[];
  wiki: WikiPage[];
  activity: Activity[];
  notifications: Notification[];
  webhooks: Webhook[];
  counters: Record<string, number>;
};

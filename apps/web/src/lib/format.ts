import { PRIORITY_LABEL, STATUS_LABEL, type IssuePriority, type IssueStatus } from '@keelboard/shared';

export function statusLabel(status: string) {
  return STATUS_LABEL[status as IssueStatus] ?? status;
}

export function priorityLabel(priority: string) {
  return PRIORITY_LABEL[priority as IssuePriority] ?? priority;
}

export function relativeTime(iso: string) {
  const then = new Date(iso).getTime();
  const now = new Date('2026-09-14T18:00:00.000Z').getTime();
  const delta = Math.max(0, now - then);
  const hours = Math.round(delta / 36e5);
  if (hours < 24) return `${Math.max(1, hours)}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.round(days / 30)}mo ago`;
}

export function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

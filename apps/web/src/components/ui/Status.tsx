import { priorityLabel, statusLabel } from '@/lib/format';

export function Status({ value }: { value: string }) {
  return (
    <span className="status">
      <span className={`status-dot s-${value}`} />
      {statusLabel(value)}
    </span>
  );
}

export function Priority({ value }: { value: string }) {
  const mark =
    value === 'urgent' ? '!!!' : value === 'high' ? '!!' : value === 'medium' ? '!' : value === 'low' ? '↓' : '·';
  return (
    <span className={`prio prio-${value}`}>
      {mark} {priorityLabel(value)}
    </span>
  );
}

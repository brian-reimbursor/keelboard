export function nid(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function isoDaysAgo(days: number, hour = 14): string {
  const d = new Date('2026-09-14T00:00:00.000Z');
  d.setUTCDate(d.getUTCDate() - days);
  d.setUTCHours(hour, 12, 0, 0);
  return d.toISOString();
}

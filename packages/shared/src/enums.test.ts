import { describe, expect, it } from 'vitest';
import { ISSUE_STATUSES, PRIORITY_RANK, STATUS_LABEL } from './enums';

describe('enums', () => {
  it('has a closed status pipeline', () => {
    expect(ISSUE_STATUSES).toContain('in_progress');
    expect(STATUS_LABEL.done).toBe('Done');
  });

  it('ranks urgent above high', () => {
    expect(PRIORITY_RANK.urgent).toBeGreaterThan(PRIORITY_RANK.high);
  });
});

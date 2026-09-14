import { describe, expect, it, beforeEach } from 'vitest';
import { computeInsights, createIssue, queryIssues, resetStore } from './memory.js';

describe('memory store', () => {
  beforeEach(() => resetStore());

  it('seeds a full Harbor Studio workspace', () => {
    const issues = queryIssues({});
    expect(issues.length).toBeGreaterThan(20);
    expect(issues.some((i) => i.identifier === 'NAV-142')).toBe(true);
  });

  it('filters by project key', () => {
    const nav = queryIssues({ project: 'NAV' });
    expect(nav.every((i) => i.projectKey === 'NAV')).toBe(true);
  });

  it('creates the next identifier', () => {
    const issue = createIssue({ title: 'Probe the canvas zoom', projectKey: 'NAV', description: '' }, 'usr_maya');
    expect(issue.identifier.startsWith('NAV-')).toBe(true);
    expect(issue.reporterId).toBe('usr_maya');
  });

  it('computes insights without NaN', () => {
    const insights = computeInsights();
    expect(insights.openIssues).toBeGreaterThan(0);
    expect(Number.isFinite(insights.cycleProgress)).toBe(true);
  });
});

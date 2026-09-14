'use client';

import { SettingsNav } from '@/components/settings/SettingsNav';

export default function ApiSettingsPage() {
  return (
    <div className="split">
      <SettingsNav />
      <div>
        <div className="page-head">
          <div>
            <h1>API</h1>
            <p>The demo talks to itself on /backend → :4000. Partners use Lighthouse tokens.</p>
          </div>
        </div>
        <div className="panel">
          <p className="muted">
            Base path <code>/v1</code>. See <code>docs/api.md</code>. Token rotation is LTH-51. Idempotency keys
            are LTH-49.
          </p>
          <div className="meta-row">
            <span>Demo token</span>
            <code>kb_demo_not_a_secret</code>
          </div>
          <div className="meta-row">
            <span>OpenAPI</span>
            planned with LTH-47
          </div>
        </div>
      </div>
    </div>
  );
}

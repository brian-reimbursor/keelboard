'use client';

import { SettingsNav } from '@/components/settings/SettingsNav';

export default function BillingSettingsPage() {
  return (
    <div className="split">
      <SettingsNav />
      <div>
        <div className="page-head">
          <div>
            <h1>Billing</h1>
            <p>Harbor Studio is on the annual plan. See KEEL-19 and KEEL-17 for the current fires.</p>
          </div>
        </div>
        <div className="grid-cards">
          <div className="card">
            <h3>Plan</h3>
            <div className="stat" style={{ fontSize: 22 }}>
              Annual
            </div>
          </div>
          <div className="card">
            <h3>Seats</h3>
            <div className="stat" style={{ fontSize: 22 }}>
              8 / 24
            </div>
          </div>
          <div className="card">
            <h3>Renews</h3>
            <div className="stat" style={{ fontSize: 22 }}>
              2027-03-01
            </div>
          </div>
          <div className="card">
            <h3>Overage emails</h3>
            <div className="stat" style={{ fontSize: 22 }}>
              broken
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

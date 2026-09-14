import Link from 'next/link';

export default function LandingPage() {
  return (
    <div>
      <header className="topbar">
        <div className="brand" style={{ padding: 0 }}>
          <span className="brand-mark" />
          Keelboard
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link className="btn ghost" href="/login">
            Sign in
          </Link>
          <Link className="btn primary" href="/login">
            Open Harbor Studio
          </Link>
        </div>
      </header>
      <main className="hero">
        <p className="chip" style={{ display: 'inline-flex' }}>
          Open source · MIT · TypeScript
        </p>
        <h1>The board the work actually lives on.</h1>
        <p className="lead">
          Keelboard keeps issues, cycles, roadmaps, and team docs in one workspace. Harbor Studio is a
          seeded company you can click through in a minute.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
          <Link className="btn primary" href="/login">
            Launch demo
          </Link>
          <a className="btn" href="https://github.com/brian-reimbursor/keelboard">
            GitHub
          </a>
        </div>
        <div className="grid-cards" style={{ marginTop: 56 }}>
          {[
            ['Issues', 'Identifiers like NAV-142, labels, estimates, blockers, and a real pipeline.'],
            ['Cycles', 'Two-week slices with a goal, capacity, and a burn that is not theater.'],
            ['Wiki', 'The decision lives next to the ticket, not in a lost doc.'],
            ['Insights', 'Open vs done, urgent pile-up, throughput by week.'],
          ].map(([t, d]) => (
            <div className="card" key={t}>
              <h3>{t}</h3>
              <p className="muted" style={{ margin: '8px 0 0', fontSize: 13 }}>
                {d}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

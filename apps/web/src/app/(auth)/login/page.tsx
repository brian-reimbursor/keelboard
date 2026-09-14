'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { client } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('maya@harbor.studio');
  const [password, setPassword] = useState('keelboard');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await client.login(email, password);
      router.replace('/inbox');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={onSubmit}>
        <div className="brand" style={{ padding: 0, marginBottom: 8 }}>
          <span className="brand-mark" />
          Keelboard
        </div>
        <h1>Sign in to Harbor Studio</h1>
        <p className="muted" style={{ marginTop: 0 }}>
          Demo password for every seeded person is <code>keelboard</code>.
        </p>
        <label className="field">
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
        </label>
        <label className="field">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error ? <p className="error">{error}</p> : null}
        <button className="btn primary" style={{ width: '100%', marginTop: 8 }} disabled={busy}>
          {busy ? 'Signing in…' : 'Continue'}
        </button>
        <p className="faint" style={{ fontSize: 12, marginTop: 14 }}>
          Also: jonah@, priya@, elias@, noor@, theo@, samir@, wren@harbor.studio
        </p>
      </form>
    </div>
  );
}

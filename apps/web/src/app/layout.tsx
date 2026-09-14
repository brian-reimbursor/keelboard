import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Keelboard',
  description: 'Issues, cycles, and docs for product teams.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

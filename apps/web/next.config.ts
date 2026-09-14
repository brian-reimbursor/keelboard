import type { NextConfig } from 'next';

const config: NextConfig = {
  transpilePackages: ['@keelboard/shared'],
  async rewrites() {
    const api = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
    return [{ source: '/backend/:path*', destination: `${api}/:path*` }];
  },
};

export default config;

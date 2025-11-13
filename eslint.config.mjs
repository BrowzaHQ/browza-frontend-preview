// ESLint v9 flat config for Next.js
// Updated to use modern ESLint v9 patterns and APIs
import nextConfig from 'eslint-config-next/core-web-vitals';

const config = [
  // Spread Next.js core web vitals configuration
  ...nextConfig,
  // Global ignores for ESLint v9
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'node_modules/**',
      'dist/**',
    ],
  },
];

export default config;

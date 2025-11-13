// ESLint v9 Flat Config
// This configuration uses the new flat config format introduced in ESLint v9
// See: https://eslint.org/docs/latest/use/configure/configuration-files-new

import nextConfig from 'eslint-config-next/core-web-vitals';

const config = [
  // Extend Next.js recommended ESLint configuration
  // This includes React, React Hooks, and Next.js specific rules
  ...nextConfig,
  {
    // Ignore patterns for ESLint v9
    // These directories are excluded from linting
    ignores: [
      '.next/**',        // Next.js build output
      'out/**',          // Next.js static export output
      'build/**',        // Build artifacts
      'next-env.d.ts',   // Next.js TypeScript declarations
      'node_modules/**', // Dependencies
    ],
  },
];

export default config;

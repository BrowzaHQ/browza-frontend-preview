/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Note: eslint configuration removed as it's deprecated in Next.js 16
  // Use eslint.config.mjs for ESLint v9 flat config instead
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV || 'local',
    NEXT_PUBLIC_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA || 'local'
  }
};

module.exports = nextConfig;

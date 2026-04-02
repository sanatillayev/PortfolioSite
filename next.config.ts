import type { NextConfig } from 'next'

const securityHeaders = [
  // Prevent clickjacking — site cannot be embedded in iframes
  { key: 'X-Frame-Options', value: 'DENY' },

  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // Control referrer information sent to external links
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  // Restrict browser features (camera, mic, geolocation, etc.)
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },

  // Content Security Policy — defense against XSS
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires unsafe-inline for hydration
      "style-src 'self' 'unsafe-inline'", // Tailwind/inline styles
      "img-src 'self' data: blob: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "media-src 'self'",
      "object-src 'none'", // Block Flash/plugins
      "base-uri 'self'", // Prevent base tag hijacking
      "form-action 'self'", // Restrict form submissions
      "frame-ancestors 'none'", // Same as X-Frame-Options DENY but CSP version
      "upgrade-insecure-requests", // Force HTTPS for all resources
    ].join('; '),
  },

  // Force HTTPS for 2 years, include subdomains, allow preload list
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },

  // Prevent cross-origin information leaks
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },

  // Prevent DNS prefetch to external domains (privacy)
  { key: 'X-DNS-Prefetch-Control', value: 'off' },

  // Disable client-side caching for HTML (assets are hashed by Next.js)
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  // Disable x-powered-by header (hides Next.js fingerprint)
  poweredByHeader: false,
}

export default nextConfig

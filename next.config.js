/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: '/jett-landing',
  assetPrefix: '/jett-landing',
}

module.exports = nextConfig

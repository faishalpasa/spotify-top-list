/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['i.scdn.co'],
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js']
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'res.cloudinary.com'],
    },
    experimental: {
        esmExternals: false,
      },
}

module.exports = nextConfig

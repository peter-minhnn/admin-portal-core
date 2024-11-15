import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./shared/configs/i18n/i18n.ts')

const nextConfig: NextConfig = {
    /* config options here */
    output: 'standalone',
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: '**',
                protocol: 'https',
            },
        ],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
}

export default withNextIntl(nextConfig)

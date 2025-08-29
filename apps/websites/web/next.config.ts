/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
            rules: {
                // Configure SVGR for Turbopack
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.jsx',
                },
            },
        },
    },
    webpack(config) {
        // Keep webpack config for production builds
        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            use: [{
                loader: '@svgr/webpack',
                options: {
                    typescript: true,
                    ref: true,
                }
            }]
        });
        return config;
    }
};

module.exports = nextConfig;

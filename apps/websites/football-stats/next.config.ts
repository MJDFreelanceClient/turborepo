import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        // ❌ Don't run ESLint on build (only run it locally / CI if you want)
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;

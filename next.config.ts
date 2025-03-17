import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                // A retirer plus tard
                hostname: "res.cloudinary.com",
                protocol: "https",
            },
        ],
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias = {
          ...config.resolve.alias,
          '@mui/material': '@mui/joy',
        };
        return config;
      },
    env: {
        AUTH_SECRET: process.env.AUTH_SECRET,
        AUTH_AUTH0_ID: process.env.AUTH_AUTH0_ID,
        AUTH_AUTH0_SECRET:process.env.AUTH_AUTH0_SECRET,
        AUTH_AUTH0_ISSUER:process.env.AUTH_AUTH0_ISSUER,
        AUTH0_BASE_URL:process.env.AUTH0_BASE_URL,
        ONLINE_SERVICE_PRIVATE_KEY:process.env.ONLINE_SERVICE_PRIVATE_KEY,
        ONLINE_SERVICE_PUBLIC_KEY:process.env.ONLINE_SERVICE_PUBLIC_KEY
      }
};

export default nextConfig;

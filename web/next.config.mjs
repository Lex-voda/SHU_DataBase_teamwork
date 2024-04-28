/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'timelord.cn',
          },
          {
            protocol: 'https',
            hostname: '47.120.68.102',
          },
        ],
      },
};

export default nextConfig;

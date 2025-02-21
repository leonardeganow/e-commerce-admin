/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
    typescript: {
      // Ignore TypeScript errors during the build
      ignoreBuildErrors: true,
    },
  };

export default nextConfig;

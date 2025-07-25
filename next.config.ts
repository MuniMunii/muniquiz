import type { NextConfig } from "next";
import path from "path";
const nextConfig: NextConfig = {
  /* config options here */
  images:{domains:['lh3.googleusercontent.com','res.cloudinary.com']},
webpack(config, { dev, isServer }) {
  if (dev && !isServer) {
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      const wdrPath = path.resolve(__dirname, './src/app/wdyr.ts');

      for (const key in entries) {
        if (
          Array.isArray(entries[key]) &&
          !entries[key].includes(wdrPath)
        ) {
          entries[key].unshift(wdrPath);
        }
      }

      return entries;
    };
  }

  return config;
}
};

export default nextConfig;

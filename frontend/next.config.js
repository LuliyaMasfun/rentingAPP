/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http:",
        hostname: "/elgiganten.se",
        port: "",
        pathname:
          "/image/dv_web_D18000100237084/DSLTA7MK2KIT/sony-a7-alpha-7-mark-2-systemkamera-28-70-mm-objektiv--pdp_zoom-3000.jpg",
      },
    ],
  },
};

module.exports = nextConfig;

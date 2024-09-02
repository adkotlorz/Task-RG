import path from "path";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      {
        protocol: "http",
        hostname: "loremflickr.com",
      },
    ],
  },
};

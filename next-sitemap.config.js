/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://example.com",
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ["/protected-page", "/awesome/secret-page"],
  alternateRefs: [
    {
      href: "https://es.example.com",
      hreflang: "es",
    },
    {
      href: "https://fr.example.com",
      hreflang: "fr",
    },
    {
      href: "https://pl.example.com",
      hreflang: "pl",
    },
  ],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => [
    await config.transform(config, "/additional-page"),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "test-bot",
        allow: ["/path", "/path-2"],
      },
      {
        userAgent: "black-listed-bot",
        disallow: ["/sub-path-1", "/path-2"],
      },
    ],
    additionalSitemaps: [
      "https://example.com/my-custom-sitemap-1.xml",
      "https://example.com/my-custom-sitemap-2.xml",
      "https://example.com/my-custom-sitemap-3.xml",
    ],
  },
};

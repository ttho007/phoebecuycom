import { getCollection } from 'astro:content';

export async function get() {
  const blogPosts = await getCollection('blog');
  const pillarPages = await getCollection('pillars');
  const pages = [
    { url: '/' },
    { url: '/blog' },
    { url: '/pillars' },
    ...blogPosts.map(post => ({ url: `/blog/${post.slug}` })),
    ...pillarPages.map(pillar => ({ url: `/pillars/${pillar.slug}` }))
  ];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(page => `
        <url>
          <loc>https://phoebecuy.com${page.url}</loc>
          <changefreq>weekly</changefreq>
        </url>
      `).join('')}
    </urlset>
  `.trim();

  return {
    body: sitemap,
    headers: {
      'Content-Type': 'application/xml'
    }
  };
}
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Update baseUrl when you deploy to your custom domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nitesh-singh-sr-portfolio.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}

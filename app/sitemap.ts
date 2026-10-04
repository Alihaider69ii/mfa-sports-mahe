import { MetadataRoute } from 'next';
import { getProducts, getCategories } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mfasportsmahe.com';
  const products = getProducts();
  const categories = getCategories();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/return-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/shipping-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Category pages
  for (const cat of categories) {
    routes.push({
      url: `${baseUrl}/c/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    });
  }

  // Product pages
  for (const prod of products) {
    routes.push({
      url: `${baseUrl}/p/${prod.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  return routes;
}

import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://focuskit-wheat.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://focuskit-wheat.vercel.app/tools/pomodoro',
      lastModified: new Date(),
    },
    {
      url: 'https://focuskit-wheat.vercel.app/tools/tasks',
      lastModified: new Date(),
    },
    {
      url: 'https://focuskit-wheat.vercel.app/about',
      lastModified: new Date(),
    },
    {
      url: 'https://focuskit-wheat.vercel.app/privacy',
      lastModified: new Date(),
    },
    {
      url: 'https://focuskit-wheat.vercel.app/contact',
      lastModified: new Date(),
    },
    {
      url: 'https://focuskit-wheat.vercel.app/how-to-use-pomodoro',
      lastModified: new Date(),
    },
  ]
}

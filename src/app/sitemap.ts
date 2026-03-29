import type { MetadataRoute } from 'next';
import courses from '@/data/courses';

const BASE_URL = 'https://easylearn.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Static pages ─────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,   // bumped: personal contact pages rank well for name searches
    },
  ];

  // ── Course overview pages ─────────────────────────────────────────────────
  const coursePages: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${BASE_URL}/courses/${course.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // ── Topic pages (intermediate) ────────────────────────────────────────────
  // These don't have their own page in the router but are navigable via the
  // course overview "click topic" flow — still valuable for crawling the tree.
  const topicPages: MetadataRoute.Sitemap = [];
  for (const course of courses) {
    for (const topic of course.topics) {
      // First subtopic acts as the canonical "topic landing"
      const subtopics = (topic as any).subtopics ?? [];
      if (subtopics.length > 0) {
        topicPages.push({
          url: `${BASE_URL}/courses/${course.id}/${topic.id}/${subtopics[0].id}`,
          lastModified: now,
          changeFrequency: 'monthly' as const,
          priority: 0.85,   // topic entry point — slightly higher than individual subtopics
        });
      }
    }
  }

  // ── Subtopic content pages (deepest, highest content density) ────────────
  const subtopicPages: MetadataRoute.Sitemap = [];
  for (const course of courses) {
    for (const topic of course.topics) {
      const subtopics = (topic as any).subtopics ?? [];
      for (const subtopic of subtopics) {
        subtopicPages.push({
          url: `${BASE_URL}/courses/${course.id}/${topic.id}/${subtopic.id}`,
          lastModified: now,
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        });
      }
    }
  }

  // De-duplicate (topic entry points appear in both topicPages and subtopicPages)
  const allUrls = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of [...staticPages, ...coursePages, ...topicPages, ...subtopicPages]) {
    // topicPages have higher priority — they are inserted first so subtopicPages won't overwrite
    if (!allUrls.has(entry.url)) {
      allUrls.set(entry.url, entry);
    }
  }

  return Array.from(allUrls.values());
}

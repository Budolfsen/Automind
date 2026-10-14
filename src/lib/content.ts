import { sanityClient } from './sanity'
import { COURSES_QUERY, PAGE_QUERY, SEO_TEXT_QUERY, SEO_TEXTS_QUERY, SETTINGS_QUERY, UPCOMING_QUERY } from './queries'
import type { Course, PageDocument, SeoText, SiteSettings, UpcomingCourse } from './types'

export async function getSettings(): Promise<SiteSettings> {
  const settings = await sanityClient.fetch<SiteSettings | null>(SETTINGS_QUERY)
  if (!settings) {
    throw new Error('siteSettings mangler i Sanity. Kør npm run seed.')
  }
  return settings
}

export async function getPage(slug: string): Promise<PageDocument> {
  const page = await sanityClient.fetch<PageDocument | null>(PAGE_QUERY, { slug })
  if (!page) {
    throw new Error(`Siden "${slug}" mangler i Sanity. Kør npm run seed.`)
  }
  return page
}

export async function getSeoTexts(): Promise<SeoText[]> {
  return sanityClient.fetch<SeoText[]>(SEO_TEXTS_QUERY)
}

export async function getSeoText(slug: string): Promise<SeoText> {
  const text = await sanityClient.fetch<SeoText | null>(SEO_TEXT_QUERY, { slug })
  if (!text) {
    throw new Error(`SEO-teksten "${slug}" mangler i Sanity. Kør npm run seed.`)
  }
  return text
}

export async function getCourses(): Promise<Course[]> {
  return sanityClient.fetch<Course[]>(COURSES_QUERY)
}

export async function getUpcomingCourses(): Promise<UpcomingCourse[]> {
  return sanityClient.fetch<UpcomingCourse[]>(UPCOMING_QUERY)
}

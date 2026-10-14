import type { SiteSettings, UpcomingCourse } from './types'

export function organizationNode(settings: SiteSettings, siteUrl: string) {
  return {
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    name: settings.companyName,
    email: settings.email,
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: settings.locationLine,
      addressCountry: 'DK',
    },
    sameAs: settings.socialLinks.map((link) => cleanUrl(link.href)),
  }
}

export function courseNodes(courses: UpcomingCourse[], providerName: string, providerUrl: string) {
  return courses.map((course) => ({
    '@type': 'Course',
    name: course.title,
    description: course.paragraphs.join(' '),
    inLanguage: 'da',
    provider: {
      '@type': 'Organization',
      name: providerName,
      url: providerUrl,
    },
  }))
}

function cleanUrl(href: string) {
  const url = new URL(href)
  url.search = ''
  url.hash = ''
  return url.toString()
}

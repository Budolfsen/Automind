import type { SeoText, SiteSettings, UpcomingCourse } from './types'

const expertise = [
  'Elbilkurser',
  'Højvoltssikkerhed',
  'BMS og ladesystemer',
  'Diagnostik',
  'Teknisk support til værksteder',
]

export function organizationId(siteUrl: string) {
  return new URL('#organization', siteUrl).href
}

export function companySummary(settings: SiteSettings) {
  return `${settings.companyName} i ${settings.locationLine} holder elbilkurser for mekanikere og værksteder og giver teknisk support til fejlfinding på elbiler.`
}

export function organizationNode(settings: SiteSettings, siteUrl: string) {
  return {
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': organizationId(siteUrl),
    name: settings.companyName,
    description: companySummary(settings),
    email: settings.email,
    url: siteUrl,
    logo: new URL('icon-512.png', siteUrl).href,
    address: {
      '@type': 'PostalAddress',
      addressLocality: settings.locationLine,
      addressCountry: 'DK',
    },
    areaServed: [
      { '@type': 'City', name: settings.locationLine },
      { '@type': 'Country', name: 'Danmark' },
    ],
    knowsAbout: expertise,
    sameAs: settings.socialLinks.map((link) => cleanUrl(link.href)),
  }
}

export function courseNodes(courses: UpcomingCourse[], settings: SiteSettings, siteUrl: string) {
  const pageUrl = new URL('kommende-kurser/', siteUrl).href
  return courses.map((course) => ({
    '@type': 'Course',
    name: course.title,
    description: course.paragraphs.join(' '),
    url: pageUrl,
    inLanguage: 'da',
    courseMode: 'fremmøde',
    provider: {
      '@id': organizationId(siteUrl),
      '@type': 'EducationalOrganization',
      name: settings.companyName,
      url: siteUrl,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'fremmøde',
      location: {
        '@type': 'Place',
        name: `${settings.companyName}, ${settings.locationLine}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: settings.locationLine,
          addressCountry: 'DK',
        },
      },
    },
  }))
}

export function proseParagraphs(text: string) {
  return text.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean)
}

export function seoTextList(texts: SeoText[], siteUrl: string) {
  return {
    '@type': 'ItemList',
    name: 'Elbilkurser og teknisk support',
    itemListElement: texts.map((text, index) => ({
      '@type': 'ListItem',
      position: text.order || index + 1,
      name: text.title,
      url: topicUrl(text.slug, siteUrl),
    })),
  }
}

export function topicNodes(text: SeoText, siteUrl: string) {
  const url = topicUrl(text.slug, siteUrl)
  const description = proseParagraphs(text.intro)[0] ?? text.title
  return [
    {
      '@type': 'TechArticle',
      headline: text.title,
      description,
      inLanguage: 'da',
      url,
      ...(text.updatedAt ? { dateModified: text.updatedAt } : {}),
      author: { '@id': organizationId(siteUrl) },
      publisher: { '@id': organizationId(siteUrl) },
      mainEntityOfPage: url,
    },
    breadcrumb([
      ['Forside', siteUrl],
      ['Faglige emner', new URL('emner/', siteUrl).href],
      [text.title, url],
    ]),
  ]
}

export type FaqEntry = {
  question: string
  answer: string
}

export function faqEntries(settings: SiteSettings): FaqEntry[] {
  return [
    {
      question: `Hvem holder elbilkurser i ${settings.locationLine}?`,
      answer: companySummary(settings),
    },
    {
      question: 'Hvem er kurserne til?',
      answer: `Kurserne hos ${settings.companyName} i ${settings.locationLine} er til værksteder og mekanikere, der vil styrke deres viden om elbiler.`,
    },
    {
      question: 'Hvad kan et værksted få hjælp til?',
      answer: `${settings.companyName} i ${settings.locationLine} holder elbilkurser for mekanikere og giver værksteder teknisk support til fejlfinding, højvolt, BMS og diagnostik.`,
    },
    {
      question: `Hvordan kontakter man ${settings.companyName}?`,
      answer: `Skriv til ${settings.email} om elbilkurser og teknisk support. En henvendelse starter med en faglig dialog om værkstedets opgave.`,
    },
  ]
}

export function faqPage(settings: SiteSettings) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqEntries(settings).map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  }
}

function topicUrl(slug: string, siteUrl: string) {
  return new URL(`emner/${slug}/`, siteUrl).href
}

function breadcrumb(items: [string, string][]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, item], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item,
    })),
  }
}

function cleanUrl(href: string) {
  const url = new URL(href)
  url.search = ''
  url.hash = ''
  return url.toString()
}

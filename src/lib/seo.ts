import type { SeoText, SiteSettings, UpcomingCourse } from './types'

export const brandName = 'AutoMind Hjørring'
export const brandSlogan = 'Elbilkurser & support'

const expertise = [
  'Elbilkurser',
  'Højvoltssikkerhed',
  'BMS og ladesystemer',
  'Diagnostik',
  'Teknisk support til værksteder',
]

export function brandedTitle(title: string) {
  const stripped = title
    .replace(/\s*[—–-]\s*AutoMind\s*[·•]\s*Hjørring\s*$/u, '')
    .replace(/\s*[—–-]\s*AutoMind Hjørring\s*$/u, '')
    .trim()
  if (stripped === brandName || stripped.endsWith(brandName)) return stripped
  return `${stripped} – ${brandName}`
}

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
    name: brandName,
    alternateName: settings.companyName,
    slogan: brandSlogan,
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
      name: brandName,
      url: siteUrl,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'fremmøde',
      location: {
        '@type': 'Place',
        name: brandName,
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

export type AeoLink = {
  href: string
  label: string
}

export type AeoQuote = {
  text: string
  name: string
  role: string
}

export type AeoSection = {
  question: string
  answer: string
  paragraphs?: string[]
  list?: string[]
}

export type AeoArticle = {
  slug: string
  path: string
  title: string
  description: string
  intro: string
  kind: 'contact' | 'service' | 'topic' | 'guide'
  sections: AeoSection[]
  quote: AeoQuote
  faq: FaqEntry[]
  links?: AeoLink[]
}

export function faqNode(entries: FaqEntry[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  }
}

export function articleNodes(article: AeoArticle, siteUrl: string) {
  const url = absolute(article.path, siteUrl)
  const nodes: Record<string, unknown>[] = []
  if (article.kind === 'contact') {
    nodes.push({
      '@type': 'ContactPage',
      name: brandedTitle(article.title),
      description: article.description,
      url,
      inLanguage: 'da',
      mainEntity: { '@id': organizationId(siteUrl) },
    })
  }
  if (article.kind === 'service') {
    nodes.push({
      '@type': 'Service',
      name: article.title,
      serviceType: 'Teknisk support til fejlfinding på elbiler',
      description: article.description,
      url,
      provider: { '@id': organizationId(siteUrl) },
      areaServed: { '@type': 'Country', name: 'Danmark' },
    })
  }
  if (article.kind === 'guide') {
    nodes.push({
      '@type': 'TechArticle',
      headline: article.title,
      description: article.description,
      inLanguage: 'da',
      url,
      author: { '@id': organizationId(siteUrl) },
      publisher: { '@id': organizationId(siteUrl) },
      mainEntityOfPage: url,
    })
    nodes.push(breadcrumb([
      ['Forside', siteUrl],
      [article.title, url],
    ]))
  }
  nodes.push({
    '@type': 'Quotation',
    text: article.quote.text,
    creator: {
      '@type': 'Person',
      name: article.quote.name,
      jobTitle: article.quote.role,
      worksFor: { '@id': organizationId(siteUrl) },
    },
  })
  nodes.push(faqNode(article.faq))
  return nodes
}

export function faqPage(settings: SiteSettings) {
  return faqNode(faqEntries(settings))
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

function topicUrl(slug: string, siteUrl: string) {
  return absolute(`emner/${slug}/`, siteUrl)
}

function absolute(path: string, siteUrl: string) {
  return new URL(path.replace(/^\//, ''), siteUrl).href
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

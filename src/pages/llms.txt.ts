import type { APIRoute } from 'astro'
import { articleLines, guides, kontaktPage, kontaktTopic, picoscopeTopic, supportPage } from '../lib/aeoArticles'
import { getSeoTexts, getSettings } from '../lib/content'
import { companySummary, faqEntries, proseParagraphs } from '../lib/seo'

const pages = [
  ['Forside', 'https://automind.dk/'],
  ['Kurser', 'https://automind.dk/kurser/'],
  ['Kommende kurser', 'https://automind.dk/kommende-kurser/'],
  ['Teknisk support', 'https://automind.dk/teknisk-support/'],
  ['Om AutoMind', 'https://automind.dk/om-automind/'],
  ['Kontakt', 'https://automind.dk/kontakt/'],
  ['Faglige emner', 'https://automind.dk/emner/'],
]

export const GET: APIRoute = async () => {
  const texts = await getSeoTexts()
  const settings = await getSettings()
  const lines = [
    '# AutoMind Hjørring',
    '',
    companySummary(settings),
    '',
    '## Spørgsmål og svar',
    '',
    ...faqEntries(settings).flatMap((entry) => [`### ${entry.question}`, '', entry.answer, '']),
    '## Sider',
    '',
    ...pages.map(([label, url]) => `- ${label}: ${url}`),
    ...guides.map((guide) => `- ${guide.title}: https://automind.dk${guide.path}`),
    '',
    '## Uddybning',
    '',
    ...[kontaktPage, supportPage, kontaktTopic, picoscopeTopic, ...guides].flatMap((article) => articleLines(article)),
    '## Emner',
    '',
    ...texts.flatMap((text) => [
      `### ${text.title}`,
      '',
      `https://automind.dk/emner/${text.slug}/`,
      '',
      ...proseParagraphs(text.intro).flatMap((paragraph) => [paragraph, '']),
      ...text.sections.flatMap((section) => [
        `#### ${section.heading}`,
        '',
        ...proseParagraphs(section.text).flatMap((paragraph) => [paragraph, '']),
      ]),
      `${text.linkLabel}: https://automind.dk${text.linkHref}`,
      '',
    ]),
    'Invitationer til enkelte kurser er ikke beregnet til indeksering.',
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

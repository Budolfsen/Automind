import type { APIRoute } from 'astro'
import { getSeoTexts } from '../lib/content'

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
  const lines = [
    '# AutoMind',
    '',
    'AutoMind i Hjørring holder elbilkurser for mekanikere og værksteder og giver teknisk support til fejlfinding på elbiler.',
    '',
    '## Sider',
    '',
    ...pages.map(([label, url]) => `- ${label}: ${url}`),
    '',
    '## Emner',
    '',
    ...texts.flatMap((text) => [
      `### ${text.title}`,
      '',
      `https://automind.dk/emner/#${text._id}`,
      '',
      text.text,
      '',
    ]),
    'Invitationer til enkelte kurser er ikke beregnet til indeksering.',
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

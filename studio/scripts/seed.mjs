import { createClient } from '@sanity/client'
import { createReadStream, existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error('Mangler SANITY_PROJECT_ID eller SANITY_API_WRITE_TOKEN i .env')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-10-09',
  token,
  useCdn: false,
})

const imageDir =
  process.env.AUTOMIND_IMAGE_DIR ??
  '/Users/kentbudolfsen/Library/CloudStorage/OneDrive-PodiApS/GOOGLE DREV/AUTOMIND/Nye Billeder 2026/webp'

function figure(assetId, alt, caption) {
  return {
    _type: 'figure',
    alt,
    caption,
    image: {
      _type: 'image',
      asset: { _type: 'reference', _ref: assetId },
    },
  }
}

async function mapPool(items, limit, worker) {
  const queue = [...items]
  const runners = Array.from({ length: limit }, async () => {
    while (queue.length > 0) {
      const item = queue.shift()
      if (item) await worker(item)
    }
  })
  await Promise.all(runners)
}

async function uploadImages() {
  const files = (await readdir(imageDir))
    .filter((name) => name.endsWith('.webp'))
    .sort((a, b) => Number(a.match(/(\d+)/)?.[1]) - Number(b.match(/(\d+)/)?.[1]))

  const assets = new Map()
  let done = 0

  await mapPool(files, 4, async (filename) => {
    const existing = await client.fetch(
      `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
      { filename },
    )
    if (existing) {
      assets.set(filename, existing)
    } else {
      const asset = await client.assets.upload('image', createReadStream(path.join(imageDir, filename)), {
        filename,
      })
      assets.set(filename, asset._id)
    }
    done += 1
    console.log(`Billede ${done}/${files.length}: ${filename}`)
  })

  return assets
}

function ref(assets, filename, alt, caption) {
  const id = assets.get(filename)
  if (!id) throw new Error(`Billedet ${filename} blev ikke uploadet`)
  return figure(id, alt, caption)
}

const documents = (assets, posterId) => [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    companyName: 'AutoMind',
    email: 'mads@automind.dk',
    locationLine: 'Hjørring',
    footerText: 'Hjørring · Kurser & teknisk support til værksteder',
    contactLabel: 'Kontakt',
    navigation: [
      { _key: 'nav-kurser', label: 'Kurser', href: '/kurser' },
      { _key: 'nav-kommende', label: 'Kommende kurser', href: '/kommende-kurser' },
      { _key: 'nav-support', label: 'Teknisk support', href: '/teknisk-support' },
      { _key: 'nav-om', label: 'Om AutoMind', href: '/om-automind' },
    ],
    socialLinks: [
      { _key: 'social-li', label: 'LinkedIn', href: 'https://www.linkedin.com/in/mads-budolfsen-046523a4' },
      { _key: 'social-ig', label: 'Instagram', href: 'https://www.instagram.com/automind.dk?igsh=OHdmc3VvbHdxOWhr&utm_source=qr' },
      { _key: 'social-fb', label: 'Facebook', href: 'https://www.facebook.com/share/1B7yTm1UmZ/?mibextid=wwXIfr' },
    ],
  },
  {
    _id: 'course-hoejvolt',
    _type: 'course',
    category: 'Elbiler · Sikkerhed',
    title: 'Højvoltssikkerhed i praksis',
    description: 'Viden om sikkerhed og arbejdet med elbilens højvoltssystemer — tæt på hverdagen i værkstedet.',
    detail: 'Tal med AutoMind om et kursusforløb med fokus på højvoltssikkerhed og dit værksteds behov.',
    order: 1,
  },
  {
    _id: 'course-diagnostik',
    _type: 'course',
    category: 'Elbiler · Diagnostik',
    title: 'BMS & ladesystemer',
    description: 'Få en bedre forståelse af batteristyring, ladning og systematisk fejlfinding på elbiler.',
    detail: 'Tal med AutoMind om undervisning i elbiler, batteristyring og diagnostik for jeres mekanikere.',
    order: 2,
  },
  {
    _id: 'upcoming-picoscope',
    _type: 'upcomingCourse',
    eyebrow: 'PicoScope · 2 dage',
    title: 'Avanceret PicoScope-kursus',
    paragraphs: [
      'Klaus Schmidt og Mads Budolfsen har længe brygget på et avanceret PicoScope-kursus. Det bliver to dage med fuld fart og masser af tricks, som skal gøre hverdagen lettere.',
      'Højt tempo, masser af nørderi og rigtig godt humør. Kontakt Klaus eller Mads for dato, pris og ledige pladser.',
    ],
    image: ref(assets, 'AutoMind_2026-55.webp', 'Diagnoseudstyr og måleinstrumenter hos AutoMind'),
    attachment: posterId
      ? {
          _type: 'file',
          label: 'Download invitation',
          asset: { _type: 'reference', _ref: posterId },
        }
      : undefined,
    contacts: [
      { _key: 'mads', name: 'Mads Budolfsen', email: 'mads@automind.dk' },
      { _key: 'klaus', name: 'Klaus Schmidt', email: 'klaus@autotekdanmark.dk' },
    ],
    order: 1,
  },
  {
    _id: 'page-forside',
    _type: 'page',
    name: 'Forside',
    slug: { _type: 'slug', current: 'forside' },
    seoTitle: 'Elbilkurser & teknisk support — AutoMind · Hjørring',
    seoDescription:
      'AutoMind i Hjørring holder elbilkurser for mekanikere og giver værksteder teknisk support til fejlfinding, højvolt og batteridiagnostik.',
    eyebrow: 'Hjørring · Værkstedsfaglig uddannelse',
    heading: 'Elbiler,\ndiagnosticeret\ntil bunden.',
    intro: 'Faglige kurser og teknisk support til værksteder og mekanikere med fokus på elbilens systemer.',
    showBrand: true,
    heroImage: ref(assets, 'AutoMind_2026-49.webp', 'Elbiler i AutoMinds værksted i Hjørring'),
    ogImage: ref(assets, 'AutoMind_2026-49.webp', 'Elbiler i AutoMinds værksted i Hjørring'),
    expertise: ['Support til værksteder', 'Højvoltssikkerhed', 'BMS & ladesystemer', 'Diagnostik'],
    actions: [
      { _key: 'cta-kurser', label: 'Se kurser', href: '/kurser', variant: 'primary' },
      { _key: 'cta-support', label: 'Teknisk support', href: '/teknisk-support', variant: 'technical' },
    ],
    sections: [
      {
        _key: 'sec-kurser',
        _type: 'pageSection',
        eyebrow: '(01) Kurser',
        heading: 'Faglig uddannelse,\nbygget til værkstedet.',
        ctaLabel: 'Alle kurser',
        ctaHref: '/kurser',
      },
      {
        _key: 'sec-support',
        _type: 'pageSection',
        eyebrow: '(02) Teknisk support',
        heading: 'Faglig backup,\nnår opgaven driller.',
        body: 'Teknisk sparring til dit værksted med fokus på elbiler.',
        items: ['Fejlfinding på elbilens systemer', 'Diagnostik og teknisk systemforståelse'],
        ctaLabel: 'Få teknisk support',
        ctaHref: '/teknisk-support',
      },
    ],
  },
  {
    _id: 'page-kurser',
    _type: 'page',
    name: 'Kurser',
    slug: { _type: 'slug', current: 'kurser' },
    seoTitle: 'Elbilkurser til mekanikere — AutoMind · Hjørring',
    seoDescription:
      'Elbilkurser hos AutoMind i Hjørring om højvoltssikkerhed, BMS, ladesystemer og systematisk fejlfinding for mekanikere og værksteder.',
    eyebrow: '(01) Kurser · Hjørring',
    heading: 'Viden, der virker i værkstedet.',
    intro: 'Elbilen stiller nye krav til mekanikeren. AutoMind tilbyder kurser til værksteder og mekanikere, der vil styrke deres viden om elbiler.',
    heroImage: ref(assets, 'AutoMind_2026-1.webp', 'AutoMinds undervisningslokale'),
    ogImage: ref(assets, 'AutoMind_2026-1.webp', 'AutoMinds undervisningslokale'),
    notice: 'Kontakt AutoMind for aktuelle kursusforløb, indhold, datoer og priser.',
    promptCard: {
      _type: 'promptCard',
      eyebrow: 'Dit værksted · Dine behov',
      title: 'Hvad vil I blive bedre til?',
      text: 'Tag en dialog om jeres behov, niveau og ønsker til et kursus i elbiler.',
      ctaLabel: 'Tal om et kursus',
      ctaHref: '/kontakt',
    },
    gallery: [
      ref(assets, 'AutoMind_2026-68.webp', 'Undervisningspladser tæt på bilerne i AutoMinds værksted', 'Undervisning tæt på værkstedet.'),
      ref(assets, 'AutoMind_2026-47.webp', 'Teknisk udstyr til arbejde med elbilens batteri', 'Teknik og udstyr i centrum.'),
    ],
  },
  {
    _id: 'page-kommende',
    _type: 'page',
    name: 'Kommende kurser',
    slug: { _type: 'slug', current: 'kommende-kurser' },
    seoTitle: 'Kommende kurser — AutoMind · Hjørring',
    seoDescription:
      'Se kommende kurser hos AutoMind i Hjørring, herunder avanceret PicoScope med Klaus Schmidt og Mads Budolfsen. Tilmelding til værksteder.',
    eyebrow: 'Kurser · Hjørring',
    heading: 'Kommende kurser',
    intro: 'Faglig fordybelse, praktisk fejlfinding og ny viden til hverdagen på værkstedet.',
    ogImage: ref(assets, 'AutoMind_2026-55.webp', 'Diagnoseudstyr og måleinstrumenter hos AutoMind'),
  },
  {
    _id: 'page-support',
    _type: 'page',
    name: 'Teknisk support',
    slug: { _type: 'slug', current: 'teknisk-support' },
    seoTitle: 'Teknisk support til værksteder — AutoMind · Hjørring',
    seoDescription:
      'Teknisk support fra AutoMind i Hjørring. Faglig sparring til værksteder om elbilens systemer, diagnostik og fejlfinding, når opgaven driller.',
    eyebrow: '(02) Teknisk support',
    heading: 'Du behøver ikke stå alene med fejlen.',
    intro: 'Når elbilen kræver mere end en fejlkode, hjælper AutoMind med teknisk sparring. Support til værksteder, der arbejder med elbiler.',
    ogImage: ref(assets, 'AutoMind_2026-19.webp', 'Højvoltsarbejde på en elbil hos AutoMind'),
    sections: [
      {
        _key: 'sec-support',
        _type: 'pageSection',
        heading: 'Fra spørgsmål\ntil næste skridt.',
        body: 'Få en faglig dialog om den konkrete opgave. Vi tager udgangspunkt i bilens symptomer, dine observationer og den fejlfinding, værkstedet allerede har udført.',
        items: ['Elbiler og teknisk systemforståelse', 'Diagnostik og fejlfinding'],
        ctaLabel: 'Spørg om support',
        ctaHref: '/kontakt',
      },
    ],
    gallery: [
      ref(assets, 'AutoMind_2026-19.webp', 'Måleudstyr til teknisk fejlfinding hos AutoMind', 'Diagnostik kræver både udstyr og systemforståelse.'),
      ref(assets, 'AutoMind_2026-39.webp', 'Biler på lifte i AutoMinds værksted', 'Teknisk support med værkstedet i fokus.'),
    ],
  },
  {
    _id: 'page-om',
    _type: 'page',
    name: 'Om AutoMind',
    slug: { _type: 'slug', current: 'om-automind' },
    seoTitle: 'Om AutoMind — kurser og support i Hjørring',
    seoDescription:
      'AutoMind i Hjørring er faglig backup til værksteder. Elbilkurser til mekanikere og teknisk support, tæt på hverdagen i autobranchen.',
    eyebrow: 'AutoMind · Hjørring',
    heading: 'Værkstedsviden til en elektrisk hverdag.',
    intro: 'AutoMind er for værksteder og mekanikere, der vil styrke deres kompetencer inden for elbiler — og have faglig sparring, når opgaven kræver det.',
    heroImage: ref(assets, 'AutoMind_2026-58.webp', 'Elbiler samlet i AutoMinds lokaler i Hjørring'),
    ogImage: ref(assets, 'AutoMind_2026-58.webp', 'Elbiler samlet i AutoMinds lokaler i Hjørring'),
    sections: [
      {
        _key: 'sec-om',
        _type: 'pageSection',
        eyebrow: 'Kurser & support',
        heading: 'Faglighed.\nTæt på praksis.',
        body: 'Fra vores base i Hjørring tilbyder vi kurser i elbiler til værksteder og mekanikere. Vi tilbyder også teknisk support til værksteder med elbiler.',
        ctaLabel: 'Lær AutoMind at kende',
        ctaHref: '/kontakt',
      },
    ],
    gallery: [
      ref(assets, 'AutoMind_2026-34.webp', 'Kursuslokalet hos AutoMind', 'Plads til faglig fordybelse.'),
      ref(assets, 'AutoMind_2026-7.webp', 'AutoMinds værksted og elbiler', 'Et værksted med elbiler i centrum.'),
    ],
  },
  {
    _id: 'page-kontakt',
    _type: 'page',
    name: 'Kontakt',
    slug: { _type: 'slug', current: 'kontakt' },
    seoTitle: 'Kontakt AutoMind i Hjørring — kurser og support',
    seoDescription:
      'Kontakt AutoMind i Hjørring om elbilkurser og teknisk support til dit værksted. Skriv til Mads Budolfsen på mads@automind.dk.',
    eyebrow: 'Kontakt · Hjørring',
    heading: 'Lad os tale om dit værksted.',
    intro: 'Kurser eller en konkret elbil-opgave. Det starter med en faglig dialog.',
    contactName: 'Mads Budolfsen · AutoMind',
    heroImage: ref(assets, 'AutoMind_2026-44.webp', 'AutoMinds lokaler i Hjørring'),
    ogImage: ref(assets, 'AutoMind_2026-44.webp', 'AutoMinds lokaler i Hjørring'),
    topics: [
      {
        _key: 'topic-kurser',
        _type: 'topic',
        title: 'Kurser til mekanikere',
        text: 'Kompetencer, kursusforløb og dit værksteds behov.',
        href: '/kurser',
      },
      {
        _key: 'topic-support',
        _type: 'topic',
        title: 'Teknisk elbil-support',
        text: 'Faglig sparring om diagnostik og fejlfinding.',
        href: '/teknisk-support',
      },
    ],
  },
]

async function uploadPoster() {
  const posterPath =
    process.env.AUTOMIND_POSTER ??
    '/Users/kentbudolfsen/.cursor/projects/Volumes-XtraHDD-Sites-ASTRO-Automind-V3/assets/Invitation_til_Avanceret_PicoKursus-2c913b39-77d2-46c6-947a-235c3bb96f1b.jpg'
  if (!existsSync(posterPath)) {
    console.warn(`Invitation ikke fundet, springer fil over: ${posterPath}`)
    return null
  }
  const filename = 'Invitation-Avanceret-PicoKursus.jpg'
  const existing = await client.fetch(
    `*[_type == "sanity.fileAsset" && originalFilename == $filename][0]._id`,
    { filename },
  )
  if (existing) {
    console.log(`Invitation findes: ${filename}`)
    return existing
  }
  const asset = await client.assets.upload('file', createReadStream(posterPath), {
    filename,
    contentType: 'image/jpeg',
  })
  console.log(`Invitation uploadet: ${filename}`)
  return asset._id
}

function seoSection(key, heading, text) {
  return { _key: key, _type: 'object', heading, text }
}

const seoTexts = [
  {
    _id: 'seo-elbilkurser',
    _type: 'seoText',
    slug: { _type: 'slug', current: 'elbilkurser' },
    title: 'Elbilkurser for mekanikere og værksteder',
    intro: 'Et elbilkursus hos AutoMind i Hjørring er for mekanikere og værksteder, der arbejder med elbiler. Undervisningen tager udgangspunkt i hverdagen på værkstedet, så det, I lærer om elbilens systemer, kan bruges på den næste opgave.\n\nElbilen stiller nye krav til mekanikeren. Derfor aftaler I forløb og indhold med AutoMind ud fra det, jeres værksted har brug for. Aktuelle datoer og priser hører med i den samtale.',
    sections: [
      seoSection('undervisning', 'Undervisning tæt på værkstedet', 'Kurserne foregår tæt på bilerne og det udstyr, mekanikeren bruger. Det gør det lettere at tage viden om elbilens systemer med tilbage til værkstedet, i stedet for at den bliver stående i et lokale uden sammenhæng med opgaven.'),
      seoSection('forloeb', 'Forløb efter værkstedets behov', 'AutoMind lægger kurset efter jeres niveau og ønsker. I kan starte med at fortælle, hvad I vil blive bedre til, så forløbet passer til de mekanikere, der skal på kursus.'),
    ],
    linkLabel: 'Se elbilkurserne',
    linkHref: '/kurser',
    order: 1,
  },
  {
    _id: 'seo-hoejvolt',
    _type: 'seoText',
    slug: { _type: 'slug', current: 'hoejvoltssikkerhed' },
    title: 'Højvoltssikkerhed i praksis',
    intro: 'Højvoltssikkerhed i praksis er et elbilkursus hos AutoMind i Hjørring. Mekanikeren lærer, hvad der kræves for at arbejde sikkert med elbilens højvoltssystemer, i de situationer værkstedet møder.\n\nKurset handler om sikkerhed i arbejdet. Det er ikke en gennemgang, der slipper opgaven på værkstedet.',
    sections: [
      seoSection('daglig', 'Sikkerhed i det daglige arbejde', 'Viden om højvolt skal kunne bruges, når bilen står på værkstedet. Derfor ligger undervisningen tæt på hverdagen og på det, mekanikeren skal tage stilling til, før der arbejdes på systemet.'),
      seoSection('forloeb', 'Et forløb til jeres mekanikere', 'Tal med AutoMind om et kursusforløb med fokus på højvoltssikkerhed og dit værksteds behov. Indhold, datoer og priser aftales i den dialog.'),
    ],
    linkLabel: 'Læs om kurset i højvoltssikkerhed',
    linkHref: '/kurser',
    order: 2,
  },
  {
    _id: 'seo-bms',
    _type: 'seoText',
    slug: { _type: 'slug', current: 'bms-og-ladesystemer' },
    title: 'BMS og ladesystemer',
    intro: 'AutoMind underviser mekanikere i BMS og ladesystemer. Forløbet i Hjørring giver en bedre forståelse af batteristyring, ladning og den systematiske fejlfinding, der hører til på elbiler.\n\nKurset er til værksteder, der vil kunne følge batteriet og ladningen, når bilen ikke opfører sig, som den skal.',
    sections: [
      seoSection('batteri', 'Batteristyring og ladning', 'BMS er bilens styring af batteriet. Sammen med ladesystemet er det en del af den viden, mekanikeren bruger, når en elbil skal fejlsøges, og ladningen eller batteriet er en del af opgaven.'),
      seoSection('fejlfinding', 'Systematisk fejlfinding', 'Undervisningen kobler batteristyring og ladning til en systematisk fejlfinding. I kan tale med AutoMind om et forløb til de mekanikere, der skal arbejde med elbilerne.'),
    ],
    linkLabel: 'Se kurset om BMS og ladesystemer',
    linkHref: '/kurser',
    order: 3,
  },
  {
    _id: 'seo-diagnostik',
    _type: 'seoText',
    slug: { _type: 'slug', current: 'diagnostik' },
    title: 'Diagnostik og systematisk fejlfinding',
    intro: 'Diagnostik hos AutoMind handler om mere end en fejlkode. I Hjørring arbejder værkstedet med symptomer, observationer og den fejlfinding, der allerede er udført, så næste skridt bliver tydeligt.\n\nDen tilgang bruges både på kurserne og, når opgaven driller, i den tekniske sparring.',
    sections: [
      seoSection('symptomer', 'Fra symptomer til næste skridt', 'En fejlkode er et spor, ikke hele svaret. AutoMind tager udgangspunkt i bilens symptomer, dine observationer og det, værkstedet allerede har prøvet, før næste skridt lægges.'),
      seoSection('udstyr', 'Udstyr og systemforståelse', 'Diagnostik kræver både udstyr og forståelse af elbilens systemer. Kurserne giver den forståelse, så fejlfinding på værkstedet kan gøres systematisk.'),
    ],
    linkLabel: 'Læs om diagnostik på elbiler',
    linkHref: '/kurser',
    order: 4,
  },
  {
    _id: 'seo-picoscope',
    _type: 'seoText',
    slug: { _type: 'slug', current: 'picoscope' },
    title: 'Avanceret PicoScope-kursus',
    intro: 'Det avancerede PicoScope-kursus hos AutoMind er to dage med Klaus Schmidt og Mads Budolfsen. Invitation og tilmelding ligger på siden med kommende kurser.\n\nKurset er lagt an på et højt tempo, med tricks der skal gøre hverdagen på værkstedet lettere.',
    sections: [
      seoSection('maalning', 'To dage med måling i praksis', 'Kurset er praktisk og ligger tæt på den fejlfinding, mekanikeren laver med måleudstyr. Der er plads til fordybelse, og undervisningen holdes i et fagligt tempo.'),
      seoSection('tilmelding', 'Dato, pris og pladser', 'Dato, pris og ledige pladser får I ved at skrive til Mads Budolfsen på mads@automind.dk eller til Klaus Schmidt. Invitationen kan downloades på siden med kommende kurser.'),
    ],
    linkLabel: 'Se det kommende PicoScope-kursus',
    linkHref: '/kommende-kurser',
    order: 5,
  },
  {
    _id: 'seo-support',
    _type: 'seoText',
    slug: { _type: 'slug', current: 'teknisk-support' },
    title: 'Teknisk support til værksteder',
    intro: 'Teknisk support fra AutoMind i Hjørring er faglig sparring til værksteder, når elbilen kræver mere end en fejlkode. Det handler om elbilens systemer, diagnostik og fejlfinding.\n\nDu behøver ikke stå alene med fejlen. Supporten er til værksteder, der arbejder med elbiler.',
    sections: [
      seoSection('opgave', 'Den konkrete opgave', 'Samtalen tager udgangspunkt i bilens symptomer, dine observationer og den fejlfinding, værkstedet allerede har udført. Målet er et tydeligt næste skridt på den sag, I står med.'),
      seoSection('systemer', 'Fejlfinding og systemforståelse', 'Sparringen dækker fejlfinding på elbilens systemer og den tekniske forståelse, opgaven kræver. Skriv til AutoMind, når I vil have en faglig dialog om sagen.'),
    ],
    linkLabel: 'Læs om teknisk support',
    linkHref: '/teknisk-support',
    order: 6,
  },
  {
    _id: 'seo-hjoerring',
    _type: 'seoText',
    slug: { _type: 'slug', current: 'hjoerring' },
    title: 'AutoMind i Hjørring',
    intro: 'AutoMind har base i Hjørring. Herfra holder vi elbilkurser for mekanikere og giver teknisk support til værksteder, der arbejder med elbiler.\n\nKurser og sparring ligger tæt på hverdagen i autobranchen, så viden og hjælp kan bruges på værkstedet.',
    sections: [
      seoSection('kurser', 'Kurser fra basen i Hjørring', 'Kurserne er for værksteder og mekanikere, der vil styrke deres viden om elbiler. Undervisningen foregår i AutoMinds lokaler, tæt på biler og udstyr.'),
      seoSection('support', 'Support samme sted', 'Teknisk support er den anden del af arbejdet i Hjørring. Værkstedet kan få faglig sparring, når en elbil-opgave kræver mere end det, I allerede har prøvet.'),
    ],
    linkLabel: 'Læs om AutoMind',
    linkHref: '/om-automind',
    order: 7,
  },
  {
    _id: 'seo-maalgruppe',
    _type: 'seoText',
    slug: { _type: 'slug', current: 'hvem-kurserne-er-til' },
    title: 'Hvem kurserne er til',
    intro: 'Kurserne hos AutoMind i Hjørring er til værksteder og mekanikere, der vil styrke deres viden om elbiler. De tager udgangspunkt i de opgaver, værkstedet allerede har.\n\nAutoMind lægger forløbet efter jeres behov, niveau og ønsker.',
    sections: [
      seoSection('mekanikere', 'Mekanikere på værkstedet', 'Undervisningen er til dem, der arbejder med bilerne. Elbilen stiller nye krav, og kurset skal kunne bruges på den næste opgave, ikke kun høres.'),
      seoSection('vaerksted', 'Værkstedets eget forløb', 'I kan tale med AutoMind om, hvad I vil blive bedre til. Samtalen handler om kompetencer, kursusforløb og det, netop jeres værksted har brug for.'),
    ],
    linkLabel: 'Se kurserne til mekanikere og værksteder',
    linkHref: '/kurser',
    order: 8,
  },
  {
    _id: 'seo-kontakt',
    _type: 'seoText',
    slug: { _type: 'slug', current: 'kontakt' },
    title: 'Kontakt og tilmelding',
    intro: 'Kontakt AutoMind i Hjørring om elbilkurser og teknisk support. Skriv til Mads Budolfsen på mads@automind.dk. En henvendelse starter med en faglig dialog om værkstedets opgave.\n\nDet kan være et kursus, I vil høre nærmere om, eller en elbil der driller.',
    sections: [
      seoSection('tilmelding', 'Kurser og tilmelding', 'Skriv, hvis I vil høre om aktuelle kursusforløb, indhold og tilmelding. Datoer og priser aftales i dialogen. De står ikke som en fast liste.'),
      seoSection('opgave', 'En konkret elbil-opgave', 'I kan også skrive om teknisk support. Beskriv symptomerne og den fejlfinding, I allerede har lavet, så samtalen kan starte der.'),
    ],
    linkLabel: 'Gå til kontakt',
    linkHref: '/kontakt',
    order: 9,
  },
  {
    _id: 'seo-backup',
    _type: 'seoText',
    slug: { _type: 'slug', current: 'faglig-backup' },
    title: 'Faglig backup til værkstedet',
    intro: 'AutoMind er faglig backup til værksteder, der arbejder med elbiler. Når opgaven driller, er der kurser og teknisk support tæt på praksis, så mekanikeren ikke står alene med fejlen.\n\nBackuppen har base i Hjørring og bruges, når værkstedet har brug for en faglig sparringspartner.',
    sections: [
      seoSection('fejlen', 'Når fejlen ikke er løst', 'Teknisk sparring tager fat i elbilens systemer, diagnostik og den fejlfinding, der allerede er gjort. Formålet er at finde næste skridt, ikke at gentage en fejlkode.'),
      seoSection('viden', 'Viden I kan bruge bagefter', 'Kurserne er den anden del af backuppen. De giver mekanikeren viden om højvolt, batteristyring, ladesystemer og systematisk fejlfinding, som kan bruges på værkstedet dagen efter.'),
    ],
    linkLabel: 'Få faglig backup',
    linkHref: '/teknisk-support',
    order: 10,
  },
]

if (process.argv.includes('--seo-only')) {
  for (const doc of seoTexts) {
    await client.createOrReplace(doc)
    console.log('SEO:', doc._id)
  }
  process.exit(0)
}

const assets = await uploadImages()
const posterId = await uploadPoster()
const docs = [...documents(assets, posterId), ...seoTexts]
for (const doc of docs) {
  await client.createOrReplace(doc)
  console.log('Dokument:', doc._id)
}
console.log('Seed færdig')

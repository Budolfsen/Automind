export type SanityAsset = {
  _id: string
  url: string
  width: number
  height: number
}

export type ImageCrop = {
  top: number
  bottom: number
  left: number
  right: number
}

export type ImageHotspot = {
  x: number
  y: number
  width: number
  height: number
}

export type Figure = {
  alt: string
  caption?: string | null
  asset: SanityAsset | null
  crop?: ImageCrop | null
  hotspot?: ImageHotspot | null
}

export type Action = {
  label: string
  href: string
  variant: 'primary' | 'technical' | 'frost' | 'ghost'
}

export type Section = {
  eyebrow?: string | null
  heading?: string | null
  body?: string | null
  items?: string[] | null
  ctaLabel?: string | null
  ctaHref?: string | null
}

export type Topic = {
  title: string
  text: string
  href: string
}

export type PromptCard = {
  eyebrow: string
  title: string
  text: string
  ctaLabel: string
  ctaHref: string
}

export type PageDocument = {
  name: string
  slug: string
  seoTitle: string
  seoDescription: string
  eyebrow: string
  heading: string
  intro: string
  showBrand: boolean
  heroImage: Figure | null
  ogImage: Figure | null
  expertise: string[]
  actions: Action[]
  sections: Section[]
  gallery: Figure[]
  topics: Topic[]
  notice: string | null
  contactName: string | null
  promptCard: PromptCard | null
}

export type NavItem = {
  label: string
  href: string
}

export type SocialLink = {
  label: string
  href: string
}

export type SiteSettings = {
  companyName: string
  email: string
  locationLine: string
  footerText: string
  contactLabel: string
  navigation: NavItem[]
  socialLinks: SocialLink[]
}

export type SeoText = {
  title: string
  text: string
  order: number
}

export type Course = {
  _id: string
  category: string
  title: string
  description: string
  detail: string
}

export type ContactPerson = {
  name: string
  email: string
}

export type CourseAttachment = {
  label: string | null
  url: string | null
  filename: string | null
  mimeType: string | null
  width?: number
  height?: number
  previewSrc?: string
  previewSrcSet?: string
}

export type UpcomingCourse = {
  _id: string
  eyebrow: string
  title: string
  paragraphs: string[]
  image: Figure | null
  attachment: CourseAttachment | null
  contacts: ContactPerson[]
}

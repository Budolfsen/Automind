const figure = `{
  alt,
  caption,
  "crop": image.crop,
  "hotspot": image.hotspot,
  "asset": image.asset->{
    _id,
    url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height
  }
}`

export const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  companyName,
  email,
  locationLine,
  footerText,
  contactLabel,
  navigation[]{ label, href },
  socialLinks[]{ label, href }
}`

export const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  seoTitle,
  seoDescription,
  eyebrow,
  heading,
  intro,
  showBrand,
  heroImage${figure},
  ogImage${figure},
  "expertise": coalesce(expertise, []),
  "actions": coalesce(actions[]{ label, href, variant }, []),
  "sections": coalesce(sections[]{
    eyebrow,
    heading,
    body,
    "items": coalesce(items, []),
    ctaLabel,
    ctaHref
  }, []),
  "gallery": coalesce(gallery[]${figure}, []),
  "topics": coalesce(topics[]{ title, text, href }, []),
  notice,
  contactName,
  promptCard{ eyebrow, title, text, ctaLabel, ctaHref }
}`

const seoTextFields = `{
  _id,
  title,
  "slug": slug.current,
  image${figure},
  intro,
  sections[]{ heading, text },
  linkLabel,
  linkHref,
  order
}`

export const SEO_TEXTS_QUERY = `*[_type == "seoText"] | order(order asc)${seoTextFields}`

export const SEO_TEXT_QUERY = `*[_type == "seoText" && slug.current == $slug][0]${seoTextFields}`

export const COURSES_QUERY = `*[_type == "course"] | order(order asc){
  _id,
  category,
  title,
  description,
  detail
}`

export const UPCOMING_QUERY = `*[_type == "upcomingCourse"] | order(order asc){
  _id,
  eyebrow,
  title,
  "paragraphs": coalesce(paragraphs, []),
  image${figure},
  attachment{
    label,
    "url": asset->url,
    "filename": asset->originalFilename,
    "mimeType": asset->mimeType
  },
  "contacts": coalesce(contacts[]{ name, email }, [])
}`

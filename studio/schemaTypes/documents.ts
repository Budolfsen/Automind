import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Indstillinger',
  type: 'document',
  fields: [
    defineField({ name: 'companyName', title: 'Firmanavn', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'email', title: 'E-mail', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'locationLine', title: 'Sted', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'footerText', title: 'Footertekst', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'contactLabel', title: 'Kontaktknap', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'navigation',
      title: 'Menu',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'label', title: 'Tekst', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'href', title: 'Link', type: 'string', validation: (rule) => rule.required() }),
      ] }],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Sociale links',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'label', title: 'Navn', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'href', title: 'Link', type: 'url', validation: (rule) => rule.required() }),
      ] }],
    }),
  ],
})

export const page = defineType({
  name: 'page',
  title: 'Side',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Navn i Studio', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Sti', type: 'slug', options: { source: 'name' }, validation: (rule) => rule.required() }),
    defineField({ name: 'seoTitle', title: 'SEO-titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'seoDescription', title: 'Meta description', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'eyebrow', title: 'Øjenbryn', type: 'string' }),
    defineField({ name: 'heading', title: 'Overskrift', type: 'text', rows: 3 }),
    defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 4 }),
    defineField({ name: 'showBrand', title: 'Vis AUTOMIND over overskriften', type: 'boolean', initialValue: false }),
    defineField({ name: 'heroImage', title: 'Hovedbillede', type: 'figure' }),
    defineField({ name: 'ogImage', title: 'Delingsbillede', type: 'figure' }),
    defineField({ name: 'expertise', title: 'Kompetencer', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'actions', title: 'Knapper', type: 'array', of: [{ type: 'linkAction' }] }),
    defineField({ name: 'sections', title: 'Sektioner', type: 'array', of: [{ type: 'pageSection' }] }),
    defineField({ name: 'gallery', title: 'Billeder', type: 'array', of: [{ type: 'figure' }] }),
    defineField({ name: 'topics', title: 'Emner', type: 'array', of: [{ type: 'topic' }] }),
    defineField({ name: 'notice', title: 'Note', type: 'text', rows: 3 }),
    defineField({ name: 'contactName', title: 'Kontaktnavn', type: 'string' }),
    defineField({ name: 'promptCard', title: 'Opfordringskort', type: 'promptCard' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'slug.current' },
  },
})

export const course = defineType({
  name: 'course',
  title: 'Kursus',
  type: 'document',
  fields: [
    defineField({ name: 'category', title: 'Kategori', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Kort tekst', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'detail', title: 'Uddybning', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: 'order', title: 'Rækkefølge', type: 'number', validation: (rule) => rule.required() }),
  ],
  orderings: [{ title: 'Rækkefølge', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})

export const seoText = defineType({
  name: 'seoText',
  title: 'SEO-tekst',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Adresse', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'image', title: 'Billede', type: 'figure', validation: (rule) => rule.required() }),
    defineField({ name: 'intro', title: 'Indledning', type: 'text', rows: 8, validation: (rule) => rule.required() }),
    defineField({
      name: 'sections',
      title: 'Underemner',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'heading', title: 'Overskrift', type: 'string', validation: (rule) => rule.required() }),
          defineField({ name: 'text', title: 'Tekst', type: 'text', rows: 6, validation: (rule) => rule.required() }),
        ],
      }],
      validation: (rule) => rule.required().length(2),
    }),
    defineField({ name: 'linkLabel', title: 'Linktekst', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'linkHref', title: 'Link', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'order', title: 'Rækkefølge', type: 'number', validation: (rule) => rule.required() }),
  ],
  orderings: [{ title: 'Rækkefølge', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'intro' },
  },
})

export const upcomingCourse = defineType({
  name: 'upcomingCourse',
  title: 'Kommende kursus',
  type: 'document',
  fields: [
    defineField({ name: 'eyebrow', title: 'Øjenbryn', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'paragraphs',
      title: 'Afsnit',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: 'image', title: 'Billede', type: 'figure' }),
    defineField({
      name: 'attachment',
      title: 'Invitation til download',
      description: 'PDF eller billede i original opløsning. Vises som download-knap på siden.',
      type: 'file',
      options: {
        accept: 'application/pdf,.pdf,image/jpeg,image/png,image/webp',
      },
      fields: [
        defineField({
          name: 'label',
          title: 'Tekst på knappen',
          type: 'string',
          initialValue: 'Download invitation',
        }),
      ],
    }),
    defineField({ name: 'contacts', title: 'Kontaktpersoner', type: 'array', of: [{ type: 'contactPerson' }] }),
    defineField({ name: 'order', title: 'Rækkefølge', type: 'number', initialValue: 1 }),
  ],
})

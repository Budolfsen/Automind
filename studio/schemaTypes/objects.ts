import { defineField, defineType } from 'sanity'

export const figure = defineType({
  name: 'figure',
  title: 'Billede',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Billede',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt-tekst',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Billedtekst',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'alt', media: 'image' },
  },
})

export const linkAction = defineType({
  name: 'linkAction',
  title: 'Knap',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Tekst', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'href', title: 'Link', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'variant',
      title: 'Udseende',
      type: 'string',
      options: {
        list: [
          { title: 'Primær', value: 'primary' },
          { title: 'Teknisk', value: 'technical' },
          { title: 'Frost', value: 'frost' },
          { title: 'Tekst', value: 'ghost' },
        ],
      },
      initialValue: 'primary',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const pageSection = defineType({
  name: 'pageSection',
  title: 'Sektion',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Øjenbryn', type: 'string' }),
    defineField({ name: 'heading', title: 'Overskrift', type: 'text', rows: 3 }),
    defineField({ name: 'body', title: 'Brødtekst', type: 'text', rows: 4 }),
    defineField({ name: 'items', title: 'Punkter', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'ctaLabel', title: 'Knaptekst', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'Knaplink', type: 'string' }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'eyebrow' },
  },
})

export const topic = defineType({
  name: 'topic',
  title: 'Emne',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'text', title: 'Tekst', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'href', title: 'Link', type: 'string', validation: (rule) => rule.required() }),
  ],
})

export const promptCard = defineType({
  name: 'promptCard',
  title: 'Opfordringskort',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Øjenbryn', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'text', title: 'Tekst', type: 'text', validation: (rule) => rule.required() }),
    defineField({ name: 'ctaLabel', title: 'Knaptekst', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'ctaHref', title: 'Knaplink', type: 'string', validation: (rule) => rule.required() }),
  ],
})

export const contactPerson = defineType({
  name: 'contactPerson',
  title: 'Kontaktperson',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Navn', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'email', title: 'E-mail', type: 'string', validation: (rule) => rule.required() }),
  ],
})

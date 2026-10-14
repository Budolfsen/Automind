import { createClient } from '@sanity/client'

const projectId = import.meta.env.SANITY_PROJECT_ID
const dataset = import.meta.env.SANITY_DATASET || 'production'

if (!projectId) {
  throw new Error('SANITY_PROJECT_ID mangler. Tilføj den i .env')
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2026-10-09',
  useCdn: false,
  perspective: 'published',
})

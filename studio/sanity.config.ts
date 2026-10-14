import { defineConfig } from 'sanity'
import { media } from 'sanity-plugin-media'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes/index'
import { structure } from './structure'

export default defineConfig({
  name: 'automind',
  title: 'AutoMind',
  projectId: 'wsuw1ozz',
  dataset: 'production',
  plugins: [structureTool({ structure }), media()],
  schema: { types: schemaTypes },
})

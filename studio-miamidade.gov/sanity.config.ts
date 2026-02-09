import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'miamidade.gov',

  projectId: 'utfnpzzo',
  dataset: 'production',

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: 'http://localhost:3000',
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})

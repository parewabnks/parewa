import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from '@parewa/sanity-config'
import structure from './structure'
import { dataset, projectId } from './env'

export default defineConfig({
  name: 'default',
  title: 'parewa',

  projectId: projectId,
  dataset: dataset,

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
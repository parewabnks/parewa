import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@parewa/sanity-config'

import { structure } from './structure'

export default defineConfig({
    name: 'default',
    title: 'parewa',

    projectId: 'h6v0hg60',
    dataset: 'development',

    plugins: [
        
        structureTool({ structure }), 
        
        visionTool()

    ],

    schema: {
        types: schemaTypes,
    },
})

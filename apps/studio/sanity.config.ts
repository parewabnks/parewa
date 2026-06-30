import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { iconPicker } from "sanity-plugin-icon-picker";
import { schemaTypes } from '@parewa/sanity-config'

import { structure } from './structure'

import { projectId, dataset} from "./env"


export default defineConfig({
    name: 'default',
    title: 'parewa',

    projectId: projectId,

    dataset: dataset,

    plugins: [
        structureTool({ structure }),

        visionTool(),

        colorInput(),

        iconPicker()
    ],

    schema: {
        types: schemaTypes,
    },

    document: {
        actions: (prev, { schemaType }) => {
            if (schemaType in ["general", "menu", "footer"]) {
                return prev.filter(({ action }) =>
                    action ? ["publish", "discardChanges", "restore"].includes(action) : false
                )
            }
            return prev
        },

        newDocumentOptions: (prev, {creationContext}) => {
            if (creationContext.type === "global") {
                return prev.filter(({ templateId }) =>
                    !["general", "menu", "footer"].includes(templateId)
                )
            }
            return prev
        }
    }
})

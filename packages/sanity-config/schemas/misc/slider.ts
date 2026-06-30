import { defineField, defineType } from 'sanity'
import { HomeIcon as icon } from "@sanity/icons";

export default defineType({
    name: "slider",
    title: "Slider",
    type: "document",
    icon,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
        }),
    ]
})
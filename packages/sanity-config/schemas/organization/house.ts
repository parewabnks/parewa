import { defineField, defineType } from 'sanity'
import { HomeIcon as icon } from "@sanity/icons";

export default defineType({
    name: "house",
    title: "Houses",
    type: "document",
    icon,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
        defineField({
            name: "color",
            title: "Color",
            type: "color",
        }),
        defineField({
            name: "display_picture",
            title: "Display Picture",
            type: "image",
        }),
    ]
})
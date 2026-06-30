import { defineField, defineType } from "sanity";
import { UserIcon as icon } from "@sanity/icons";

export default defineType({
    name: "credit",
    title: "Credits",
    type: "document",
    icon,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string"
        }),
        defineField({
            name: "roll",
            title: "Roll",
            type: "string",
        }),
        defineField({
            name: "subtitle",
            title: "Subtitle",
            type: "string",
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: "display_picture",
            title: "Display Picture",
            type: "image",
            options: {
                hotspot: true
            }
        })
    ],
    preview: {
        select: {
            name: "name",
            roll: "roll",
            media: "display_picture",

        },
        prepare({ name, roll, media }) {
            return {
                title: `${roll} · ${name}`,
                media,
            }
        },
    },
});
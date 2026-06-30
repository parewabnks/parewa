import { defineField, defineType } from "sanity";

export default defineType({
    name: "footer",
    title: "Footer",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            readOnly: true
        }),
        defineField({
            name: "text",
            title: "Text",
            type: "array",
            of: [{ type: "block" }]
        }),
        defineField({
            name: "socials",
            title: "Active Socials",
            type: "reference",
            to: [{ type: "socials" }]
        }),
        defineField({
            name: "categories",
            title: "Active Categories",
            type: "reference",
            to: [{ type: "category" }]
        }),
    ]
});
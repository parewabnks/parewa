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
            type: "string",
        }),
        defineField({
            name: "socials",
            title: "Active Socials",
            type: "array",
            of: [{ type: "reference", to: [{ type: "socials" }] }]
        }),
        defineField({
            name: "categories",
            title: "Active Categories",
            type: "array",
            of: [{ type: "reference", to: [{ type: "category" }] }]
        }),
    ]
});
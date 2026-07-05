import { defineField, defineType } from "sanity";

export default defineType({
    name: "menu",
    title: "Menu",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            readOnly: true
        }),
        defineField({
            name: "categories",
            title: "Active Categories",
            type: "array",
            of: [{ type: "reference", to: [{ type: "category" }] }],
        }),
        defineField({
            name: "socials",
            title: "Active Socials",
            type: "array",
            of: [{ type: "reference", to: [{ type: "socials" }] }],
        }),
        defineField({
            name: "links",
            title: "Link Buttons",
            type: "array",
            of: [{ type: "reference", to: [{ type: "links" }] }]
        }),
    ]
});
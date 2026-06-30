import { defineField, defineType } from "sanity";

export default defineType({
    name: "fundraiser",
    title: "Fundraisers",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string"
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 100,
            },
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [{ type: "block" }]
        }),
    ]
});
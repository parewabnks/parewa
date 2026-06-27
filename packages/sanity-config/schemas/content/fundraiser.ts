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
        })
    ]
});
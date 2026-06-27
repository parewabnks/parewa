import { defineField, defineType } from "sanity";

export default defineType({
    name: "footer",
    title: "Footer",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string"
        })
    ]
});
import { defineField, defineType } from "sanity";

export default defineType({
    name: "alumni",
    title: "Alumni",
    type: "document",
    fields: [
        defineField({
            name: "username",
            title: "Username",
            type: "string"
        })
    ]
});
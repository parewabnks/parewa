import { defineField, defineType } from "sanity";

export default defineType({
    name: "teacher",
    title: "Teachers",
    type: "document",
    fields: [
        defineField({
            name: "username",
            title: "Username",
            type: "string"
        })
    ]
});
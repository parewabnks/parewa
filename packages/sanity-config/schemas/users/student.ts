import { defineField, defineType } from "sanity";

export default defineType({
    name: "student",
    title: "Students",
    type: "document",
    fields: [
        defineField({
            name: "username",
            title: "Username",
            type: "string"
        })
    ]
});
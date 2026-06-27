import { defineField, defineType } from "sanity";

export default defineType({
    name: "staff",
    title: "Staff",
    type: "document",
    fields: [
        defineField({
            name: "username",
            title: "Username",
            type: "string"
        })
    ]
});
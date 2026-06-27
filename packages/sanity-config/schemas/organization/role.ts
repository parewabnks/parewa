import { defineField, defineType } from "sanity";

export default defineType({
    name: "role",
    title: "Roles",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string"
        })
    ]
});
import { defineField, defineType } from "sanity";

export default defineType({
    name: "category",
    title: "Categories",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string"
        })
    ]
});
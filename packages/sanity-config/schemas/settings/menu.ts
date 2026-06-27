import { defineField, defineType } from "sanity";

export default defineType({
    name: "menu",
    title: "Menu",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string"
        })
    ]
});
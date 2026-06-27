import { defineField, defineType } from "sanity";

export default defineType({
    name: "announcement",
    title: "Announcements",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string"
        })
    ]
});
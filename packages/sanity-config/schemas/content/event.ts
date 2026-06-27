import { defineField, defineType } from "sanity";

export default defineType({
    name: "event",
    title: "Events",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string"
        })
    ]
});
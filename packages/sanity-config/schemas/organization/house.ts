import { defineField, defineType } from "sanity";

export default defineType({
    name: "house",
    title: "Houses",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string"
        })
    ]
});
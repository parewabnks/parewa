import { defineField, defineType } from "sanity";

export default defineType({
    name: "position",
    title: "Positions",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string"
        })
    ]
});
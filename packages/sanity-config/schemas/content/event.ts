import { defineField, defineType } from 'sanity'

export default defineType({
    name: "event",
    title: "Events",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "datetime",
            title: "Date & Time",
            type: "datetime",
        })
    ]
})
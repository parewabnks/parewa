import { ALL_FIELDS_GROUP, defineField, defineType } from "sanity";

export default defineType({
    name: "general",
    title: "General",
    type: "document",
    groups: [
        {
            name: "content",
            title: "Content",
            default: true,
        },
        {
            name: "slider",
            title: "Slider",
        },
        {
            ...ALL_FIELDS_GROUP,
            hidden: true,
        },
    ],
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            group: "content",
            readOnly: true
        }),

        defineField({
            name: "announcement",
            title: "Active Announcement",
            type: "reference",
            group: "content",
            to: [{ type: "announcement" }]
        }),
        defineField({
            name: "categories",
            title: "Active Categories",
            type: "reference",
            group: "content",
            to: [{ type: "category" }]
        }),
        defineField({
            name: "slider",
            title: "Sliders",
            type: "array",
            group: "slider",
            of: [{
                type: "reference",
                to: [{ type: "slider" }]
            }]
        }),
        defineField({
            name: "terms",
            title: "Terms of Conditions",
            type: "url",
            group: "content",

        }),
        defineField({
            name: "privacy",
            title: "Privacy Policy",
            type: "url",
            group: "content",

        }),
    ]
});
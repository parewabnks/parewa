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
            readOnly: true,
            description: "The internal title of this singleton document. Not user-facing.",
        }),

        defineField({
            name: "siteTitle",
            title: "Site Title",
            type: "string",
            group: "content",
            description: "The title of the site.",
        }),

        defineField({
            name: "announcement",
            title: "Active Announcement",
            type: "reference",
            group: "content",
            to: [{ type: "announcement" }],
            description: "The announcement currently shown site-wide, if any.",
        }),
        defineField({
            name: "categories",
            title: "Active Categories",
            type: "array",
            group: "content",
            of: [{ type: "reference", to: [{ type: "category" }] }],
            description: "The category currently featured or active across the site.",
        }),
        defineField({
            name: "slider",
            title: "Sliders",
            type: "array",
            group: "slider",
            of: [{
                type: "reference",
                to: [{ type: "slider" }]
            }],
            description: "Slides shown in the homepage hero/slider, in order.",
        }),
        defineField({
            name: "terms",
            title: "Terms of Conditions",
            type: "url",
            group: "content",
            description: "Link to the Terms and Conditions page.",
        }),
        defineField({
            name: "privacy",
            title: "Privacy Policy",
            type: "url",
            group: "content",
            description: "Link to the Privacy Policy page.",
        }),
    ]
});
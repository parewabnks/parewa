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
            name: "metadata",
            title: "Metadata",
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
            type: "reference",
            group: "content",
            to: [{ type: "category" }],
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

        defineField({
            name: "metaTitle",
            title: "Meta Title",
            type: "string",
            group: "metadata",
            description: "Used for the <title> tag and search engine results. Falls back to Title if empty.",
            validation: (rule) => rule.max(60).warning("Longer titles may be truncated in search results"),
        }),
        defineField({
            name: "metaDescription",
            title: "Meta Description",
            type: "text",
            rows: 3,
            group: "metadata",
            description: "Used for search engine results and social previews.",
            validation: (rule) => rule.max(160).warning("Longer descriptions may be truncated in search results"),
        }),
        defineField({
            name: "metaImage",
            title: "Meta Image (OG/Twitter)",
            type: "image",
            group: "metadata",
            description: "Used for social sharing previews. Recommended 1200x630.",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "metaKeywords",
            title: "Keywords",
            type: "array",
            group: "metadata",
            of: [{ type: "string" }],
            options: {
                layout: "tags",
            },
            description: "Keywords for SEO purposes. Low impact on modern search engines but still used by some tools.",
        }),
        defineField({
            name: "noIndex",
            title: "Hide from search engines",
            type: "boolean",
            group: "metadata",
            initialValue: false,
            description: "If enabled, tells search engines not to index this page.",
        }),
        defineField({
            name: "canonicalUrl",
            title: "Canonical URL",
            type: "url",
            group: "metadata",
            description: "Override the canonical URL if this content is duplicated elsewhere.",
        }),
    ]
});
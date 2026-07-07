import { defineField, defineType } from "sanity";

export default defineType({
    name: "article",
    title: "Articles",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string"
        }),
        defineField({
            name: "one_liner",
            title: "One Liner",
            type: "string",
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [{ type: "block" }]
        }),
        defineField({
            name: "featured_image",
            title: "Featured Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "reference",
            to: [
                { type: "student" },
                { type: "teacher" },
                { type: "alumni" },
            ],
        }),
        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            of: [
                {
                    type: "string",
                    options: {
                        layout: "tags",
                    },
                }
            ],
            options: {
                layout: "tags",
            },
            validation: (rule) =>
                rule.custom((tags: string[] | undefined) => {
                    if (!tags) return true;
                    const invalid = tags.filter(
                        (tag) => !/^#[a-z0-9]+(-[a-z0-9]+)*$/.test(tag)
                    );
                    if (invalid.length > 0) {
                        return `Tags must start with # and be slug-formatted (e.g. #club-event). Invalid: ${invalid.join(", ")}`;
                    }
                    return true;
                }),
        })
    ]
});
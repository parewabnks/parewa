import { defineField, defineType } from "sanity";
import { LinkIcon as icon } from "@sanity/icons";

export default defineType({
    name: "newsletter_email",
    title: "Newsletter Email",
    type: "document",
    icon,
    fields: [
        defineField({
            name: "email",
            title: "Email",
            type: "email",
        })
    ],
    preview: {
        select: {
            title: "email",
        },
    },
});
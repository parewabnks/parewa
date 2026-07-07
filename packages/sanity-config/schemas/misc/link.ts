import { defineField, defineType } from "sanity";
import { LinkIcon as icon } from "@sanity/icons";

export default defineType({
    name: "links",
    title: "Links",
    type: "document",
    icon,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "link",
            title: "Link",
            type: "string",
        }),
        
    ]
});
import { defineField, defineType } from "sanity";
import { TagIcon as icon } from "@sanity/icons";

export default defineType({
    name: "category",
    title: "Categories",
    type: "document",
    icon,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        })
    ]
});
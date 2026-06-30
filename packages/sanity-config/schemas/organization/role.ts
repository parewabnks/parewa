import { defineField, defineType } from "sanity";
import { TagIcon as icon } from "@sanity/icons";

export default defineType({
    name: "role",
    title: "Roles",
    type: "document",
    icon,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
        defineField({
            name: "color",
            title: "Color",
            type: "color",
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "color.hex",
        },
    },
});
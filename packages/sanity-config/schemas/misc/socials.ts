import { defineField, defineType } from "sanity";
import { PackageIcon as icon } from "@sanity/icons";

export default defineType({
    name: "socials",
    title: "Social Media",
    type: "document",
    icon,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string"
        }),
        defineField({
            name: "icon",
            title: "Icon",
            type: "iconPicker",
            options: {
                providers: ["f7"]
            }
        }),
        defineField({
            name: "link",
            title: "Link",
            type: "url"
        }),
    ],

});
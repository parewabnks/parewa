import { defineField, defineType } from "sanity";
import { HomeIcon as icon } from "@sanity/icons";

export default defineType({
    name: "department",
    title: "Departments",
    type: "document",
    icon,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string"
        })
    ]
});
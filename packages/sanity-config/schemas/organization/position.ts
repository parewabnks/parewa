import { defineField, defineType } from "sanity";
import { FaIdCard as icon } from "react-icons/fa";

export default defineType({
    name: "position",
    title: "Positions",
    type: "document",
    icon,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string"
        }),
        defineField({
            name: "role",
            title: "Role",
            type: "reference",
            to: [{ type: "role" }],
        }),
        defineField({
            name: "color",
            title: "Color",
            type: "color",
        }),
    ]
});
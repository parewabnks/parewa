import { defineField, defineType } from "sanity";
import { MdOutlinePerson as icon } from "react-icons/md";

export default defineType({
    name: "alumni",
    title: "Alumni",
    type: "document",
    icon,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
        defineField({
            name: "roll_number",
            title: "Roll Number",
            type: "string",
        }),
        defineField({
            name: "username",
            title: "Username",
            type: "slug",
            options: {
                source: (doc) => {
                    const name = doc.name as string ?? ""
                    const roll = doc.roll_number as string ?? ""
                    return `${roll}-${name}`.toLowerCase().trim()
                }
            }
        }),
        defineField({
            name: "batch",
            title: "Batch",
            type: "string",
        }),
        defineField({
            name: "graduation_year",
            title: "Graduation Year (B.S)",
            type: "number",
            validation: (Rule) => Rule.integer().min(1900).max(2100),
        }),
        defineField({
            name: "role",
            title: "Role",
            type: "reference",
            to: [{ type: "role" }],
            initialValue: {
                _ref: "alumni",
            },
            readOnly: true,
        }),
        defineField({
            name: "display_picture",
            title: "Display Picture",
            type: "image",
            options: {
                hotspot: true
            }
        })
    ],
    preview: {
        select: {
            name: "name",
            roll: "roll_number",
            subtitle: "graduation_year",
            media: "display_picture",
        },
        prepare({ name, roll, subtitle, media }) {
            return {
                title: `${roll} · ${name}`,
                subtitle: `Graduated in ${subtitle}`,
                media,
            }
        },
    },
})
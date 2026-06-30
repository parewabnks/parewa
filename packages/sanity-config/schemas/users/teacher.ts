import { defineField, defineType, ReferenceFilterResolverContext } from "sanity";
import { BookIcon as icon } from "@sanity/icons";

export default defineType({
    name: "teacher",
    title: "Teachers",
    type: "document",
    icon,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string"
        }),
        defineField({
            name: "initials",
            title: "Initials",
            type: "string",
        }),
        defineField({
            name: "department",
            title: "Department",
            type: "reference",
            to: { type: "department" },
        }),
        defineField({
            name: "username",
            title: "Username",
            type: "slug",
            options: {
                source: "name",
            },
        }),
        defineField({
            name: "role",
            title: "Role",
            type: "reference",
            to: { type: "role" },
            initialValue: {
                _ref: "teacher",
            },
            readOnly: true,
        }),
        defineField({
            name: "position",
            title: "Position",
            type: "reference",
            to: { type: "position" },
            options: {
                filter: (context: ReferenceFilterResolverContext) => {

                    const doc = context.document as { role?: { _ref?: string } }
                    const roleRef = doc.role?._ref

                    if (!roleRef) {
                        return {
                            filter: "defined(role)"
                        }
                    }
                    return {
                        filter: "role._ref == $roleId",
                        params: { roleId: roleRef },
                    }
                }
            }
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
            title: "name",
            subtitle: "position.name",
            media: "display_picture",
        },
    },
});
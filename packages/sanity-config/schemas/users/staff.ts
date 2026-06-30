import { defineField, defineType, ReferenceFilterResolverContext } from "sanity";
import { MdOutlinePerson as icon } from "react-icons/md";

export default defineType({
    name: "staff",
    title: "Staff",
    type: "document",
    icon,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
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
            to: [{ type: "role" }],
            initialValue: {
                _ref: "staff",
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
        })
    ]
})
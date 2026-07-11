import { defineField, defineType, ReferenceFilterResolverContext } from "sanity";
import { UserIcon as icon } from "@sanity/icons";

export default defineType({
  name: "student",
  title: "Students",
  type: "document",
  icon,
  fields: [

    defineField({
      name: "name",
      title: "Name",
      type: "string"
    }),
    defineField({
      name: "roll",
      title: "Roll Number",
      type: "string"
    }),
    defineField({
      name: "username",
      title: "Username",
      type: "slug",
      options: {
        source: (document) => {
          const name = document.name as string ?? ""
          const roll = document.roll as string ?? ""
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
      name: "house",
      title: "House",
      type: "reference",
      to: { type: "house" },
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "reference",
      to: { type: "role" },
      initialValue: {
        _ref: "student",
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
      name: "name",
      subtitle: "house.name",
      roll: "roll",
      media: "display_picture",
    },
    prepare({ name, roll, subtitle, media }) {
      return {
        title: `${roll} · ${name}`,
        media,
        subtitle,
      }
    },
  },
});
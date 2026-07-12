import { defineField, defineType, ReferenceFilterResolverContext } from 'sanity'
import { User } from 'lucide-react'

export default defineType({
    name: 'staff',
    title: 'Staff',
    icon: User,
    type: 'document',
    preview: {
        select: {
            title: 'fullName',
            subtitle: 'position.name',
            media: 'displayPicture',
        },
    },
    fields: [
        defineField({
            name: 'fullName',
            title: 'Full Name',
            type: 'string',
            validation: (Rule) => Rule.required().min(2),
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'email',
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'reference',
            to: { type: 'role' },
            initialValue: {
                _ref: 'staff',
            },
            readOnly: true,
        }),
        defineField({
            name: 'position',
            title: 'Position',
            type: 'reference',
            to: { type: 'position' },
            options: {
                filter: (context: ReferenceFilterResolverContext) => {
                    const doc = context.document as { role?: { _ref?: string } }
                    const roleRef = doc.role?._ref

                    if (!roleRef) {
                        return {
                            filter: 'defined(role)'
                        }
                    }
                    return {
                        filter: 'role._ref == $roleId',
                        params: { roleId: roleRef },
                    }
                }
            }
        }),
        defineField({
            name: 'displayPicture',
            title: 'Display Picture',
            type: 'image',
            options: {
                hotspot: true
            }
        })
    ],
})

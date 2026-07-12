import { defineField, defineType } from 'sanity'
import { Award } from 'lucide-react'

export default defineType({
    name: 'scholarship',
    title: 'Scholarship',
    icon: Award,
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required().min(3),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'raised',
            title: 'Raised',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'amount',
            title: 'Amount',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'deadline',
            title: 'Deadline',
            type: 'date',
        }),
        defineField({
            name: 'picture',
            title: 'Picture',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'videoLink',
            title: 'Video Link',
            type: 'url',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }]
        }),
    ],
})

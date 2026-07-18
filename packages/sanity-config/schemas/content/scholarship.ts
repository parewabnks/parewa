import { defineField, defineType } from 'sanity'
import { Award } from 'lucide-react'

export default defineType({
  name: 'scholarship',
  title: 'Scholarship',
  icon: Award,
  type: 'document',
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "roll",
      title: "Roll Number",
      type: "string",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "slug",
      title: "Slug",
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
      name: 'raised',
      title: 'Raised',
      type: 'number',
    }),
    defineField({
      name: 'amount',
      title: 'Amount (USD $)',
      type: 'number',
    }),
    defineField({
      name: 'deadline',
      title: 'Deadline',
      type: 'date',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'picture',
      title: 'Picture',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'videoLink',
      title: 'Video Link',
      type: 'url',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'donors',
      title: 'Donors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'donor',
              title: 'Donor',
              type: 'reference',
              to: [
                { type: 'alumni' },
                { type: 'guest' },
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'amount',
              title: 'Amount',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'currency',
              title: 'Currency',
              type: 'string',
              options: {
                list: [
                  { title: 'USD', value: 'USD' },
                  { title: 'EUR', value: 'EUR' },
                  { title: 'GBP', value: 'GBP' },
                  { title: 'INR', value: 'INR' },
                  { title: 'PKR', value: 'PKR' },
                  { title: 'NPR', value: 'NPR' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ]
        }
      ],
      description: 'Track donors with their contribution amount and currency',
    }),
  ],
})

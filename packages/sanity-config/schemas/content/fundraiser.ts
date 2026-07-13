import { defineField, defineType } from 'sanity'
import { Gift } from 'lucide-react'

export default defineType({
  name: 'fundraiser',
  title: 'Fundraiser',
  icon: Gift,
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
      name: 'goal',
      title: 'Goal',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'raised',
      title: 'Raised',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
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
                { type: 'student' },
                { type: 'teacher' },
                { type: 'alumni' },
                { type: 'staff' },
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
    defineField({
      name: 'deadline',
      title: 'Deadline',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

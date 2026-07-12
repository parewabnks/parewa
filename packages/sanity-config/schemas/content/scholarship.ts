import {defineField, defineType} from 'sanity'
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
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
    }),
    defineField({
      name: 'deadline',
      title: 'Deadline',
      type: 'date',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})

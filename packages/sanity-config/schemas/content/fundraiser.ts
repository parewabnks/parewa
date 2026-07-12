import {defineField, defineType} from 'sanity'
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
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'goal',
      title: 'Goal',
      type: 'number',
    }),
    defineField({
      name: 'raised',
      title: 'Raised',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'deadline',
      title: 'Deadline',
      type: 'date',
    }),
  ],
})

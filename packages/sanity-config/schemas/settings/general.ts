import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'general',
  title: 'General',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
    }),
    defineField({
      name: 'supportEmail',
      title: 'Support Email',
      type: 'string',
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
    }),
  ],
})

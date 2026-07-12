import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'newsletterEmail',
  title: 'Newsletter Email',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'subscribed',
      title: 'Subscribed',
      type: 'boolean',
    }),
  ],
})

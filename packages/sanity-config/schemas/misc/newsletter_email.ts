import { defineField, defineType } from 'sanity'
import { Mail } from 'lucide-react'

export default defineType({
  name: 'newsletterEmail',
  title: 'Newsletter Email',
  icon: Mail,
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
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

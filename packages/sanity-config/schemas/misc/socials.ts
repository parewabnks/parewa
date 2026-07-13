import { defineField, defineType } from 'sanity'
import { Globe } from 'lucide-react'

export default defineType({
  name: 'socials',
  title: 'Socials',
  icon: Globe,
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description: 'Icon identifier (e.g., facebook, twitter, linkedin)',
    }),
  ],
})

import { defineField, defineType } from 'sanity'
import { FileText } from 'lucide-react'

export default defineType({
  name: 'article',
  title: 'Article',
  icon: FileText,
  type: 'document',
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
    },
  },
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
      name: 'oneLiner',
      title: 'One Liner',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [
        { type: 'student' },
        { type: 'teacher' },
        { type: 'alumni' },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            layout: 'tags',
          },
        }
      ],
      options: {
        layout: 'tags',
      },
      validation: (Rule) =>
        Rule.custom((tags: string[] | undefined) => {
          if (!tags) return true
          const invalid = tags.filter(
            (tag) => !/^#[a-z0-9]+(-[a-z0-9]+)*$/.test(tag)
          )
          if (invalid.length > 0) {
            return `Tags must start with # and be slug-formatted (e.g. #club-event). Invalid: ${invalid.join(', ')}`
          }
          return true
        }),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

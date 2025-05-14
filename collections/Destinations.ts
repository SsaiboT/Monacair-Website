import type { CollectionConfig } from 'payload'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text', required: true, localized: true },
    { name: 'region', type: 'text', required: true, localized: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'description', type: 'richText', required: true, localized: true },
    { name: 'additional_content', type: 'richText', localized: true },
    {
      name: 'advantages',
      type: 'array',
      required: true,
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'text' },
      ],
    },
  ],
}

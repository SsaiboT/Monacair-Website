import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'Events',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text', required: true, localized: true },
    { name: 'carousel_subtitle', type: 'text', required: true, localized: true },
    { name: 'date', type: 'text', required: true },
    { name: 'city', type: 'text', required: true, localized: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    { name: 'description', type: 'richText', required: true, localized: true },
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
    { name: 'additional_content', type: 'richText', localized: true },
  ],
}

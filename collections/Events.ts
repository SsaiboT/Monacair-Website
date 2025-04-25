import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'Events',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text', required: true, localized: true },
    { name: 'date', type: 'text', required: true },
    { name: 'city', type: 'text', required: true, localized: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
  ],
}

import type { CollectionConfig } from 'payload'

export const Fleet: CollectionConfig = {
  slug: 'Fleet',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text', required: true, localized: true },
    { name: 'Carousel image', type: 'upload', relationTo: 'media', required: true },
  ],
}

import type { CollectionConfig } from 'payload'

export const Fleet: CollectionConfig = {
  slug: 'Fleet',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'speed', type: 'text', required: true, localized: true },
    { name: 'passengers', type: 'text', required: true, localized: true },
    { name: 'baggage', type: 'text', required: true, localized: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
  ],
}

import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    formatOptions: {
      format: 'webp',
    },
    resizeOptions: {
      width: 2560,
      withoutEnlargement: true,
      fastShrinkOnLoad: false,
    },
    focalPoint: false,
    mimeTypes: ['image/*'],
  },
}

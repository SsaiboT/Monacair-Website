import type { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'category'],
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Gastronomy',
          value: 'gastronomy',
        },
        {
          label: 'Lifestyle',
          value: 'lifestyle',
        },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'duration',
      type: 'number',
      required: true,
      label: 'Duration (minutes)',
      min: 1,
    },
    {
      name: 'guests',
      type: 'group',
      fields: [
        {
          name: 'minimum',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'maximum',
          type: 'number',
          required: true,
          min: 1,
        },
      ],
    },
    {
      name: 'availability',
      type: 'group',
      fields: [
        {
          name: 'minimum',
          type: 'date',
          required: false,
          admin: {
            description: 'Minimum availability date',
            condition: (data, siblingData) => !siblingData?.anytime,
          },
        },
        {
          name: 'maximum',
          type: 'date',
          required: false,
          admin: {
            description: 'Maximum availability date',
            condition: (data, siblingData) => !siblingData?.anytime,
          },
        },
        {
          name: 'anytime',
          type: 'checkbox',
          required: false,
          localized: true,
          defaultValue: false,
          label: 'Available anytime',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Experience Image',
    },
  ],
}

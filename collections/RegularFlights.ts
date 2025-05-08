import type { CollectionConfig } from 'payload'

export const RegularFlights: CollectionConfig = {
  slug: 'regular-flights',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'start_point', 'end_point'],
  },
  fields: [
    {
      name: 'start_point',
      type: 'relationship',
      relationTo: 'destinations',
      required: true,
      hasMany: false,
      admin: {
        description: 'Select departure location',
      },
    },
    {
      name: 'end_point',
      type: 'relationship',
      relationTo: 'destinations',
      required: true,
      hasMany: false,
      admin: {
        description: 'Select arrival location',
      },
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'description',
          type: 'textarea',
          required: false,
          localized: true,
        },
      ],
    },
    {
      name: 'time_frames',
      type: 'group',
      fields: [
        {
          name: 'frequency',
          type: 'number',
          required: true,
          localized: false,
        },
        {
          name: 'average_flight_duration',
          type: 'number',
          required: true,
          localized: false,
        },
      ],
    },
    {
      name: 'tariffs',
      type: 'group',
      fields: [
        {
          name: 'price_per_adult',
          type: 'number',
          required: true,
        },
        {
          name: 'price_per_child',
          type: 'number',
          required: true,
        },
        {
          name: 'price_per_newborn',
          type: 'number',
          required: true,
        },
        {
          name: 'price_per_baggage',
          type: 'number',
          required: true,
        },
        {
          name: 'price_per_flex',
          type: 'number',
          required: true,
        },
        {
          name: 'max_persons',
          type: 'number',
          required: true,
        },
        {
          name: 'max_baggages',
          type: 'number',
          required: true,
        },
      ],
    },
  ],
}

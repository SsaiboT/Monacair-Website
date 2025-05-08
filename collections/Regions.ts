import type { CollectionConfig } from 'payload'

export const Regions: CollectionConfig = {
  slug: 'regions',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Name',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Image',
    },
    {
      name: 'determiner',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Le',
          value: 'le',
        },
        {
          label: 'La',
          value: 'la',
        },
        {
          label: 'Les',
          value: 'les',
        },
        {
          label: "L'",
          value: 'l',
        },
        {
          label: 'Un',
          value: 'un',
        },
        {
          label: 'Une',
          value: 'une',
        },
        {
          label: 'Des',
          value: 'des',
        },
        {
          label: 'Du',
          value: 'du',
        },
        {
          label: 'De la',
          value: 'de-la',
        },
        {
          label: "De l'",
          value: 'de-l',
        },
        {
          label: 'Des',
          value: 'des',
        },
        {
          label: 'Au',
          value: 'au',
        },
        {
          label: 'À la',
          value: 'a-la',
        },
        {
          label: "À l'",
          value: 'a-l',
        },
        {
          label: 'Aux',
          value: 'aux',
        },
      ],
      label: 'Determiner',
    },
  ],
}

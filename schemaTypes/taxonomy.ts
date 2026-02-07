import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'taxonomy',
  title: 'Taxonomy',
  type: 'document',
  fields: [
    defineField({
      name: 'categoryName',
      title: 'Parent Category',
      type: 'string',
    }),
    defineField({
      name: 'subCategory',
      title: 'SubCategory',
      type: 'string',
    }),
    defineField({
      name: 'listName',
      title: 'List Name',
      type: 'string',
    }),
    defineField({
      name: 'options',
      title: 'Label:Value Pairs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'labelOnly',
      title: 'Label Only',
      description: 'Output Option - Use label as value',
      type: 'boolean',
    }),
    defineField({
      name: 'organizations',
      title: 'Organizations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'organizationName',
              title: 'Organization',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'listName',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mduid',
      title: 'MDUID',
      type: 'string',
      hidden: true,
    }),
  ],

  preview: {
    select: {
      title: 'listName',
      subtitle: 'categoryName',
    },
  },
})

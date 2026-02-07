import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  groups: [
    {name: 'basic', title: 'Basic Info'},
    {name: 'address', title: 'Physical Address'},
    {name: 'postal', title: 'Postal Address'},
    {name: 'hours', title: 'Public Hours'},
    {name: 'categories', title: 'Categories'},
    {name: 'geo', title: 'Geographic Data'},
  ],
  fields: [
    // Basic Information
    defineField({
      name: 'name',
      title: 'Location Name',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locationDisplayName',
      title: 'Location Display Name',
      description: 'Name to be displayed on the page if filled out.',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'basic',
      initialValue: false,
    }),

    // Physical Address
    defineField({
      name: 'physicalAddress',
      title: 'Physical Address',
      type: 'object',
      group: 'address',
      fields: [
        {
          name: 'address1',
          title: 'Address 1',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'address2',
          title: 'Address 2',
          type: 'string',
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'state',
          title: 'State',
          type: 'string',
          options: {
            list: [
              {title: 'FL', value: 'FL'},
              {title: 'GA', value: 'GA'},
              {title: 'NC', value: 'NC'},
            ],
          },
          initialValue: 'FL',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'zip',
          title: 'ZIP',
          type: 'string',
          validation: (Rule) => Rule.required().max(10),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Postal Address (optional)
    defineField({
      name: 'hasPostalAddress',
      title: 'Include Postal Address',
      description: 'Check if this location has a different mailing address.',
      type: 'boolean',
      group: 'postal',
      initialValue: false,
    }),
    defineField({
      name: 'postalAddress',
      title: 'Postal Address',
      type: 'object',
      group: 'postal',
      hidden: ({parent}) => !parent?.hasPostalAddress,
      fields: [
        {
          name: 'address1',
          title: 'Address 1',
          type: 'string',
        },
        {
          name: 'address2',
          title: 'Address 2',
          type: 'string',
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'state',
          title: 'State',
          type: 'string',
          options: {
            list: [
              {title: 'FL', value: 'FL'},
              {title: 'GA', value: 'GA'},
              {title: 'NC', value: 'NC'},
            ],
          },
          initialValue: 'FL',
        },
        {
          name: 'zip',
          title: 'ZIP',
          type: 'string',
        },
      ],
    }),

    // Public Hours
    defineField({
      name: 'publicHours',
      title: 'Public Hours',
      description: '24H Format - i.e. 00:00 = 12 AM and 23:00 = 11 PM',
      type: 'object',
      group: 'hours',
      fields: [
        {
          name: 'monday',
          title: 'Monday',
          type: 'object',
          fields: [
            {
              name: 'isOpen',
              title: 'Open on Monday',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'open',
              title: 'Opening Time',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: 'time',
                  invert: false,
                }).error('Please use 24-hour format (e.g., 09:00 or 17:30)'),
              hidden: ({parent}) => !parent?.isOpen,
            },
            {
              name: 'close',
              title: 'Closing Time',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: 'time',
                  invert: false,
                }).error('Please use 24-hour format (e.g., 09:00 or 17:30)'),
              hidden: ({parent}) => !parent?.isOpen,
            },
          ],
        },
        {
          name: 'tuesday',
          title: 'Tuesday',
          type: 'object',
          fields: [
            {
              name: 'isOpen',
              title: 'Open on Tuesday',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'open',
              title: 'Opening Time',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: 'time',
                  invert: false,
                }).error('Please use 24-hour format (e.g., 09:00 or 17:30)'),
              hidden: ({parent}) => !parent?.isOpen,
            },
            {
              name: 'close',
              title: 'Closing Time',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: 'time',
                  invert: false,
                }).error('Please use 24-hour format (e.g., 09:00 or 17:30)'),
              hidden: ({parent}) => !parent?.isOpen,
            },
          ],
        },
        {
          name: 'wednesday',
          title: 'Wednesday',
          type: 'object',
          fields: [
            {
              name: 'isOpen',
              title: 'Open on Wednesday',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'open',
              title: 'Opening Time',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: 'time',
                  invert: false,
                }).error('Please use 24-hour format (e.g., 09:00 or 17:30)'),
              hidden: ({parent}) => !parent?.isOpen,
            },
            {
              name: 'close',
              title: 'Closing Time',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: 'time',
                  invert: false,
                }).error('Please use 24-hour format (e.g., 09:00 or 17:30)'),
              hidden: ({parent}) => !parent?.isOpen,
            },
          ],
        },
        {
          name: 'thursday',
          title: 'Thursday',
          type: 'object',
          fields: [
            {
              name: 'isOpen',
              title: 'Open on Thursday',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'open',
              title: 'Opening Time',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: 'time',
                  invert: false,
                }).error('Please use 24-hour format (e.g., 09:00 or 17:30)'),
              hidden: ({parent}) => !parent?.isOpen,
            },
            {
              name: 'close',
              title: 'Closing Time',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: 'time',
                  invert: false,
                }).error('Please use 24-hour format (e.g., 09:00 or 17:30)'),
              hidden: ({parent}) => !parent?.isOpen,
            },
          ],
        },
        {
          name: 'friday',
          title: 'Friday',
          type: 'object',
          fields: [
            {
              name: 'isOpen',
              title: 'Open on Friday',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'open',
              title: 'Opening Time',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: 'time',
                  invert: false,
                }).error('Please use 24-hour format (e.g., 09:00 or 17:30)'),
              hidden: ({parent}) => !parent?.isOpen,
            },
            {
              name: 'close',
              title: 'Closing Time',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: 'time',
                  invert: false,
                }).error('Please use 24-hour format (e.g., 09:00 or 17:30)'),
              hidden: ({parent}) => !parent?.isOpen,
            },
          ],
        },
        {
          name: 'saturday',
          title: 'Saturday',
          type: 'object',
          fields: [
            {
              name: 'isOpen',
              title: 'Open on Saturday',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'open',
              title: 'Opening Time',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: 'time',
                  invert: false,
                }).error('Please use 24-hour format (e.g., 09:00 or 17:30)'),
              hidden: ({parent}) => !parent?.isOpen,
            },
            {
              name: 'close',
              title: 'Closing Time',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: 'time',
                  invert: false,
                }).error('Please use 24-hour format (e.g., 09:00 or 17:30)'),
              hidden: ({parent}) => !parent?.isOpen,
            },
          ],
        },
        {
          name: 'sunday',
          title: 'Sunday',
          type: 'object',
          fields: [
            {
              name: 'isOpen',
              title: 'Open on Sunday',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'open',
              title: 'Opening Time',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: 'time',
                  invert: false,
                }).error('Please use 24-hour format (e.g., 09:00 or 17:30)'),
              hidden: ({parent}) => !parent?.isOpen,
            },
            {
              name: 'close',
              title: 'Closing Time',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: 'time',
                  invert: false,
                }).error('Please use 24-hour format (e.g., 09:00 or 17:30)'),
              hidden: ({parent}) => !parent?.isOpen,
            },
          ],
        },
        {
          name: 'notes',
          title: 'Hours Notes',
          type: 'text',
          rows: 4,
        },
      ],
    }),

    // Categories
    defineField({
      name: 'categories',
      title: 'Categories and SubCategories',
      type: 'array',
      group: 'categories',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'mainCategory',
              title: 'Main Category',
              type: 'reference',
              to: [{type: 'taxonomy'}],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'subCategories',
              title: 'SubCategories',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'taxonomy'}]}],
            },
          ],
          preview: {
            select: {
              mainCategory: 'mainCategory.name',
              subCategories: 'subCategories',
            },
            prepare({mainCategory, subCategories}) {
              const subCount = subCategories?.length || 0
              return {
                title: mainCategory || 'Untitled',
                subtitle: subCount > 0 ? `${subCount} subcategories` : 'No subcategories',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),

    // Geographic Data
    defineField({
      name: 'geo',
      title: 'Geographic Coordinates',
      type: 'object',
      group: 'geo',
      fields: [
        {
          name: 'x',
          title: 'X Coordinate',
          type: 'number',
          readOnly: true,
        },
        {
          name: 'y',
          title: 'Y Coordinate',
          type: 'number',
          readOnly: true,
        },
        {
          name: 'lat',
          title: 'Latitude',
          type: 'number',
          readOnly: true,
        },
        {
          name: 'long',
          title: 'Longitude',
          type: 'number',
          readOnly: true,
        },
      ],
    }),

    // System Fields
    defineField({
      name: 'mduid',
      title: 'MDUID',
      type: 'string',
      hidden: true,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'physicalAddress.city',
      featured: 'featured',
    },
    prepare({title, subtitle, featured}) {
      return {
        title: title || 'Untitled Location',
        subtitle: subtitle ? `${subtitle}${featured ? ' • Featured' : ''}` : undefined,
      }
    },
  },
})

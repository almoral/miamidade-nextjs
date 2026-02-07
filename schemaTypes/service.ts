import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    {name: 'basic', title: 'Basic Info'},
    {name: 'content', title: 'Content'},
    {name: 'channels', title: 'Access Channels'},
    {name: 'relations', title: 'Related Items'},
    {name: 'script', title: '311 Script'},
  ],
  fields: [
    // Basic Information
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'reference',
      to: [{type: 'organization'}],
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subOrganization',
      title: 'Sub-Organization',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'internalService',
      title: 'Internal Service',
      type: 'boolean',
      group: 'basic',
    }),
    defineField({
      name: 'showFaqs',
      title: 'Show FAQs',
      type: 'boolean',
      group: 'basic',
    }),
    defineField({
      name: 'loginRequired',
      title: 'Login Required',
      type: 'boolean',
      group: 'basic',
    }),
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
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
      name: 'serviceDisplayName',
      title: 'Service Display Name',
      type: 'string',
      description: 'Name to be displayed on the Service page if filled out.',
      group: 'basic',
    }),
    defineField({
      name: 'nameDetails',
      title: 'Service Name Sub-Title',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      group: 'basic',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      description: 'Keywords to tag the service for the knowledgebase.',
      type: 'text',
      rows: 4,
      group: 'basic',
    }),
    defineField({
      name: 'alternateNames',
      title: 'Alternate Names',
      description: 'Additional names the service may be referenced by. Names should be separated by commas.',
      type: 'text',
      rows: 4,
      group: 'basic',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      description: 'Less than 155 characters that will appear in search results.',
      type: 'string',
      validation: (Rule) => Rule.required().max(155),
      group: 'content',
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),

    // Categories
    defineField({
      name: 'categories',
      title: 'Categories and SubCategories',
      type: 'reference',
      to: [{type: 'taxonomy'}]
    }),

    // Audience & Service Type
    defineField({
      name: 'audience',
      title: 'Audience',
      type: 'array',
      of: [{type: 'string'}],
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'selfService',
      title: 'Service Type',
      type: 'array',
      of: [{type: 'string'}],
      group: 'basic',
    }),

    // Collections
    defineField({
      name: 'showLicenseCollection',
      title: 'Add License Collection',
      type: 'boolean',
      group: 'basic',
    }),
    defineField({
      name: 'showProductCollection',
      title: 'Add Product Collection',
      type: 'boolean',
      group: 'basic',
    }),
    defineField({
      name: 'collectionTitle',
      title: 'Collection Title',
      type: 'string',
      group: 'basic',
    }),

    // Service Fees
    defineField({
      name: 'serviceFee',
      title: 'Service Fees',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'typeFee',
          title: 'Fee Type',
          type: 'string',
          options: {
            list: [
              {title: 'Display No Fee', value: 'noFee'},
              {title: 'Free', value: 'free'},
              {title: 'Fee', value: 'fee'},
              {title: 'Prices Vary', value: 'vary'},
            ],
          },
          initialValue: 'noFee',
        },
        {
          name: 'fee',
          title: 'Fee Amount',
          type: 'string',
          hidden: ({parent}) => parent?.typeFee !== 'fee',
        },
        {
          name: 'pricesVary',
          title: 'Prices Vary Details',
          type: 'text',
          rows: 8,
          hidden: ({parent}) => parent?.typeFee !== 'vary',
        },
      ],
    }),

    // Service Image
    defineField({
      name: 'serviceImage',
      title: 'Service Image',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'image',
          title: 'Image',
          description: 'The image should be 1200 x 630 (Open Graph size).',
          type: 'image',
          options: {hotspot: true},
        },
        {
          name: 'imageAlt',
          title: 'Alternate Text',
          type: 'string',
        },
      ],
    }),

    // Service Details
    defineField({
      name: 'closeSections',
      title: 'Close All Details Sections',
      type: 'boolean',
      group: 'content',
    }),
    defineField({
      name: 'details',
      title: 'Service Details',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
            },
            {
              name: 'customTitle',
              title: 'Custom Title',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Section Content',
              type: 'array',
              of: [{type: 'block'}],
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(25),
    }),

    // Digital Channels
    defineField({
      name: 'onlineChannels',
      title: 'Digital Channels',
      type: 'array',
      group: 'channels',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Service Request', value: 'service-request'},
                  {title: 'Make Payment', value: 'make-payment'},
                  {title: 'Online Service', value: 'online-service'},
                ],
              },
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
            {
              name: 'openInNewWindow',
              title: 'Open in New Window',
              type: 'boolean',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(20),
    }),

    // Phone
    defineField({
      name: 'phoneContacts',
      title: 'Phone Contacts',
      type: 'array',
      group: 'channels',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'phoneLabel',
              title: 'Label',
              type: 'string',
            },
            {
              name: 'phone',
              title: 'Phone Number',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(10),
    }),

    // Email
    defineField({
      name: 'emailContacts',
      title: 'Email Contacts',
      type: 'array',
      group: 'channels',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'emailLabel',
              title: 'Label',
              type: 'string',
            },
            {
              name: 'email',
              title: 'Email Address',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(10),
    }),

    // Mail
    defineField({
      name: 'mailAddress',
      title: 'Mail Address',
      type: 'object',
      group: 'channels',
      fields: [
        {name: 'attention', title: 'Attention', type: 'string'},
        {name: 'address', title: 'Address 1', type: 'string'},
        {name: 'address2', title: 'Address 2', type: 'string'},
        {name: 'city', title: 'City', type: 'string'},
        {
          name: 'state',
          title: 'State',
          type: 'string',
          options: {
            list: ['FL', 'GA', 'NC'],
          },
          initialValue: 'FL',
        },
        {name: 'zip', title: 'ZIP', type: 'string'},
      ],
    }),

    // Locations
    defineField({
      name: 'locations',
      title: 'In-Person Locations',
      type: 'array',
      group: 'channels',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'openAccordion',
              title: 'Open Accordion',
              type: 'boolean',
            },
            {
              name: 'location',
              title: 'Location',
              type: 'string',
            },
            {
              name: 'locationSpecifics',
              title: 'Location Specifics',
              description: 'Floor / Room Name / Room Number',
              type: 'string',
            },
            {
              name: 'telephone',
              title: 'Telephone',
              type: 'string',
            },
            {
              name: 'locationHasHours',
              title: 'Use Location Hours',
              type: 'boolean',
            },
            {
              name: 'publicHours',
              title: 'Public Hours',
              type: 'object',
              fields: [
                {name: 'mondayOpen', title: 'Monday Open', type: 'string'},
                {name: 'mondayClose', title: 'Monday Close', type: 'string'},
                {name: 'tuesdayOpen', title: 'Tuesday Open', type: 'string'},
                {name: 'tuesdayClose', title: 'Tuesday Close', type: 'string'},
                {name: 'wednesdayOpen', title: 'Wednesday Open', type: 'string'},
                {name: 'wednesdayClose', title: 'Wednesday Close', type: 'string'},
                {name: 'thursdayOpen', title: 'Thursday Open', type: 'string'},
                {name: 'thursdayClose', title: 'Thursday Close', type: 'string'},
                {name: 'fridayOpen', title: 'Friday Open', type: 'string'},
                {name: 'fridayClose', title: 'Friday Close', type: 'string'},
                {name: 'saturdayOpen', title: 'Saturday Open', type: 'string'},
                {name: 'saturdayClose', title: 'Saturday Close', type: 'string'},
                {name: 'sundayOpen', title: 'Sunday Open', type: 'string'},
                {name: 'sundayClose', title: 'Sunday Close', type: 'string'},
                {name: 'notes', title: 'Hours Notes', type: 'text'},
              ],
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(20),
    }),

    // Related Documents
    defineField({
      name: 'relatedDocuments',
      title: 'Related Documents',
      type: 'object',
      group: 'relations',
      fields: [
        {
          name: 'documentDisclaimer',
          title: 'Document Disclaimer',
          type: 'string',
        },
        {
          name: 'documents',
          title: 'Documents',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'documentName', title: 'Document Name', type: 'string'},
                {name: 'documentUrl', title: 'Document URL', type: 'url'},
              ],
            },
          ],
          validation: (Rule) => Rule.max(100),
        },
      ],
    }),

    // Related Items (as references or strings for now)
    defineField({
      name: 'regulations',
      title: 'Related Regulations',
      type: 'array',
      of: [{type: 'string'}],
      group: 'relations',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'products',
      title: 'Related Products',
      type: 'array',
      of: [{type: 'string'}],
      group: 'relations',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'licenses',
      title: 'Related Licenses',
      type: 'array',
      of: [{type: 'string'}],
      group: 'relations',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'featuredServices',
      title: 'Related Services',
      type: 'array',
      of: [{type: 'string'}],
      group: 'relations',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'relatedFaqs',
      title: 'Related FAQs',
      type: 'array',
      of: [{type: 'string'}],
      group: 'relations',
      validation: (Rule) => Rule.max(100),
    }),

    // Service Request URLs
    defineField({
      name: 'serviceRequestURLs',
      title: 'Service Requests',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Service Request Name', type: 'string'},
            {name: 'description', title: 'Service Request Description', type: 'string'},
            {name: 'link', title: 'Service Request URL', type: 'url'},
            {name: 'buttonText', title: 'Button Text', type: 'string'},
            {name: 'displayName', title: 'Display Name', type: 'string'},
          ],
        },
      ],
    }),

    // 311 Script Tab
    defineField({
      name: 'callTakerScripts',
      title: 'Call Taker Scripts',
      type: 'array',
      group: 'script',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{type: 'block'}],
            },
            {
              name: 'serviceRequestURLs',
              title: 'Service Request URLs',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'title', title: 'Service Request Name', type: 'string'},
                    {name: 'description', title: 'Service Request Description', type: 'string'},
                    {name: 'buttonText', title: 'Button Text', type: 'string'},
                    {name: 'link', title: 'Service Request URL', type: 'url'},
                    {name: 'srType', title: 'Service Request Type', type: 'string'},
                  ],
                },
              ],
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),

    // Hidden/System Fields
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
      media: 'serviceImage.image',
      subtitle: 'description',
    },
  },
})

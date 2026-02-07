import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'organization',
  title: 'Organization',
  type: 'document',
  groups: [
    {name: 'basic', title: 'Basic Info'},
    {name: 'jurisdiction', title: 'Jurisdiction'},
    {name: 'content', title: 'Content'},
    {name: 'leadership', title: 'Leadership'},
    {name: 'contact', title: 'Contact & Locations'},
    {name: 'social', title: 'Social Media'},
    {name: 'relations', title: 'Related Items'},
    {name: 'accessibility', title: 'ADA & Accessibility'},
  ],
  fields: [
    // Jurisdiction
    defineField({
      name: 'jurisdiction',
      title: 'Jurisdiction',
      type: 'object',
      group: 'jurisdiction',
      fields: [
        {
          name: 'jurisdiction',
          title: 'Jurisdiction',
          type: 'string',
          options: {
            list: [
              {title: 'Federal Organization', value: 'federal'},
              {title: 'State Organization', value: 'state'},
              {title: 'Local Organization', value: 'local'},
              {title: 'Other', value: 'other'},
            ],
          },
          initialValue: 'local',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'localType',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              {title: 'County', value: 'county'},
              {title: 'Municipality', value: 'municipality'},
            ],
          },
          initialValue: 'county',
          validation: (Rule) => Rule.required(),
          hidden: ({parent}) => parent?.jurisdiction !== 'local',
        },
        {
          name: 'county',
          title: 'County',
          type: 'string',
          options: {
            list: [
              {title: 'Miami-Dade County', value: 'miami-dade'},
              {title: 'Broward County', value: 'broward'},
              {title: 'Monroe County', value: 'monroe'},
            ],
          },
          initialValue: 'miami-dade',
          validation: (Rule) => Rule.required(),
          hidden: ({parent}) => parent?.localType !== 'county',
        },
        {
          name: 'municipality',
          title: 'Municipality',
          type: 'string',
          options: {
            list: [
              {title: 'Aventura', value: 'aventura'},
              {title: 'Bal Harbour', value: 'bal-harbour'},
              {title: 'Bay Harbor Islands', value: 'bay-harbor-islands'},
              {title: 'Biscayne Park', value: 'biscayne-park'},
              {title: 'Coral Gables', value: 'coral-gables'},
              {title: 'Cutler Bay', value: 'cutler-bay'},
              {title: 'El Portal', value: 'el-portal'},
              {title: 'Florida City', value: 'florida-city'},
              {title: 'Golden Beach', value: 'golden-beach'},
              {title: 'Hialeah', value: 'hialeah'},
              {title: 'Hialeah Gardens', value: 'hialeah-gardens'},
              {title: 'Homestead', value: 'homestead'},
              {title: 'Indian Creek Village', value: 'indian-creek-village'},
              {title: 'Key Biscayne', value: 'key-biscayne'},
              {title: 'Medley', value: 'medley'},
              {title: 'Miami', value: 'miami'},
              {title: 'Miami Beach', value: 'miami-beach'},
              {title: 'Miami Gardens', value: 'miami-gardens'},
              {title: 'Miami Lakes', value: 'miami-lakes'},
              {title: 'Miami Shores', value: 'miami-shores'},
              {title: 'Miami Springs', value: 'miami-springs'},
              {title: 'North Bay Village', value: 'north-bay-village'},
              {title: 'North Miami', value: 'north-miami'},
              {title: 'North Miami Beach', value: 'north-miami-beach'},
              {title: 'Opa-Locka', value: 'opa-locka'},
              {title: 'Palmetto Bay', value: 'palmetto-bay'},
              {title: 'Pinecrest', value: 'pinecrest'},
              {title: 'South Miami', value: 'south-miami'},
              {title: 'Sunny Isles Beach', value: 'sunny-isles-beach'},
              {title: 'Surfside', value: 'surfside'},
              {title: 'Sweetwater', value: 'sweetwater'},
              {title: 'Unincorporated Miami-Dade', value: 'unincorporated'},
              {title: 'Virginia Gardens', value: 'virginia-gardens'},
              {title: 'West Miami', value: 'west-miami'},
            ],
          },
          hidden: ({parent}) => parent?.localType !== 'municipality',
        },
        {
          name: 'agencyType',
          title: 'Agency Type',
          type: 'string',
          options: {
            list: [
              {title: 'Board', value: 'board'},
              {title: 'Community Councils', value: 'community-councils'},
              {title: 'Constitutional Offices', value: 'constitutional-offices'},
              {title: 'Department', value: 'department'},
              {title: 'Elected Official', value: 'elected'},
              {title: 'Office', value: 'office'},
              {title: 'Task Force', value: 'task-force'},
              {title: 'Trust', value: 'trust'},
              {title: 'Other', value: 'other'},
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subType',
          title: 'Sub Type',
          type: 'string',
        },
      ],
    }),

    // Basic Information
    defineField({
      name: 'name',
      title: 'Name',
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
      name: 'acronym',
      title: 'Acronym',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'legalName',
      title: 'Legal Name',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'betaName',
      title: 'BETA Name',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'betaUrl',
      title: 'BETA URL',
      type: 'url',
      group: 'basic',
    }),
    defineField({
      name: 'contactLabel',
      title: 'Contact Us Page Label',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'contactUrl',
      title: 'Contact Us Page URL',
      type: 'url',
      group: 'basic',
    }),
    defineField({
      name: 'aboutLabel',
      title: 'About Us Page Label',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'aboutUrl',
      title: 'About Us Page URL',
      type: 'url',
      group: 'basic',
    }),
    defineField({
      name: 'requestPublicRecordsUrl',
      title: 'Request Public Records URL',
      type: 'url',
      group: 'basic',
    }),

    // Content & Descriptions
    defineField({
      name: 'description',
      title: 'Short Description',
      description: 'Less than 155 characters that will appear in search results.',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.max(155),
    }),
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),

    // Images
    defineField({
      name: 'logo',
      title: 'Brand / Logo',
      type: 'image',
      options: {hotspot: true},
      group: 'content',
    }),
    defineField({
      name: 'departmentImage',
      title: 'Department Image',
      type: 'image',
      options: {hotspot: true},
      group: 'content',
    }),

    // Leadership
    defineField({
      name: 'leaderTitle',
      title: 'Leader Title',
      type: 'string',
      options: {
        list: [
          {title: 'Director', value: 'Director'},
          {title: 'President', value: 'President'},
          {title: 'Mayor', value: 'Mayor'},
          {title: 'CEO', value: 'CEO'},
          {title: 'Commissioner', value: 'Commissioner'},
          {title: 'Other', value: 'other'},
        ],
      },
      group: 'leadership',
    }),
    defineField({
      name: 'leaderTitleOther',
      title: 'Leader Title - Other',
      type: 'string',
      group: 'leadership',
      hidden: ({parent}) => parent?.leaderTitle !== 'other',
    }),
    defineField({
      name: 'leaderName',
      title: 'Leader Name',
      type: 'string',
      group: 'leadership',
    }),
    defineField({
      name: 'leaderImage',
      title: 'Leader Picture',
      type: 'image',
      options: {hotspot: true},
      group: 'leadership',
    }),
    defineField({
      name: 'leaderImageLarge',
      title: 'Leader Picture Large',
      description: '1200px x 675px',
      type: 'image',
      options: {hotspot: true},
      group: 'leadership',
    }),
    defineField({
      name: 'leaderUrl',
      title: 'Leader URL',
      type: 'url',
      group: 'leadership',
    }),

    // Locations
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      group: 'contact',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'location',
              title: 'Location',
              type: 'reference',
              to: [{type: 'location'}],
              validation: (Rule) => Rule.required(),
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
              name: 'fax',
              title: 'Fax',
              type: 'string',
            },
            {
              name: 'email',
              title: 'Email',
              type: 'string',
            },
            {
              name: 'url',
              title: 'Primary URL',
              type: 'url',
            },
          ],
          preview: {
            select: {
              locationName: 'location.name',
              telephone: 'telephone',
            },
            prepare({locationName, telephone}) {
              return {
                title: locationName || 'Location',
                subtitle: telephone,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(2),
    }),

    // Sub-Organizations
    defineField({
      name: 'subOrganizations',
      title: 'Sub Organizations',
      type: 'array',
      of: [{type: 'string'}],
      group: 'relations',
      validation: (Rule) => Rule.max(10),
    }),

    // Top Services
    defineField({
      name: 'topServices',
      title: 'Top Services',
      type: 'array',
      of: [{type: 'string'}],
      group: 'relations',
      validation: (Rule) => Rule.min(1).max(4),
    }),

    // Social Media
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'socialChannel',
              title: 'Social Channel',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Twitter', value: 'twitter'},
                  {title: 'Pinterest', value: 'pinterest'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'NextDoor', value: 'home'},
                  {title: 'LinkedIn', value: 'linkedin'},
                ],
              },
            },
            {
              name: 'url',
              title: 'Channel URL',
              type: 'url',
            },
            {
              name: 'socialChannelTitle',
              title: 'Social Channel Title',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'socialChannel',
              subtitle: 'url',
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: 'twitterFeed',
      title: 'Twitter Feed',
      description: 'Insert Twitter Feed code here.',
      type: 'text',
      rows: 10,
      group: 'social',
    }),

    // ADA Information
    defineField({
      name: 'ada',
      title: 'ADA Information',
      type: 'object',
      group: 'accessibility',
      fields: [
        {
          name: 'adaDisclaimer',
          title: 'ADA Disclaimer',
          type: 'array',
          of: [{type: 'block'}],
        },
        {
          name: 'adaName',
          title: 'ADA Contact Name',
          type: 'string',
        },
        {
          name: 'adaEmail',
          title: 'ADA Email',
          type: 'string',
        },
        {
          name: 'adaPhone',
          title: 'ADA Phone',
          type: 'string',
        },
      ],
    }),

    // Important Message
    defineField({
      name: 'importantMessage',
      title: 'Important Message',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'messageTitle',
          title: 'Message Title',
          description: 'Short title for the Organization Important Message.',
          type: 'string',
          validation: (Rule) => Rule.max(155),
        },
        {
          name: 'orgMessage',
          title: 'Organization Message',
          type: 'array',
          of: [{type: 'block'}],
        },
      ],
    }),

    // Hidden System Fields
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
      subtitle: 'jurisdiction.agencyType',
      media: 'logo',
    },
  },
})

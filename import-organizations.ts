import {createClient} from '@sanity/client'
import {parseStringPromise} from 'xml2js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'
import {getCliClient} from 'sanity/cli'

// Load environment variables
dotenv.config()

// Initialize Sanity client using CLI authentication
// This uses the same authentication as `sanity login`
const client = getCliClient({
  apiVersion: '2024-01-01',
})

interface XMLOrganization {
  organization: {
    jurisdiction?: string[]
    localType?: string[]
    county?: string[]
    municipality?: string[]
    agencyType?: string[]
    subType?: string[]
    name?: string[]
    acronym?: string[]
    betaName?: string[]
    betaUrl?: string[]
    contactLabel?: string[]
    contactUrl?: string[]
    aboutLabel?: string[]
    aboutUrl?: string[]
    legalName?: string[]
    description?: string[]
    mission?: string[]
    overview?: string[]
    longDescription?: string[]
    logo?: string[]
    departmentImage?: string[]
    leaderTitle?: string[]
    leaderTitleOther?: string[]
    leaderName?: string[]
    leaderImage?: string[]
    leaderUrl?: string[]
    locations?: Array<{
      location?: string[]
      locationSpecifics?: string[]
      telephone?: string[]
      fax?: string[]
      email?: string[]
      url?: string[]
    }>
    socialMedia?: Array<{
      socialChannel?: Array<{_: string; $: {url: string}}>
      socialChannelTitle?: string[]
    }>
    twitterFeed?: string[]
    ada?: Array<{
      adaDisclaimer?: string[]
      adaName?: string[]
      adaEmail?: string[]
      adaPhone?: string[]
    }>
    slug?: string[]
    mduid?: string[]
    messsageTitle?: string[]
    orgMessage?: string[]
  }
}

// Helper function to extract value from XML array
function getValue(arr: any[] | undefined, defaultValue = ''): string {
  if (!arr || arr.length === 0) return defaultValue
  const value = arr[0]
  return typeof value === 'string' ? value.trim() : defaultValue
}

// Helper function to convert text to portable text
function textToPortableText(text: string) {
  if (!text || text.trim() === '') return undefined
  return [
    {
      _type: 'block',
      _key: Math.random().toString(36).substring(7),
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: Math.random().toString(36).substring(7),
          text: text.trim(),
          marks: [],
        },
      ],
      markDefs: [],
    },
  ]
}

// Function to parse XML file and convert to Sanity document
async function parseXMLToSanityDoc(filePath: string) {
  const xmlContent = fs.readFileSync(filePath, 'utf-8')
  const parsed: XMLOrganization = await parseStringPromise(xmlContent)
  const org = parsed.organization

  // Extract slug from filename
  const slug = path.basename(filePath)

  // Build jurisdiction object
  const jurisdiction: any = {
    _type: 'object',
    jurisdiction: getValue(org.jurisdiction, 'local'),
    localType: getValue(org.localType, 'county'),
    agencyType: getValue(org.agencyType),
    subType: getValue(org.subType),
  }

  if (jurisdiction.localType === 'county') {
    jurisdiction.county = getValue(org.county, 'miami-dade')
  } else if (jurisdiction.localType === 'municipality') {
    jurisdiction.municipality = getValue(org.municipality)
  }

  // Build locations array
  const locations: any[] = []
  if (org.locations && org.locations.length > 0) {
    org.locations.forEach((loc: any) => {
      const location = getValue(loc.location)
      if (location) {
        locations.push({
          _type: 'object',
          _key: Math.random().toString(36).substring(7),
          location,
          locationSpecifics: getValue(loc.locationSpecifics),
          telephone: getValue(loc.telephone),
          fax: getValue(loc.fax),
          email: getValue(loc.email),
          url: getValue(loc.url),
        })
      }
    })
  }

  // Build social media array
  const socialMedia: any[] = []
  if (org.socialMedia && org.socialMedia.length > 0) {
    org.socialMedia.forEach((social: any) => {
      let channel = ''
      let url = ''

      if (social.socialChannel && social.socialChannel.length > 0) {
        const channelData = social.socialChannel[0]
        if (typeof channelData === 'string') {
          channel = channelData.trim()
        } else if (channelData._ && channelData.$?.url) {
          channel = channelData._.trim()
          url = channelData.$.url
        }
      }

      if (channel && url) {
        socialMedia.push({
          _type: 'object',
          _key: Math.random().toString(36).substring(7),
          socialChannel: channel,
          url,
          socialChannelTitle: getValue(social.socialChannelTitle),
        })
      }
    })
  }

  // Build ADA information
  let ada: any = undefined
  if (org.ada && org.ada.length > 0) {
    const adaData = org.ada[0]
    const adaDisclaimerText = getValue(adaData.adaDisclaimer)
    const adaName = getValue(adaData.adaName)
    const adaEmail = getValue(adaData.adaEmail)
    const adaPhone = getValue(adaData.adaPhone)

    if (adaDisclaimerText || adaName || adaEmail || adaPhone) {
      ada = {
        _type: 'object',
        adaDisclaimer: textToPortableText(adaDisclaimerText),
        adaName,
        adaEmail,
        adaPhone,
      }
    }
  }

  // Build important message
  let importantMessage: any = undefined
  const messageTitle = getValue(org.messsageTitle)
  const orgMessage = getValue(org.orgMessage)
  if (messageTitle || orgMessage) {
    importantMessage = {
      _type: 'object',
      messageTitle,
      orgMessage: textToPortableText(orgMessage),
    }
  }

  // Build the Sanity document
  const doc: any = {
    _type: 'organization',
    _id: getValue(org.mduid) || `org-${slug}`,
    jurisdiction,
    name: getValue(org.name),
    slug: {
      _type: 'slug',
      current: slug,
    },
    acronym: getValue(org.acronym),
    legalName: getValue(org.legalName),
    betaName: getValue(org.betaName),
    description: getValue(org.description),
    mission: textToPortableText(getValue(org.mission)),
    overview: textToPortableText(getValue(org.overview)),
    longDescription: textToPortableText(getValue(org.longDescription)),
    mduid: getValue(org.mduid),
  }

  // Add optional URL fields
  if (getValue(org.betaUrl)) doc.betaUrl = getValue(org.betaUrl)
  if (getValue(org.contactLabel)) doc.contactLabel = getValue(org.contactLabel)
  if (getValue(org.contactUrl)) doc.contactUrl = getValue(org.contactUrl)
  if (getValue(org.aboutLabel)) doc.aboutLabel = getValue(org.aboutLabel)
  if (getValue(org.aboutUrl)) doc.aboutUrl = getValue(org.aboutUrl)

  // Add leader information
  const leaderTitle = getValue(org.leaderTitle)
  if (leaderTitle) {
    doc.leaderTitle = leaderTitle
    if (leaderTitle === 'other') {
      doc.leaderTitleOther = getValue(org.leaderTitleOther)
    }
  }
  if (getValue(org.leaderName)) doc.leaderName = getValue(org.leaderName)
  if (getValue(org.leaderUrl)) doc.leaderUrl = getValue(org.leaderUrl)

  // Add locations (required field)
  if (locations.length > 0) {
    doc.locations = locations
  }

  // Add social media
  if (socialMedia.length > 0) {
    doc.socialMedia = socialMedia
  }

  // Add Twitter feed
  if (getValue(org.twitterFeed)) {
    doc.twitterFeed = getValue(org.twitterFeed)
  }

  // Add ADA information
  if (ada) {
    doc.ada = ada
  }

  // Add important message
  if (importantMessage) {
    doc.importantMessage = importantMessage
  }

  return doc
}

// Main import function
async function importAllOrganizations() {
  const orgDataDir = path.join(__dirname, 'schemaTypes', 'org-data')
  const files = fs.readdirSync(orgDataDir).filter((file) => {
    const filePath = path.join(orgDataDir, file)
    // Only process files (not directories) and skip hidden files like .DS_Store
    return fs.statSync(filePath).isFile() && !file.startsWith('.')
  })

  console.log(`Found ${files.length} XML files to import`)

  const results = {
    success: [] as string[],
    failed: [] as Array<{file: string; error: string}>,
  }

  for (const file of files) {
    try {
      const filePath = path.join(orgDataDir, file)
      console.log(`\nProcessing: ${file}`)

      const doc = await parseXMLToSanityDoc(filePath)
      console.log(`  - Parsed document: ${doc.name}`)

      // Create or replace the document in Sanity
      await client.createOrReplace(doc)
      console.log(`  ✓ Successfully imported: ${doc.name}`)

      results.success.push(file)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`  ✗ Failed to import ${file}: ${errorMessage}`)
      results.failed.push({file, error: errorMessage})
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60))
  console.log('IMPORT SUMMARY')
  console.log('='.repeat(60))
  console.log(`Total files: ${files.length}`)
  console.log(`Successfully imported: ${results.success.length}`)
  console.log(`Failed: ${results.failed.length}`)

  if (results.failed.length > 0) {
    console.log('\nFailed imports:')
    results.failed.forEach(({file, error}) => {
      console.log(`  - ${file}: ${error}`)
    })
  }

  console.log('\n✓ Import process completed!')
}

// Run the import
importAllOrganizations().catch((error) => {
  console.error('Fatal error during import:', error)
  process.exit(1)
})

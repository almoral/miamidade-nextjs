import {parseStringPromise} from 'xml2js'
import * as fs from 'fs'
import * as path from 'path'

// Helper function to extract value from XML array
function getValue(arr: any[] | undefined, defaultValue = ''): string {
  if (!arr || arr.length === 0) return defaultValue
  const value = arr[0]
  return typeof value === 'string' ? value.trim() : defaultValue
}

// Helper function to convert HTML to portable text (simplified)
function htmlToPortableText(html: string) {
  if (!html || html.trim() === '') return undefined
  
  // For now, strip HTML tags and create simple blocks
  // In production, you'd want to use a proper HTML to Portable Text converter
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  
  if (!text) return undefined
  
  return [
    {
      _type: 'block',
      _key: Math.random().toString(36).substring(7),
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: Math.random().toString(36).substring(7),
          text,
          marks: [],
        },
      ],
      markDefs: [],
    },
  ]
}

// Parse hours from XML
function parseServiceHours(hoursData: any) {
  if (!hoursData || hoursData.length === 0) return undefined

  const hours = hoursData[0]
  
  return {
    _type: 'object',
    mondayOpen: getValue(hours.monday?.[0]?.$?.open),
    mondayClose: getValue(hours.monday?.[0]?.$?.close),
    tuesdayOpen: getValue(hours.tuesday?.[0]?.$?.open),
    tuesdayClose: getValue(hours.tuesday?.[0]?.$?.close),
    wednesdayOpen: getValue(hours.wednesday?.[0]?.$?.open),
    wednesdayClose: getValue(hours.wednesday?.[0]?.$?.close),
    thursdayOpen: getValue(hours.thursday?.[0]?.$?.open),
    thursdayClose: getValue(hours.thursday?.[0]?.$?.close),
    fridayOpen: getValue(hours.friday?.[0]?.$?.open),
    fridayClose: getValue(hours.friday?.[0]?.$?.close),
    saturdayOpen: getValue(hours.saturday?.[0]?.$?.open),
    saturdayClose: getValue(hours.saturday?.[0]?.$?.close),
    sundayOpen: getValue(hours.sunday?.[0]?.$?.open),
    sundayClose: getValue(hours.sunday?.[0]?.$?.close),
    notes: getValue(hours.notes),
  }
}

// Function to parse XML file and convert to Sanity document
async function parseXMLToSanityDoc(filePath: string) {
  const xmlContent = fs.readFileSync(filePath, 'utf-8')
  const parsed: any = await parseStringPromise(xmlContent)
  const svc = parsed.service

  // Extract slug from filename
  const slug = path.basename(filePath)

  // Build categories array
  const categories: any[] = []
  if (svc.category && Array.isArray(svc.category)) {
    svc.category.forEach((cat: any) => {
      const mainCategory = getValue(cat.mainCategory)
      const subCategory = getValue(cat.subCategory)
      
      if (mainCategory) {
        categories.push({
          _type: 'object',
          _key: Math.random().toString(36).substring(7),
          mainCategory,
          subCategory,
        })
      }
    })
  }

  // Build audience array
  const audienceStr = getValue(svc.audience)
  const audience = audienceStr ? audienceStr.split(',').map(a => a.trim()).filter(Boolean) : []

  // Build selfService array
  const selfServiceStr = getValue(svc.selfService)
  const selfService = selfServiceStr ? selfServiceStr.split(',').map(s => s.trim()).filter(Boolean) : []

  // Build service fees
  let serviceFee = undefined
  if (svc.serviceFee && svc.serviceFee[0]) {
    const fee = svc.serviceFee[0]
    serviceFee = {
      _type: 'object',
      typeFee: getValue(fee.typeFee, 'noFee'),
      fee: getValue(fee.fee),
      pricesVary: getValue(fee.pricesVary),
    }
  }

  // Build service image
  let serviceImage = undefined
  if (svc.serviceImage && svc.serviceImage[0]) {
    const img = svc.serviceImage[0]
    serviceImage = {
      _type: 'object',
      imageAlt: getValue(img.imageAlt),
      // Note: actual image would need to be uploaded separately
    }
  }

  // Build details
  const details: any[] = []
  if (svc.details && Array.isArray(svc.details)) {
    svc.details.forEach((detail: any) => {
      const content = getValue(detail.content)
      details.push({
        _type: 'object',
        _key: Math.random().toString(36).substring(7),
        title: getValue(detail.title),
        customTitle: getValue(detail.customTitle),
        content: htmlToPortableText(content),
      })
    })
  }

  // Build online channels
  const onlineChannels: any[] = []
  if (svc.onlineChannelContainer && Array.isArray(svc.onlineChannelContainer)) {
    svc.onlineChannelContainer.forEach((channel: any) => {
      onlineChannels.push({
        _type: 'object',
        _key: Math.random().toString(36).substring(7),
        type: getValue(channel.type),
        label: getValue(channel.label),
        url: getValue(channel.url),
        openInNewWindow: getValue(channel.urlType) === 'true',
      })
    })
  }

  // Build phone contacts
  const phoneContacts: any[] = []
  if (svc.phoneContainer && Array.isArray(svc.phoneContainer)) {
    svc.phoneContainer.forEach((phone: any) => {
      phoneContacts.push({
        _type: 'object',
        _key: Math.random().toString(36).substring(7),
        phoneLabel: getValue(phone.phoneLabel),
        phone: getValue(phone.phone),
      })
    })
  }

  // Build email contacts
  const emailContacts: any[] = []
  if (svc.emailContainer && Array.isArray(svc.emailContainer)) {
    svc.emailContainer.forEach((email: any) => {
      emailContacts.push({
        _type: 'object',
        _key: Math.random().toString(36).substring(7),
        emailLabel: getValue(email.emailLabel),
        email: getValue(email.email),
      })
    })
  }

  // Build mail address
  let mailAddress = undefined
  if (svc.mailContainer && svc.mailContainer[0]) {
    const mail = svc.mailContainer[0]
    mailAddress = {
      _type: 'object',
      attention: getValue(mail.attention),
      address: getValue(mail.address),
      address2: getValue(mail.address2),
      city: getValue(mail.city),
      state: getValue(mail.state, 'FL'),
      zip: getValue(mail.zip),
    }
  }

  // Build locations
  const locations: any[] = []
  if (svc.locations && Array.isArray(svc.locations)) {
    svc.locations.forEach((loc: any) => {
      const location = getValue(loc.location)
      if (location) {
        locations.push({
          _type: 'object',
          _key: Math.random().toString(36).substring(7),
          openAccordion: getValue(loc.openAccordion) === 'true',
          location,
          locationSpecifics: getValue(loc.locationSpecifics),
          telephone: getValue(loc.telephone),
          locationHasHours: getValue(loc.locationHasHours) === 'true',
          publicHours: parseServiceHours(loc.publicHours),
        })
      }
    })
  }

  // Build related documents
  let relatedDocuments = undefined
  if (svc.document && svc.document[0]) {
    const docs: any[] = []
    if (svc.document[0].documentinfo && Array.isArray(svc.document[0].documentinfo)) {
      svc.document[0].documentinfo.forEach((docInfo: any) => {
        const docName = getValue(docInfo.documentname)
        const docUrl = getValue(docInfo.documenturl)
        if (docName || docUrl) {
          docs.push({
            _type: 'object',
            _key: Math.random().toString(36).substring(7),
            documentName: docName,
            documentUrl: docUrl,
          })
        }
      })
    }
    
    if (docs.length > 0 || getValue(svc.document[0].documentdisclaimer)) {
      relatedDocuments = {
        _type: 'object',
        documentDisclaimer: getValue(svc.document[0].documentdisclaimer),
        documents: docs.length > 0 ? docs : undefined,
      }
    }
  }

  // Build related arrays (IDs from lists)
  const relatedFaqs = getValue(svc.serviceList) ? getValue(svc.serviceList).split(',').map(id => id.trim()) : []
  const products = getValue(svc.productList) ? getValue(svc.productList).split(',').map(id => id.trim()) : []
  const licenses = getValue(svc.licenseList) ? getValue(svc.licenseList).split(',').map(id => id.trim()) : []

  // Build the Sanity document
  const doc: any = {
    _type: 'service',
    _id: getValue(svc.mduid) || `ser-${slug}`,
    organization: {
      _type: 'reference',
      _ref: getValue(svc.organization),
    },
    name: getValue(svc.name),
    slug: {
      _type: 'slug',
      current: slug,
    },
    description: getValue(svc.description),
    longDescription: htmlToPortableText(getValue(svc.longDescription)),
    mduid: getValue(svc.mduid),
  }

  // Add optional fields
  if (getValue(svc.subOrganization)) doc.subOrganization = getValue(svc.subOrganization)
  if (getValue(svc['internal-service']) === 'true') doc.internalService = true
  if (getValue(svc['show-faqs']) === 'true') doc.showFaqs = true
  if (getValue(svc['login-required']) === 'true') doc.loginRequired = true
  if (getValue(svc.serviceDisplayName)) doc.serviceDisplayName = getValue(svc.serviceDisplayName)
  if (getValue(svc.nameDetails)) doc.nameDetails = getValue(svc.nameDetails)
  if (getValue(svc.externalUrl)) doc.externalUrl = getValue(svc.externalUrl)
  if (getValue(svc.keywords)) doc.keywords = getValue(svc.keywords)
  if (getValue(svc.alternateNames)) doc.alternateNames = getValue(svc.alternateNames)
  if (getValue(svc.showLicenseCollection) === 'true') doc.showLicenseCollection = true
  if (getValue(svc.showProductCollection) === 'true') doc.showProductCollection = true
  if (getValue(svc.collectionTitle)) doc.collectionTitle = getValue(svc.collectionTitle)
  if (getValue(svc.closeSections) === 'true') doc.closeSections = true

  if (audience.length > 0) doc.audience = audience
  if (selfService.length > 0) doc.selfService = selfService
  if (serviceFee) doc.serviceFee = serviceFee
  if (serviceImage) doc.serviceImage = serviceImage
  if (details.length > 0) doc.details = details
  if (onlineChannels.length > 0) doc.onlineChannels = onlineChannels
  if (phoneContacts.length > 0) doc.phoneContacts = phoneContacts
  if (emailContacts.length > 0) doc.emailContacts = emailContacts
  if (mailAddress) doc.mailAddress = mailAddress
  if (locations.length > 0) doc.locations = locations
  if (relatedDocuments) doc.relatedDocuments = relatedDocuments
  if (relatedFaqs.length > 0) doc.relatedFaqs = relatedFaqs
  if (products.length > 0) doc.products = products
  if (licenses.length > 0) doc.licenses = licenses

  return doc
}

// Main function to convert all XML files to NDJSON
async function convertAllToNDJSON() {
  const serviceDataDir = path.join(__dirname, 'schemaTypes', 'animalservices')
  const files = fs.readdirSync(serviceDataDir).filter((file) => {
    const filePath = path.join(serviceDataDir, file)
    return fs.statSync(filePath).isFile() && !file.startsWith('.')
  })

  console.log(`Converting ${files.length} service XML files to NDJSON...\n`)

  const ndjsonLines: string[] = []
  let successCount = 0
  let failCount = 0

  for (const file of files) {
    try {
      const filePath = path.join(serviceDataDir, file)
      const doc = await parseXMLToSanityDoc(filePath)
      ndjsonLines.push(JSON.stringify(doc))
      successCount++
      console.log(`✓ Converted: ${doc.name}`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`✗ Failed: ${file} - ${errorMessage}`)
      failCount++
    }
  }

  // Write to NDJSON file
  const outputPath = path.join(__dirname, 'services-animalservices.ndjson')
  fs.writeFileSync(outputPath, ndjsonLines.join('\n'))

  console.log(`\n${'='.repeat(60)}`)
  console.log(`✓ Successfully converted: ${successCount}`)
  console.log(`✗ Failed: ${failCount}`)
  console.log(`\n✓ Created NDJSON file: ${outputPath}`)
  console.log(`\nTo import, run: npx sanity dataset import services-animalservices.ndjson production`)
}

convertAllToNDJSON().catch(console.error)

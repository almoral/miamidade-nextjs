import {parseStringPromise} from 'xml2js'
import * as fs from 'fs'
import * as path from 'path'

// Helper function to extract value from XML array
function getValue(arr: any[] | undefined, defaultValue = ''): string {
  if (!arr || arr.length === 0) return defaultValue
  const value = arr[0]
  return typeof value === 'string' ? value.trim() : defaultValue
}

// Helper function to parse hours for a day
function parseHours(dayData: any) {
  if (!dayData || dayData.length === 0) return null

  const data = dayData[0]
  const isOpen = typeof data === 'string' && data.trim() !== ''
  
  if (!isOpen) return {isOpen: false}

  return {
    isOpen: true,
    open: data.$?.open || '',
    close: data.$?.close || '',
  }
}

// Function to parse XML file and convert to Sanity document
async function parseXMLToSanityDoc(filePath: string) {
  const xmlContent = fs.readFileSync(filePath, 'utf-8')
  const parsed: any = await parseStringPromise(xmlContent)
  const loc = parsed.location

  // Extract slug from filename
  const slug = path.basename(filePath)

  // Build physical address
  const physicalAddress: any = {
    _type: 'object',
    address1: getValue(loc.physicalAddress?.[0]?.address1),
    address2: getValue(loc.physicalAddress?.[0]?.address2),
    city: getValue(loc.physicalAddress?.[0]?.city),
    state: getValue(loc.physicalAddress?.[0]?.state, 'FL'),
    zip: getValue(loc.physicalAddress?.[0]?.zip),
  }

  // Check if postal address exists
  const hasPostal = getValue(loc.postal) === 'true'
  let postalAddress = null
  if (hasPostal && loc.postalAddress && loc.postalAddress[0]) {
    const postal = loc.postalAddress[0]
    postalAddress = {
      _type: 'object',
      address1: getValue(postal.address1),
      address2: getValue(postal.address2),
      city: getValue(postal.city),
      state: getValue(postal.state, 'FL'),
      zip: getValue(postal.zip),
    }
  }

  // Build public hours
  let publicHours = null
  if (loc.publicHours && loc.publicHours[0]) {
    const hours = loc.publicHours[0]
    
    publicHours = {
      _type: 'object',
      monday: parseHours(hours.monday),
      tuesday: parseHours(hours.tuesday),
      wednesday: parseHours(hours.wednesday),
      thursday: parseHours(hours.thursday),
      friday: parseHours(hours.friday),
      saturday: parseHours(hours.saturday),
      sunday: parseHours(hours.sunday),
      notes: getValue(hours.notes),
    }
  }

  // Build geo coordinates
  let geo = null
  if (loc.geo && loc.geo[0]?.$) {
    const geoData = loc.geo[0].$
    geo = {
      _type: 'object',
      x: geoData.x ? parseFloat(geoData.x) : undefined,
      y: geoData.y ? parseFloat(geoData.y) : undefined,
      lat: geoData.lat ? parseFloat(geoData.lat) : undefined,
      long: geoData.long ? parseFloat(geoData.long) : undefined,
    }
  }

  // Build the Sanity document
  const doc: any = {
    _type: 'location',
    _id: getValue(loc.mduid) || `loc-${slug}`,
    name: getValue(loc.name),
    locationDisplayName: getValue(loc['location-display-name']),
    slug: {
      _type: 'slug',
      current: slug,
    },
    featured: getValue(loc.featured) === 'true',
    physicalAddress,
    mduid: getValue(loc.mduid),
  }

  // Add optional fields
  if (hasPostal && postalAddress) {
    doc.hasPostalAddress = true
    doc.postalAddress = postalAddress
  }

  if (publicHours) {
    doc.publicHours = publicHours
  }

  if (geo) {
    doc.geo = geo
  }

  return doc
}

// Main function to convert all XML files to NDJSON
async function convertAllToNDJSON() {
  const locationDataDir = path.join(__dirname, 'schemaTypes', 'location-data')
  const files = fs.readdirSync(locationDataDir).filter((file) => {
    const filePath = path.join(locationDataDir, file)
    return fs.statSync(filePath).isFile() && !file.startsWith('.')
  })

  console.log(`Converting ${files.length} location XML files to NDJSON...\n`)

  const ndjsonLines: string[] = []
  let successCount = 0
  let failCount = 0

  for (const file of files) {
    try {
      const filePath = path.join(locationDataDir, file)
      const doc = await parseXMLToSanityDoc(filePath)
      ndjsonLines.push(JSON.stringify(doc))
      successCount++
      
      if (successCount % 50 === 0) {
        console.log(`✓ Converted ${successCount} locations...`)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`✗ Failed: ${file} - ${errorMessage}`)
      failCount++
    }
  }

  // Write to NDJSON file
  const outputPath = path.join(__dirname, 'locations.ndjson')
  fs.writeFileSync(outputPath, ndjsonLines.join('\n'))

  console.log(`\n${'='.repeat(60)}`)
  console.log(`✓ Successfully converted: ${successCount}`)
  console.log(`✗ Failed: ${failCount}`)
  console.log(`\n✓ Created NDJSON file: ${outputPath}`)
  console.log(`\nTo import, run: npx sanity dataset import locations.ndjson production`)
}

convertAllToNDJSON().catch(console.error)

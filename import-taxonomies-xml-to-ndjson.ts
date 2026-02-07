import {parseStringPromise} from 'xml2js'
import * as fs from 'fs'
import * as path from 'path'

// Helper function to extract value from XML array
function getValue(arr: any[] | undefined, defaultValue = ''): string {
  if (!arr || arr.length === 0) return defaultValue
  const value = arr[0]
  return typeof value === 'string' ? value.trim() : defaultValue
}

// Function to parse XML file and convert to Sanity document
async function parseXMLToSanityDoc(filePath: string) {
  const xmlContent = fs.readFileSync(filePath, 'utf-8')
  const parsed: any = await parseStringPromise(xmlContent)
  const tax = parsed.taxonomy

  // Extract slug from filename
  const slug = path.basename(filePath)

  // Build options array
  const options: any[] = []
  if (tax.option && Array.isArray(tax.option)) {
    tax.option.forEach((opt: any) => {
      const label = getValue(opt.label)
      const value = getValue(opt.value)
      
      if (label || value) {
        options.push({
          _type: 'object',
          _key: Math.random().toString(36).substring(7),
          label,
          value,
        })
      }
    })
  }

  // Build organizations array
  const organizations: any[] = []
  if (tax.organization && Array.isArray(tax.organization)) {
    tax.organization.forEach((org: any) => {
      const orgName = getValue(org['organization-name'])
      
      if (orgName) {
        organizations.push({
          _type: 'object',
          _key: Math.random().toString(36).substring(7),
          organizationName: orgName,
        })
      }
    })
  }

  // Build the Sanity document
  const doc: any = {
    _type: 'taxonomy',
    _id: getValue(tax.mduid) || `tax-${slug}`,
    listName: getValue(tax.listName),
    slug: {
      _type: 'slug',
      current: slug,
    },
    labelOnly: getValue(tax.labelOnly) === 'true',
    mduid: getValue(tax.mduid),
  }

  // Add optional fields
  if (getValue(tax.categoryName)) {
    doc.categoryName = getValue(tax.categoryName)
  }

  if (getValue(tax.subCategory)) {
    doc.subCategory = getValue(tax.subCategory)
  }

  if (options.length > 0) {
    doc.options = options
  }

  if (organizations.length > 0) {
    doc.organizations = organizations
  }

  return doc
}

// Recursively find all files in a directory
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath)

  files.forEach((file) => {
    const filePath = path.join(dirPath, file)
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles)
    } else if (!file.startsWith('.')) {
      arrayOfFiles.push(filePath)
    }
  })

  return arrayOfFiles
}

// Main function to convert all XML files to NDJSON
async function convertAllToNDJSON() {
  const taxonomyDataDir = path.join(__dirname, 'schemaTypes', 'taxonomy-data')
  const files = getAllFiles(taxonomyDataDir)

  console.log(`Converting ${files.length} taxonomy XML files to NDJSON...\n`)

  const ndjsonLines: string[] = []
  let successCount = 0
  let failCount = 0

  for (const filePath of files) {
    try {
      const doc = await parseXMLToSanityDoc(filePath)
      ndjsonLines.push(JSON.stringify(doc))
      successCount++
      console.log(`✓ Converted: ${doc.listName}`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`✗ Failed: ${path.basename(filePath)} - ${errorMessage}`)
      failCount++
    }
  }

  // Write to NDJSON file
  const outputPath = path.join(__dirname, 'taxonomies.ndjson')
  fs.writeFileSync(outputPath, ndjsonLines.join('\n'))

  console.log(`\n${'='.repeat(60)}`)
  console.log(`✓ Successfully converted: ${successCount}`)
  console.log(`✗ Failed: ${failCount}`)
  console.log(`\n✓ Created NDJSON file: ${outputPath}`)
  console.log(`\nTo import, run: npx sanity dataset import taxonomies.ndjson production`)
}

convertAllToNDJSON().catch(console.error)

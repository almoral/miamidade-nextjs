import {parseStringPromise} from 'xml2js'
import * as fs from 'fs'
import * as path from 'path'

// Get a preview of all organizations that will be imported
async function previewImport() {
  const orgDataDir = path.join(__dirname, 'schemaTypes', 'org-data')
  const files = fs.readdirSync(orgDataDir).filter((file) => {
    const filePath = path.join(orgDataDir, file)
    // Only process files (not directories) and skip hidden files like .DS_Store
    return fs.statSync(filePath).isFile() && !file.startsWith('.')
  })

  console.log(`Found ${files.length} organizations to import:\n`)
  console.log('┌─────┬─────────────────────────────────────────────┬──────────────────┬─────────────────┐')
  console.log('│ #   │ Name                                        │ Type             │ Slug            │')
  console.log('├─────┼─────────────────────────────────────────────┼──────────────────┼─────────────────┤')

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const filePath = path.join(orgDataDir, file)
    
    try {
      const xmlContent = fs.readFileSync(filePath, 'utf-8')
      const parsed = await parseStringPromise(xmlContent)
      const org = parsed.organization
      
      const name = (org.name?.[0] || 'Unknown').substring(0, 43)
      const agencyType = (org.agencyType?.[0] || 'N/A').substring(0, 16)
      const slug = file.substring(0, 15)
      
      console.log(`│ ${String(i + 1).padStart(3)} │ ${name.padEnd(43)} │ ${agencyType.padEnd(16)} │ ${slug.padEnd(15)} │`)
    } catch (error) {
      console.log(`│ ${String(i + 1).padStart(3)} │ ${'ERROR: ' + file.substring(0, 36).padEnd(43)} │ ${' '.padEnd(16)} │ ${' '.padEnd(15)} │`)
    }
  }
  
  console.log('└─────┴─────────────────────────────────────────────┴──────────────────┴─────────────────┘')
  console.log(`\nTotal: ${files.length} organizations`)
  console.log('\nTo import these organizations, run: npm run import:orgs')
}

previewImport().catch(console.error)

import {parseStringPromise} from 'xml2js'
import * as fs from 'fs'
import * as path from 'path'

// Test parsing a single XML file
async function testParse() {
  const testFile = path.join(__dirname, 'schemaTypes', 'org-data', 'inspector-general')
  
  console.log('Testing XML parsing...\n')
  console.log('File:', testFile)
  
  const xmlContent = fs.readFileSync(testFile, 'utf-8')
  const parsed = await parseStringPromise(xmlContent)
  
  const org = parsed.organization
  
  console.log('\n--- Parsed Organization Data ---')
  console.log('Name:', org.name?.[0] || 'N/A')
  console.log('Slug:', org.slug?.[0] || 'N/A')
  console.log('Agency Type:', org.agencyType?.[0] || 'N/A')
  console.log('Leader:', org.leaderName?.[0] || 'N/A')
  console.log('Leader Title:', org.leaderTitleOther?.[0] || org.leaderTitle?.[0] || 'N/A')
  
  if (org.locations && org.locations.length > 0) {
    console.log('\nLocations:')
    org.locations.forEach((loc: any, i: number) => {
      console.log(`  ${i + 1}. Location ID: ${loc.location?.[0] || 'N/A'}`)
      console.log(`     Phone: ${loc.telephone?.[0] || 'N/A'}`)
      console.log(`     URL: ${loc.url?.[0] || 'N/A'}`)
    })
  }
  
  if (org.socialMedia && org.socialMedia.length > 0) {
    console.log('\nSocial Media:')
    org.socialMedia.forEach((social: any, i: number) => {
      if (social.socialChannel && social.socialChannel.length > 0) {
        const channelData = social.socialChannel[0]
        let channel = ''
        let url = ''
        
        if (typeof channelData === 'string') {
          channel = channelData
        } else if (channelData._ && channelData.$?.url) {
          channel = channelData._
          url = channelData.$.url
        }
        
        console.log(`  ${i + 1}. ${channel}: ${url}`)
      }
    })
  }
  
  console.log('\n✓ Parsing successful!')
}

testParse().catch(console.error)

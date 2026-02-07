# Organization XML Import Guide

This guide explains how to import organization data from XML files into your Sanity dataset.

## Prerequisites

1. **Sanity API Token**: You need a token with write permissions
   - Go to https://www.sanity.io/manage
   - Select your project (`b96ueqmo`)
   - Navigate to: **API** → **Tokens** → **Add API token**
   - Give it a name (e.g., "Import Script")
   - Select **Editor** permissions
   - Copy the generated token

2. **Environment Setup**: Add your token to the `.env` file
   ```bash
   # Open .env and replace 'your-token-here' with your actual token
   SANITY_TOKEN=sk...your-actual-token...
   ```

## Import Process

### Step 1: Verify XML Files
Your XML files are located in `schemaTypes/org-data/`. The script will automatically find and process all 80 XML files.

### Step 2: Run the Import
```bash
npm run import:orgs
```

### What the Script Does
1. **Reads** all XML files from `schemaTypes/org-data/`
2. **Parses** each XML file and extracts organization data
3. **Converts** the data to match your Sanity organization schema
4. **Creates** or updates documents in your Sanity dataset

### Field Mappings

The script maps XML fields to Sanity fields as follows:

- **Jurisdiction**: `jurisdiction`, `localType`, `county`, `municipality`, `agencyType`, `subType`
- **Basic Info**: `name`, `slug`, `acronym`, `legalName`, `betaName`, `betaUrl`
- **Content**: `description`, `mission`, `overview`, `longDescription`
- **Leadership**: `leaderTitle`, `leaderTitleOther`, `leaderName`, `leaderUrl`
- **Contact**: `locations` (array with address, phone, fax, email, url)
- **Social Media**: `socialMedia` (array with channel, url, title)
- **ADA**: `ada` object with disclaimer, contact info
- **System**: `mduid` (used as document ID)

### Expected Output

```
Found 80 XML files to import

Processing: inspector-general
  - Parsed document: Inspector General
  ✓ Successfully imported: Inspector General

Processing: miami-dade-county
  - Parsed document: Miami-Dade County
  ✓ Successfully imported: Miami-Dade County

...

============================================================
IMPORT SUMMARY
============================================================
Total files: 80
Successfully imported: 80
Failed: 0

✓ Import process completed!
```

## Troubleshooting

### Error: "SANITY_TOKEN is not defined"
- Make sure you've created a token and added it to `.env`
- The `.env` file should be in the project root
- Restart your terminal if you just added the token

### Error: "Document validation failed"
- Check that required fields are present in XML (name, locations)
- Review the error message for specific field issues

### Error: "Permission denied"
- Ensure your API token has **Editor** permissions
- Verify you're using the correct project ID and dataset

## Re-running the Import

The script uses `createOrReplace`, which means:
- **Existing documents** (matched by `mduid`) will be updated
- **New documents** will be created
- You can safely re-run the import to update data

## Manual Verification

After import, verify the data in Sanity Studio:
1. Run `npm run dev`
2. Open http://localhost:3333
3. Check the "Organization" document type
4. Review a few imported organizations

## Need Help?

- Check the console output for detailed error messages
- Review individual XML files if specific imports fail
- Ensure all XML files follow the expected schema structure

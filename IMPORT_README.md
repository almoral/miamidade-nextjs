# ✅ Organization XML Import - Ready to Use

## Summary

I've created a complete import system for your 80 organization XML files. Everything is set up and ready to go!

## What Was Created

### 1. Import Script (`import-organizations.ts`)
- Reads all XML files from `schemaTypes/org-data/`
- Parses and converts data to match your Sanity organization schema
- Creates or updates documents in your Sanity dataset
- Provides detailed progress reporting

### 2. Preview Script (`preview-import.ts`)
- Shows a list of all organizations before importing
- Helps verify the data looks correct

### 3. Test Script (`test-xml-parse.ts`)
- Tests XML parsing with a sample file
- Useful for debugging if needed

### 4. Environment Configuration (`.env`)
- Pre-configured with your project ID and dataset
- Ready for your Sanity API token

### 5. Documentation (`IMPORT_GUIDE.md`)
- Complete step-by-step guide
- Troubleshooting tips

## Quick Start

### Step 1: Get Your Sanity API Token
1. Go to https://www.sanity.io/manage
2. Select your project
3. Navigate to **API** → **Tokens** → **Add API token**
4. Name it "Import Script" and select **Editor** permissions
5. Copy the token

### Step 2: Add Token to .env
Open `.env` and replace `your-token-here` with your actual token:
```
SANITY_TOKEN=sk...your-actual-token...
```

### Step 3: Preview What Will Be Imported
```bash
npm run preview:orgs
```

This will show all 80 organizations that will be imported.

### Step 4: Run the Import
```bash
npm run import:orgs
```

## What Gets Imported

All fields from your XML files will be mapped to your Sanity schema:

✅ **Jurisdiction & Type** - jurisdiction, localType, county, agencyType  
✅ **Basic Info** - name, slug, acronym, legalName  
✅ **Content** - description, mission, overview  
✅ **Leadership** - leader title, name, URL  
✅ **Contact** - locations with addresses, phones, emails  
✅ **Social Media** - Facebook, Twitter, Instagram, etc.  
✅ **ADA Information** - accessibility contacts  

## Files Found

**Total XML Files:** 80 organizations

Sample organizations:
- Inspector General
- Miami-Dade County
- Fire Rescue
- Police (Sheriff's Office)
- All 13 Commission Districts
- Parks, Recreation and Open Spaces
- And 67 more...

## Re-running the Import

The script is safe to run multiple times:
- Uses `createOrReplace` which updates existing documents
- Matches documents by their `mduid` field
- Won't create duplicates

## Verification

After importing, verify in Sanity Studio:
```bash
npm run dev
```
Then open http://localhost:3333 and check the Organization documents.

## Need Help?

Check [IMPORT_GUIDE.md](IMPORT_GUIDE.md) for detailed instructions and troubleshooting.

---

**Ready when you are!** Just add your API token and run `npm run import:orgs` 🚀

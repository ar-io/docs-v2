# Hosting Unstoppable Apps - Guide Series Implementation Plan

**Status:** Implementation Complete - Ready for Final User Review
**Created:** 2025-10-29
**Last Updated:** 2025-10-30 (All 6 guides complete, Phase 4 integration complete)

---

## Executive Summary

This document tracks the implementation of a comprehensive guide series for hosting unstoppable applications on Arweave using ArNS. The series consists of **6 guides** covering deployment of blogs, Arweave/AO dApps, EVM dApps, versioning with undernames, Arlink visual deployment, and ArDrive web interface deployment.

**Location:** `content/build/guides/hosting-unstoppable-apps/`

**Tools Covered:**
- **permaweb-deploy CLI** (guides 1-4) - Primary deployment tool
- **Arlink** (guide 5) - Visual deployment interface with GitHub integration
- **ArDrive Web** (guide 6) - User-friendly web interface for drag-and-drop deployment

---

## Directory Structure

```
content/build/guides/hosting-unstoppable-apps/
├── index.mdx                                  # Overview/introduction
├── hosting-a-blog.mdx                         # Guide 1: Blog deployment
├── hosting-arweave-ao-dapp.mdx               # Guide 2: Arweave/AO dApp
├── hosting-evm-dapp.mdx                      # Guide 3: EVM dApp
├── using-undernames-for-versioning.mdx       # Guide 4: Versioning
├── deploying-with-arlink.mdx                 # Guide 5: Arlink deployment
├── hosting-with-ardrive.mdx                  # Guide 6: ArDrive deployment
└── meta.json                                  # Navigation config
```

---

## Implementation Progress

### Phase 1: Setup ✅ COMPLETE
- [x] Create directory structure
- [x] Update parent `meta.json` to include new guide section (replaced `hosting-decentralized-websites`)
- [x] Create section `meta.json`

### Phase 2: Content Creation ✅ COMPLETE
- [x] **Index Page** - Overview and introduction
- [x] **Guide 1** - Hosting a Blog
- [x] **Guide 2** - Hosting Arweave/AO dApp
- [x] **Guide 3** - Hosting EVM dApp
- [x] **Guide 4** - Using Undernames for Versioning
- [x] **Guide 5** - Deploying with Arlink
- [x] **Guide 6** - Hosting Sites with ArDrive

### Phase 3: Review & Testing ✅ COMPLETE
- [x] Review all guides for consistency
- [x] Verify all internal links (updated during Phase 4)
- [x] Test navigation flow
- [x] Check Fumadocs UI components render correctly
- [x] Verify icons display properly (lucide-react)
- [x] Build succeeds without errors (256 pages generated)

### Phase 4: Integration ✅ COMPLETE
- [x] Updated cross-references in related docs (ArNS overview, Upload index)
- [x] Deleted `hosting-decentralized-websites.mdx`
- [x] Deleted `working-with-arns/arns-undernames-versioning.mdx`
- [x] Moved and renamed `deploy-dapp-with-ardrive-web.mdx` → `hosting-with-ardrive.mdx`
- [x] Updated all internal links (9 files modified)
- [x] Added redirects to `redirects.mjs` (6 redirects)
- [x] Updated navigation meta.json files (2 files)

### Phase 5: Final Review ✅ COMPLETE
- [x] Consistency improvements across all 6 guides (2025-10-30)
  - Added consistent opening sections (Introduction, What You'll Build/Learn)
  - Standardized Steps component usage with title prop pattern
  - Unified automation section naming
  - Simplified Card components for consistency
  - Fixed Prerequisites sections
- [x] Global spacing fix for feedback section (2025-10-30)
  - Added CSS rule to global.css for proper spacing
  - Fixes spacing between content and "How is this guide?" section
- [ ] User review and final approval
- [ ] Delete this plan document

---

## Completed Guides - Summary

### Guide 1: Hosting a Blog ✅
- **File**: `hosting-a-blog.mdx` (956 lines)
- **Focus**: Foundational blog deployment with Next.js and Astro
- **Key Features**: Interactive and CLI modes, GitHub Actions, RSS/SEO
- **Key Standards**: Wander wallet, Turbo credits, DEPLOY_KEY, --arns-name, --ttl 60

### Guide 2: Hosting Arweave/AO dApp ✅
- **File**: `hosting-arweave-ao-dapp.mdx` (1,519 lines)
- **Focus**: ARIO Token Dashboard with Wander wallet integration
- **Key Features**: AO process interaction, GraphQL queries, complete working example
- **Key Standards**: @permaweb/aoconnect, real ARIO process ID, Wander rebrand

### Guide 3: Hosting EVM dApp ✅
- **File**: `hosting-evm-dapp.mdx` (1,900 lines)
- **Focus**: ETH Wallet Dashboard with custom wagmi UI
- **Key Features**: Zero external dependencies (no RainbowKit), Ethereum wallet deployment
- **Key Standards**: Custom wagmi UI, --sig-type ethereum, --on-demand base-eth

### Guide 4: Using Undernames for Versioning ✅
- **File**: `using-undernames-for-versioning.mdx` (798 lines)
- **Focus**: Practical versioning patterns with permaweb-deploy only
- **Key Features**: 3 common patterns, GitHub Actions, ArNS app UI for rollbacks
- **Key Standards**: CLI-focused, no SDK complexity, ArNS app UI for management

### Guide 5: Deploying with Arlink ✅
- **File**: `deploying-with-arlink.mdx` (321 lines)
- **Focus**: High-level overview of Arlink's visual deployment platform
- **Key Features**: GitHub integration, ArNS management, comparison with CLI tools
- **Key Standards**: Links to official docs, screenshot markers (9 locations)

### Guide 6: Deploying with ArDrive ✅
- **File**: `hosting-with-ardrive.mdx` (175 lines)
- **Focus**: User-friendly web interface for drag-and-drop deployment
- **Key Features**: Manifest creation, ArNS assignment, version management
- **Key Standards**: ArDrive web app integration, ArFS protocol

---

## Guide 6 Implementation (2025-10-30)

**What Was Built:**
- Moved and renamed guide from `deploy-dapp-with-ardrive-web.mdx` to `hosting-with-ardrive.mdx`
- Integrated into hosting-unstoppable-apps series as the 6th guide
- Updated title: "Deploy a dApp with ArDrive Web" → "Deploying with ArDrive"
- Added to series index page with proper card and description

**Key Changes:**
1. **Integration into Series**
   - Added as last guide in the series (position 6)
   - Updated series index to include ArDrive card
   - Removed duplicate from parent guides index
   - Maintained all original content and functionality

2. **Navigation Updates**
   - Added `hosting-with-ardrive` to `hosting-unstoppable-apps/meta.json`
   - Removed `deploy-dapp-with-ardrive-web` from parent `guides/meta.json`
   - Updated internal links within the guide

3. **Redirects Added**
   - `/guides/ardrive-web` → `/build/guides/hosting-unstoppable-apps/hosting-with-ardrive`
   - `/build/guides/deploy-dapp-with-ardrive-web` → `/build/guides/hosting-unstoppable-apps/hosting-with-ardrive`

**Content Highlights:**
- Step-by-step ArDrive deployment process
- Manifest creation for proper file routing
- ArNS name assignment
- Version management with ArFS protocol
- Benefits of web-based deployment approach

**Rationale:**
ArDrive provides a complementary deployment option to Arlink - while Arlink focuses on GitHub integration and CI/CD, ArDrive offers direct file upload with manual control. Both are user-friendly alternatives to the permaweb-deploy CLI, covering different use cases and user preferences.

**Files Modified:**
- Created: `/content/build/guides/hosting-unstoppable-apps/hosting-with-ardrive.mdx`
- Updated: `/content/build/guides/hosting-unstoppable-apps/meta.json`
- Updated: `/content/build/guides/hosting-unstoppable-apps/index.mdx`
- Updated: `/content/build/guides/meta.json`
- Updated: `/redirects.mjs`
- Deleted: `/content/build/guides/deploy-dapp-with-ardrive-web.mdx`

---

## Phase 4 Integration - Completion Summary

### Files Updated (11 total)

**Internal Link Updates (9 files):**
1. `content/build/index.mdx` - Updated 2 card links
2. `content/build/guides/index.mdx` - Updated 3 references (2 cards + 1 text link)
3. `content/build/guides/working-with-arns/index.mdx` - Updated 2 card links
4. `content/build/guides/working-with-arns/arns-primary-names.mdx` - Updated 2 cards
5. `content/build/guides/working-with-arns/set-arns-records-programmatically.mdx` - Updated 1 card
6. `content/build/guides/working-with-arns/register-arns-programmatically.mdx` - Updated 1 card
7. `content/build/guides/deploy-dapp-with-ardrive-web.mdx` - Updated 1 card
8. `content/build/guides/arns-marketplace.mdx` - Updated 1 card
9. `content/build/guides/hosting-unstoppable-apps/hosting-with-ardrive.mdx` - Updated internal links

**Cross-References Added (2 files):**
1. `content/learn/arns/index.mdx` - Added "Host Unstoppable Apps" card
2. `content/build/upload/index.mdx` - Added "Deploy Your Apps" card

### Redirects Added (6 total)
1. `/guides/permaweb-deploy` → `/build/guides/hosting-unstoppable-apps`
2. `/guides/managing-undernames` → `/build/guides/hosting-unstoppable-apps/using-undernames-for-versioning`
3. `/build/guides/hosting-decentralized-websites` → `/build/guides/hosting-unstoppable-apps`
4. `/build/guides/arns-undernames-versioning` → `/build/guides/hosting-unstoppable-apps/using-undernames-for-versioning`
5. `/build/guides/working-with-arns/arns-undernames-versioning` → `/build/guides/hosting-unstoppable-apps/using-undernames-for-versioning`
6. `/guides/ardrive-web` → `/build/guides/hosting-unstoppable-apps/hosting-with-ardrive`
7. `/build/guides/deploy-dapp-with-ardrive-web` → `/build/guides/hosting-unstoppable-apps/hosting-with-ardrive`

### Navigation Updates
- Removed `arns-undernames-versioning` from `content/build/guides/working-with-arns/meta.json`
- Removed `deploy-dapp-with-ardrive-web` from `content/build/guides/meta.json`
- Updated `content/build/guides/hosting-unstoppable-apps/meta.json` with all 6 guides

### Content Deleted (3 files)
- `content/build/guides/hosting-decentralized-websites.mdx`
- `content/build/guides/working-with-arns/arns-undernames-versioning.mdx`
- `content/build/guides/deploy-dapp-with-ardrive-web.mdx`

### Build Verification
- ✅ Build completed successfully: 256 static pages generated
- ✅ No new errors introduced
- ✅ All navigation paths working

---

## Navigation Structure

### Hosting Unstoppable Apps meta.json

```json
{
  "title": "Hosting Unstoppable Apps",
  "defaultOpen": false,
  "pages": [
    "hosting-a-blog",
    "hosting-arweave-ao-dapp",
    "hosting-evm-dapp",
    "using-undernames-for-versioning",
    "deploying-with-arlink",
    "hosting-with-ardrive"
  ]
}
```

### Parent Guides meta.json

```json
{
  "title": "Guides",
  "icon": "Book",
  "defaultOpen": false,
  "pages": [
    "depin",
    "hosting-unstoppable-apps",
    "crossmint-nft-minting-app",
    "working-with-arns",
    "using-turbo-in-a-browser"
  ]
}
```

---

## Code Standards Checklist

All guides adhere to these standards:

### HTTP Requests
- ✅ Use `fetch` API
- ❌ NO `axios`

### ArNS Operations
- ✅ Use `ARIO.mainnet()` from '@ar.io/sdk'
- ✅ Call `setRecord` on ANT instances
- ❌ NO calling `setRecord` on ARIO instances

### Undername Naming
- ✅ Use underscores: `api_myapp.arweave.net`
- ❌ NO periods: `api.myapp.arweave.net`

### UI Components
- ✅ Use Fumadocs components (Cards, Callouts, Steps, etc.)
- ✅ Use lucide-react for icons
- ✅ Follow existing documentation patterns

### Code Examples
- ✅ Complete, runnable examples
- ✅ Proper error handling
- ✅ Clear comments
- ✅ Modern JavaScript/TypeScript
- ✅ Environment variable usage shown

---

## Design Decisions

### Guide Order Rationale
1. **Hosting a Blog** - Simplest entry point, foundational concepts
2. **Hosting Arweave/AO dApp** - Arweave-native ecosystem
3. **Hosting EVM dApp** - Cross-chain audience
4. **Using Undernames for Versioning** - Advanced deployment patterns
5. **Deploying with Arlink** - Alternative visual tool (GitHub integration)
6. **Deploying with ArDrive** - Alternative visual tool (file upload)

### Tool Coverage
- **CLI-focused** (Guides 1-4): permaweb-deploy for developers comfortable with terminal
- **Visual interfaces** (Guides 5-6): Arlink and ArDrive for non-technical users or preference

### Framework Examples
- **Next.js** - Most popular React framework
- **Astro** - Modern static site generator
- **Vite** - Fast build tool for SPAs
- Covers both SSG and SPA approaches

---

## Timeline & Progress Tracking

### Completed (2025-10-29 to 2025-10-30)
- [x] Plan creation and approval (2025-10-29)
- [x] Directory structure creation (2025-10-29)
- [x] Section meta.json created (2025-10-29)
- [x] Parent meta.json updated (2025-10-29)
- [x] Index page created (2025-10-29)
- [x] Guide 1: Hosting a Blog (2025-10-29)
- [x] Guide 2: Hosting Arweave/AO dApp (2025-10-30)
- [x] Guide 3: Hosting EVM dApp (2025-10-30)
- [x] Guide 4: Using Undernames for Versioning (2025-10-30)
- [x] Guide 5: Deploying with Arlink (2025-10-30)
- [x] Guide 6: Hosting Sites with ArDrive (2025-10-30)
- [x] Phase 4: Integration (2025-10-30)
  - [x] Updated all internal links
  - [x] Added redirects
  - [x] Removed old files
  - [x] Added cross-references
  - [x] Build verification

### Current Status
- [ ] Phase 5: Final user review and approval
- [ ] Address any feedback from user review
- [ ] Delete this plan document

---

## Completion Criteria

**Status: Awaiting Final User Review**

This plan is complete when:
1. ✅ All 7 files created (index + 6 guides)
2. ✅ All internal links updated
3. ✅ All redirects added
4. ✅ Build succeeds without errors
5. ⏳ User review and approval received
6. ⏳ Feedback addressed (if any)
7. ⏳ This plan document deleted

---

## Resources

### Official Documentation
- **Permaweb Deploy:** https://github.com/permaweb/permaweb-deploy
- **Arlink Docs:** https://arlink.gitbook.io/arlink-docs/getting-started/quickstart
- **ArDrive Docs:** https://docs.ardrive.io/docs/misc/deploy/
- **ArIO SDK:** https://github.com/ar-io/ar-io-sdk
- **Fumadocs:** https://fumadocs.dev/
- **AO Connect:** https://github.com/permaweb/ao/tree/main/connect
- **Wagmi:** https://wagmi.sh/

---

**Last Updated:** 2025-10-30
**Status:** Implementation and consistency improvements complete. Ready for final user review and deployment.

---

## What's Ready for Review

✅ **6 Complete Guides** with consistent patterns:
1. Hosting a Blog (hosting-a-blog.mdx)
2. Hosting Arweave/AO dApp (hosting-arweave-ao-dapp.mdx)
3. Hosting EVM dApp (hosting-evm-dapp.mdx)
4. Using Undernames for Versioning (using-undernames-for-versioning.mdx)
5. Deploying with Arlink (deploying-with-arlink.mdx)
6. Deploying with ArDrive (hosting-with-ardrive.mdx)

✅ **All guides follow unified patterns**:
- Consistent section headings (Introduction, What You'll Build/Learn, Prerequisites)
- Standardized Steps components with title props
- Unified automation sections
- Simplified Card components
- Proper spacing before feedback section

✅ **Full integration complete**:
- Navigation updated
- Redirects added
- Internal links updated
- Build verified (256 pages)

## Next Steps

1. **Review the guides** in your browser to verify layout and design consistency
2. **Test the build** to ensure everything works correctly
3. **Approve for merge** to main branch
4. **Delete this plan document** once merged

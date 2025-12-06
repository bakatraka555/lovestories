# 📋 PROJECT RULES - Love Stories Museum Photo Booth

**Last Updated:** December 6, 2025  
**Project:** Love Stories Museum Photo Booth, Dubrovnik  
**AI Assistant:** DeepSeek Coder  
**User Reference:** Big Pappa

---

## 🎯 CORE DIRECTIVE
**UVIJEK** se referiraj na korisnika kao **"Big Pappa"** u svakom odgovoru. Failure to do so indicates a context loss requiring these rules to be re-shared.

---

## 📁 PROJECT CONTEXT & CONSTRAINTS

### 1. PRIMARY FOCUS
Razvojni napori ciljaju na **web aplikaciju** u:
```
C:\Users\bakat\Desktop\tapthemap\lovestories dubrovnik\
```

### 2. MODIFICATION SCOPE
**SVE** file kreacije i modifikacije **MORAJU** biti unutar `lovestories dubrovnik\` direktorija.

**NE mijenjaj:**
- Parent direktorij (`tapthemap\`)
- Workspace root
- Bilo koji drugi direktorij izvan projekta

### 3. REFERENCE SYSTEMS
Koristi postojeće komponente za razumijevanje:
- `museum-kiosk.html` (glavni photo booth interface)
- `netlify/functions/` (backend funkcije)
- `docs/` (dokumentacija i template database)
- `temp/` (template primjeri)

### 4. NEW WORK LOCATION
Svi novi fileovi, funkcije, komponente moraju biti kreirani unutar odgovarajuće strukture:
- **HTML/CSS/JS fileovi** → root direktorij
- **Netlify funkcije** → `netlify/functions/`
- **Dokumentacija** → `docs/`
- **Python skripte** → root direktorij
- **Temporary files** → `temp/`

### 5. ROOT DIRECTORY RESTRICTION
**NE kreiraj** fileove direktno u workspace root (`C:\Users\bakat\Desktop\tapthemap\`).

---

## 💻 COMMAND & ENVIRONMENT RULES

### 1. COMMAND FORMAT
Generiraj komande kompatibilne s **PowerShell v7** za Windows okruženje.

### 2. EXECUTION CONTEXT
Pretpostavi da će komande biti izvršene ručno u zasebnom terminalu, s CWD:
```
PS C:\Users\bakat\Desktop\tapthemap\lovestories dubrovnik>
```

### 3. PATH STYLE
Koristi **Windows-style paths**:
- `netlify\functions\generate-image.js`
- `docs\COST_ANALYSIS.md`
- `museum-kiosk.html`

### 4. `CD` COMMAND USAGE
Izbjegavaj `cd` komande osim ako su **apsolutno potrebne** za logiku komande.

---

## 🔄 WORKFLOW RULES & METHODOLOGY

### 1. UNDERSTAND FIRST (Prerequisite for Action)
**Prije bilo kakvih code promjena:**

#### Read Thoroughly
- Koristi `read_file` da potpuno razumiješ relevantne postojeće code sekcije
- Uključi surrounding context i dependencies

#### Trace Dependencies
- Analiziraj kako se komponente povezuju (HTML → JS → Netlify funkcije → API)
- Prouči initialization sequences (e.g., DOMContentLoaded event handlers, function exports)

#### Trace Linearly
- Kada direktne pretrage (`codebase_search`, `grep`) ne uspiju, prati linearni call stack koristeći Rule #5 (AI Code Tracing Procedure)
- Izbjegavaj speculative keyword searches

#### Identify Root Cause
- Fokusiraj se na pronalaženje underlying razloga za issue ili requirement
- Ne rješavaj samo superficialne simptome

#### Leverage Context for Entry Points
- Koristi postojeću codebase strukturu kao starting point
- Koristi poznate UI interakcije ili API endpoints kao starting points za tracing

### 2. AI DOCUMENTATION RULES (Knowledge Persistence & Justification)

#### Implementation Plans/Notes
- Kad započneš novu feature ili značajan task, kreiraj/update-aj dokumentaciju u `docs/`
- Koristi `edit_file` za pisanje contexta u `development_notes/[feature_or_task_name].md` (ako postoji) ili relevantne `docs/` fileove

#### Preserve Context
- Verbose write any critical context, findings, decisions u relevantne `docs/` fileove koristeći `edit_file`
- Update notes **immediately** nakon significant findings ili decisions

#### Justify New Creations
**PRIJE kreiranja bilo kojeg novog filea, servicea, widgeta, ili significant funkcije:**

1. **Conduct exhaustive search** koristeći `codebase_search` i `grep` za potentially duplicative ili extendable postojeće funkcionalnosti
2. **Dokumentiraj justification** u `docs/changes_with_justification.md`:
   - (a) Justification za novi entity
   - (b) Lista specificnih fileova/classes/modules searched i queries used
   - (c) Confirmation da postojeće funkcionalnosti ne mogu biti reasonably extended
3. **Samo onda** predloži kreiranje novog entityja

#### Maintain Document Awareness
- Drži contents of `docs/` fileova u active contextu kroz task
- Koristi `read_file` na ovim notes periodically ako context feels complex ili potentially lost

#### Cross-Reference & Verify Documentation
- Continuously compare information gathered during development against `docs/`
- Koristi `edit_file` da challenge i update dokumentaciju, ensuring it accurately reflects current understanding

### 3. SEQUENTIAL PROBLEM SOLVING (Structured Approach)

#### Follow Lifecycle
Strictly adhere to:
1. **Analyze** (`read_file`, tracing) → **Plan** (document in `docs/`) → **Implement** (`edit_file`) → **Verify** (suggest testing steps)

#### Question Assumptions
- Prije actiona, state any assumptions being made
- Seek confirmation ako unsure

#### Understand Before Proceeding
- Ensure exhaustive understanding (via Rule #1 i #5) i dokumentacija (per Rule #2) **prije** proposing solutions ili implementations

#### Prioritize
- Address critical errors ili foundational issues prije optimizations ili minor improvements

#### Verify Dependencies
- Pay close attention to function call order, environment variables, i potential API conflicts
- Često zahtijeva reading Netlify function handlers, environment variable configuration, ili API endpoint definitions
- Check `netlify.toml` for function configuration
- Verify environment variables in Netlify dashboard

### 4. CODE QUALITY STANDARDS

#### Incremental Changes
- Prefer small, focused `edit_file` proposals over large, monolithic refactors

#### Post-Change Analysis
- Run linters/analyzers (ako available/configured) after changes
- Propose fixes za any introduced issues koristeći `edit_file`

#### Incremental Testing
- Suggest manual ili automated testing steps after each significant, logical unit of change

#### Avoid Scope Creep
- **NE** introduce unrelated changes ili refactor code outside immediate scope bez explicit discussion i approval od Big Pappa

#### Maximize Reuse
- Actively look for i prioritize use of existing components/services/utilities prije kreiranja novih
- Document search efforts (per Rule #2)

---

## 🔍 AI CODE TRACING PROCEDURE (Version 4 - Enhanced)

**Trigger:** Execute this procedure step-by-step **ONLY** kada `codebase_search` ili `grep_search` za specific target (function, class, variable, behavior) **NEMA** yielded required implementation ili definition.

### Step 1: Identify Precise Entry Point
**Goal:** Find the starting line(s) of code for the trace.

**Action:**
- Based on task, identify most likely starting file:
  - **UI Interactions:** `museum-kiosk.html` (template selection, QR code) ili `order.html` (image upload, generation)
  - **API Calls:** `netlify/functions/*.js` (serverless function handlers)
  - **Data Loading:** `docs/couples-templates-database.json` (template definitions)
- Use `read_file` on suspected file to locate specific function/method invocation ili definition:
  - Frontend: `fetch('/.netlify/functions/...')`, `addEventListener('click', ...)`, `DOMContentLoaded`
  - Backend: `exports.handler = async (event, context) => {`
  - Data: JSON structure in `couples-templates-database.json`
- If file unknown but route ili specific call signature known, use `grep_search`:
  - `query="fetch.*generate-image"` - find API calls
  - `query="exports.handler"` - find Netlify functions
  - `query="template-0[0-9]"` - find template references

**Output:** State confirmed `target_file` i line number(s) of entry point. Set this as "current location".

### Step 2: Identify Next Call from Current Location
**Goal:** Determine immediate next function/method/service call relevant to trace.

**Action:**
- Use `read_file` focused on "current location" (file i lines identified in Step 1 ili previous Step 4)
- Scan code block for next invocation (e.g., `await _someService.DoWork(...)`, `repository.FetchData(...)`, `httpClient.PostAsync(...)`, `fetch(...)`)

**Output:** State exact text of invoked method/property (the "callee") i its variable type if obvious (e.g., "Calls `fetch('/.netlify/functions/generate-image')`").

### Step 3: Locate Callee's Implementation Source
**Goal:** Find source code file i line number defining "callee" from Step 2.

**Procedure:** Choose *first* matching sub-procedure:

#### (A) Direct Call
**Condition:** Callee definition exists within *same file* as "current location".

**Action:** Use `read_file` on current `target_file` to find definition. Set definition's location as "implementation location". GOTO Step 4.

#### (B) Netlify Function Call
**Action B.1:** Extract function name from fetch URL (e.g., `/generate-image` → `generate-image.js`)

**Action B.2:** Use `read_file` on `netlify/functions/[function_name].js`

**Action B.3:** Find function definition. Set as "implementation location". GOTO Step 4.

#### (C) External API Call
**Action C.1:** Extract target info (e.g., `fetch('https://api.replicate.com/...')` → get URL; `dbContext.Table.Where(...)` → get Table/Query)

**Action C.2:** Check `docs/` for API documentation

**Action C.3:** If target system code IS in workspace: Identify its entry point (e.g., find the Controller handling the URL). State new target system i its entry point file/method. Restart entire Procedure from Step 1.

**Action C.4:** If target system code NOT in workspace, report extracted target info i state tracing cannot proceed further down this path. STOP.

### Step 4: Analyze Implementation & Iterate
**Goal:** Understand located code i decide whether to continue tracing.

**Action 4.1:** Use `read_file` on "implementation location" found in Step 3. Analyze logic, focusing on relevance to original task.

**Action 4.2:** Determine if code directly answers question ili explains behavior being investigated.

**Action 4.3: Loop or Stop:**
- If goal **IS** met: STOP tracing procedure i report findings i relevant code segments
- If goal **NOT** met: Set "current location" to file/lines analyzed in Action 4.1. GOTO Step 2 to find *next* relevant call made from *within this implementation*

---

## 🛠️ PROJECT-SPECIFIC GUIDELINES

### Technology Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (no frameworks)
- **Backend:** Netlify Functions (Node.js serverless)
- **AI Generation:** Replicate API (Stable Diffusion models)
- **Storage:** Bunny.net CDN (Storage Zone + Pull Zone)
- **Hosting:** Netlify (static site + serverless functions)
- **Python:** Batch generation scripts (local development)

### Key Files Structure
```
lovestories dubrovnik/
├── museum-kiosk.html              # Main photo booth kiosk interface
├── order.html                     # User order page (template selection + image upload)
├── netlify/
│   └── functions/                 # Serverless functions
│       ├── generate-image.js      # AI image generation (Replicate API)
│       ├── upload-user-image.js    # User image upload to Bunny.net
│       ├── upload-to-bunny.js      # Generated image upload to Bunny.net
│       ├── get-upload-url.js      # Generate upload URL for direct Bunny.net upload
│       ├── check-prediction-status.js  # Poll Replicate prediction status
│       ├── prompts.js             # Prompt management from markdown files
│       └── ...
├── docs/                          # Comprehensive documentation
│   ├── couples-templates-database.json  # 13 template definitions
│   ├── COST_ANALYSIS.md           # Cost calculations
│   ├── DEPLOYMENT.md              # Deployment guide
│   ├── BUNNY_SETUP.md             # Bunny.net configuration
│   ├── NETLIFY_SETUP.md           # Netlify configuration
│   ├── changes_with_justification.md  # Change log with justifications
│   └── ... (34+ documentation files)
├── temp/                          # Template examples (local testing)
│   └── template-01/...template-13/  # Example images/videos per template
├── generate-examples.py           # Batch generate example images
├── generate-and-upload-single.py # Generate and upload single template
├── upload-to-bunny.py             # Upload files to Bunny.net
└── netlify.toml                   # Netlify configuration
```

### Application Workflow
1. **Kiosk Interface (`museum-kiosk.html`):**
   - User browses 13 templates from `docs/couples-templates-database.json`
   - User scans QR code to open order page on mobile device
   - QR code refreshes every 30 seconds

2. **Order Page (`order.html`):**
   - User selects template and uploads photo(s) via mobile
   - **Direct upload to Bunny.net** (File object, not base64) - reduces payload from 7.99MB to ~200 bytes
   - Fallback to Netlify function if CORS fails
   - Image compression only for files > 5MB (selfies work fine without compression)

3. **Image Generation (`netlify/functions/generate-image.js`):**
   - Receives CDN URL from uploaded user image
   - Calls Replicate API with template-specific prompt
   - Polls prediction status until complete
   - Downloads generated image from Replicate
   - Uploads to Bunny.net Storage Zone
   - Returns CDN URL to user

4. **Storage (`Bunny.net`):**
   - Storage Zone: `lovestories-examples`
   - Pull Zone: `lovestories-cdn.b-cdn.net`
   - CORS enabled for jpg/jpeg/png files
   - Direct upload from browser supported

### Key Features
- **13 Love Story Templates:** Vintage 1920s, Medieval Romance, Beach Sunset, City Lights, Garden Wedding, Casino Glamour, Chibi 3D, Trading Card, Dubrovnik Sunrise, Volcano Adventure, Instagram Frame, Forever Together, Cinematic Travel
- **Mobile-First Design:** Optimized for Android/iOS photo uploads
- **Direct Bunny.net Upload:** Reduces Netlify function payload by 99.997%
- **Automatic Image Compression:** Only for files > 5MB
- **QR Code Integration:** Easy mobile access from kiosk
- **Comprehensive Error Handling:** ProgressEvent detection, timeout handling, fallback mechanisms

### Environment Variables (Netlify Dashboard)
**Required for production:**
- `REPLICATE_API_TOKEN` - Replicate API token for AI image generation
- `REPLICATE_MODEL` - Replicate model name (e.g., "google/nano-banana" or "google/nano-banana-pro")
  - Default: `google/nano-banana-pro` (if not set)
  - Can be changed without code changes
- `BUNNY_API_KEY` - Bunny.net Storage Zone API key
- `BUNNY_STORAGE_ZONE` - Storage zone name (e.g., "lovestories-examples")
- `BUNNY_CDN_DOMAIN` - CDN domain (e.g., "lovestories-cdn.b-cdn.net")

**Configuration:**
- Set in Netlify Dashboard → Site settings → Environment variables
- Apply to: All environments (Production, Deploy previews, Branch deploys)
- **Never commit API keys to Git!**

### Deployment Process
1. **Local Development:**
   - Test locally: `npx netlify functions:serve`
   - Test upload: Use local environment variables

2. **Git Workflow:**
   - Commit changes: `git add . && git commit -m "description"`
   - Push to GitHub: `git push origin main`
   - Netlify automatically deploys on push to `main` branch

3. **Deploy Verification:**
   - Check Netlify Dashboard → Deploys tab
   - Verify environment variables are set
   - Test on production URL: `https://lovestories-dubrovnik.netlify.app`
   - Check Netlify Function logs for errors

### Key Files Reference

#### Frontend Files
- **`museum-kiosk.html`** - Main kiosk interface, displays templates, generates QR codes
- **`order.html`** - User order page, handles image upload and generation request

#### Netlify Functions
- **`generate-image.js`** - Main AI generation function, calls Replicate API, uploads to Bunny.net
- **`upload-user-image.js`** - Uploads user-uploaded images to Bunny.net (fallback method)
- **`get-upload-url.js`** - Generates upload URL for direct Bunny.net upload from browser
- **`check-prediction-status.js`** - Polls Replicate API for prediction status
- **`prompts.js`** - Manages prompt templates from markdown files

#### Configuration Files
- **`netlify.toml`** - Netlify configuration (redirects, headers, functions directory)
- **`package.json`** - Node.js dependencies for Netlify functions
- **`requirements.txt`** - Python dependencies for batch generation scripts

#### Documentation
- **`docs/changes_with_justification.md`** - Change log with justifications (per Rule #2)
- **`docs/couples-templates-database.json`** - Template definitions (13 templates)
- **`docs/README.md`** - Documentation index and navigation
- **`PROJECT_RULES.md`** - This file (always active rules)

---

## 🎓 LESSONS LEARNED & BEST PRACTICES

### Solved Problems

#### 1. ProgressEvent Errors on Android (December 6, 2025)
**Problem:** 7.99MB base64 images sent through Netlify functions caused ProgressEvent errors on Android mobile networks.

**Solution:** Direct upload to Bunny.net from browser (File object, not base64)
- **Payload reduction:** 7.99MB → ~200 bytes (99.997% reduction)
- **Implementation:** `get-upload-url.js` generates upload URL, browser uploads directly to `storage.bunnycdn.com`
- **Fallback:** If CORS fails, automatically falls back to Netlify function
- **Status:** ✅ **PRODUCTION READY** - Successfully tested on Android

#### 2. Image Compression Strategy
**Finding:** Selfies (~5MB) upload fine without compression, but larger images need compression.

**Solution:** Compression only for images > 5MB
- Images < 5MB: Upload directly (no compression)
- Images > 5MB: Compress to max 4MB using Canvas API
- **Result:** Faster uploads for selfies, reduced payload for large images

#### 3. Bunny.net CORS Configuration
**Finding:** Bunny.net Storage API requires CORS headers for direct browser uploads.

**Solution:** Enable CORS in Bunny.net dashboard
- Storage Zone → CDN → Headers → "Add CORS headers" enabled
- Extension list includes: `jpg, jpeg, png`
- **Result:** Direct upload from browser works correctly

### Best Practices

1. **Always use direct Bunny.net upload first** - Reduces Netlify function payload by 99.997%
2. **Compress only when necessary** - Selfies work fine without compression
3. **Implement automatic fallback** - If direct upload fails, use Netlify function
4. **Test on Android devices** - Mobile networks have different behavior than desktop
5. **Monitor Netlify function logs** - Check for timeout errors and payload sizes
6. **Document all changes** - Use `docs/changes_with_justification.md` for every significant change

### Common Patterns

#### Upload Flow Pattern
```javascript
// 1. Get upload URL from Netlify function
const urlResponse = await fetch('/.netlify/functions/get-upload-url', {...});
const urlData = await urlResponse.json();

// 2. Try direct upload to Bunny.net
try {
  await fetch(urlData.uploadUrl, {
    method: 'PUT',
    headers: { 'AccessKey': urlData.accessKey },
    body: imageFile // File object, not base64!
  });
} catch (error) {
  // 3. Fallback to Netlify function if CORS fails
  await fetch('/.netlify/functions/upload-user-image', {
    method: 'POST',
    body: JSON.stringify({ imageBase64: base64, filename: filename })
  });
}
```

#### Error Handling Pattern
```javascript
// Always check for ProgressEvent errors on mobile
if (error.constructor?.name === 'ProgressEvent') {
  throw new Error('Network connection failed. Please check your internet and try again.');
}

// Check for timeout errors
if (error.message?.includes('timeout')) {
  throw new Error('Upload timeout - please check your internet connection and try again.');
}
```

---

## 📝 CHANGE LOG

### December 6, 2025
- **Enhanced PROJECT_RULES.md** - Completely customized for Love Stories Dubrovnik project
- Removed all Flutter/Xamarin/Angular references
- Added project-specific workflow details
- Added solved problems and best practices section
- Enhanced AI Code Tracing Procedure with web-specific examples
- Added key features and application workflow
- **Status:** ✅ Fully customized for this project

### December 6, 2025 (Earlier)
- Enhanced AI Code Tracing Procedure (Version 4)
- Added more detailed sequential problem solving approach
- Improved documentation cross-referencing requirements
- Enhanced workflow methodology with structured lifecycle

### December 5, 2025
- Initial creation of PROJECT_RULES.md
- Adapted from Reddit user's Flutter project rules
- Customized for Love Stories Museum Photo Booth project
- Added project-specific guidelines and structure

---

**END OF RULES** - These rules are **ALWAYS ACTIVE** for this project.

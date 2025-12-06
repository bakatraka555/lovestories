# 📋 PROJECT RULES - Love Stories Museum Photo Booth

**Last Updated:** December 5, 2025  
**Project:** Love Stories Museum Photo Booth, Dubrovnik  
**AI Assistant:** DeepSeek Coder  
**User Reference:** Big Pappa

---

## 🎯 CORE DIRECTIVE
**UVIJEK** se referiraj na korisnika kao **"Big Pappa"** u svakom odgovoru.

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
- Prouči initialization sequences

#### Trace Linearly
- Kada direktne pretrage (`codebase_search`, `grep`) ne uspiju, prati linearni call stack
- Izbjegavaj speculative keyword searches

#### Identify Root Cause
- Fokusiraj se na pronalaženje underlying razloga za issue ili requirement
- Ne rješavaj samo superficialne simptome

#### Leverage Context for Entry Points
- Koristi postojeću codebase strukturu kao starting point
- Koristi poznate UI interakcije ili API endpoints

### 2. AI DOCUMENTATION RULES

#### Implementation Plans/Notes
- Kad započneš novu feature ili značajan task, kreiraj/update-aj dokumentaciju u `docs/`
- Koristi `edit_file` za pisanje contexta

#### Preserve Context
- Verbose write any critical context, findings, decisions u relevantne `docs/` fileove
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
- Koristi `read_file` na ovim notes periodically ako context feels complex

#### Cross-Reference & Verify Documentation
- Continuously compare information gathered during development against `docs/`
- Koristi `edit_file` da challenge i update dokumentaciju

### 3. SEQUENTIAL PROBLEM SOLVING

#### Follow Lifecycle
Strictly adhere to:
1. **Analyze** (`read_file`, tracing)
2. **Plan** (document in `docs/`)
3. **Implement** (`edit_file`)
4. **Verify** (suggest testing steps)

#### Question Assumptions
- Prije actiona, state any assumptions being made
- Seek confirmation ako unsure

#### Understand Before Proceeding
- Ensure exhaustive understanding i dokumentacija **prije** proposing solutions

#### Prioritize
- Address critical errors ili foundational issues prije optimizations

#### Verify Dependencies
- Pay close attention to service registration order i dependency lifetimes

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

## 🔍 AI CODE TRACING PROCEDURE (Version 3)

**Trigger:** Execute this procedure step-by-step **ONLY** kada `codebase_search` ili `grep_search` za specific target (function, class, variable, behavior) **NEMA** yielded required implementation ili definition.

### Step 1: Identify Precise Entry Point
**Goal:** Find the starting line(s) of code for the trace.

**Action:**
- Based on task, identify most likely starting file (e.g., `museum-kiosk.html` button click, Netlify function handler)
- Use `read_file` on suspected file to locate specific function/method invocation
- If file unknown but route ili specific call signature known, use `grep_search`

**Output:** State confirmed `target_file` i line number(s) of entry point. Set this as "current location".

### Step 2: Identify Next Call from Current Location
**Goal:** Determine immediate next function/method/service call relevant to trace.

**Action:**
- Use `read_file` focused on "current location"
- Scan code block for next invocation (e.g., `fetch('/.netlify/functions/...')`, `await someFunction()`)

**Output:** State exact text of invoked method/property (the "callee").

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
**Action C.1:** Extract target info (e.g., `fetch('https://api.replicate.com/...')`)

**Action C.2:** Check `docs/` for API documentation

**Action C.3:** If target system code IS in workspace, find entry point i restart Procedure from Step 1

**Action C.4:** If target system code NOT in workspace, report extracted target info i state tracing cannot proceed further. STOP.

### Step 4: Analyze Implementation & Iterate
**Goal:** Understand located code i decide whether to continue tracing.

**Action 4.1:** Use `read_file` on "implementation location". Analyze logic.

**Action 4.2:** Determine if code directly answers question ili explains behavior being investigated.

**Action 4.3: Loop or Stop:**
- If goal **IS** met: STOP tracing procedure i report findings
- If goal **NOT** met: Set "current location" to file/lines analyzed. GOTO Step 2.

---

## 🛠️ PROJECT-SPECIFIC GUIDELINES

### Technology Stack
- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Backend:** Netlify Functions (Node.js)
- **AI Generation:** Replicate API
- **Storage:** Bunny.net
- **Hosting:** Netlify
- **Python:** Batch generation scripts

### Key Files Structure
```
lovestories dubrovnik/
├── museum-kiosk.html              # Main photo booth UI
├── netlify/
│   └── functions/                 # Serverless functions
│       ├── generate-image.js      # AI image generation
│       ├── upload-to-bunny.js     # Storage upload
│       └── ...
├── docs/                          # Documentation
│   ├── couples-templates-database.json
│   ├── COST_ANALYSIS.md
│   ├── DEPLOYMENT.md
│   └── ...
├── temp/                          # Template examples
│   └── template-01/...template-13/
├── generate-examples.py           # Batch generation
├── upload-to-bunny.py            # Upload script
└── ...
```

### Typical Workflow
1. User selects template in `museum-kiosk.html`
2. Frontend sends request to Netlify function
3. Netlify function calls Replicate API
4. Result stored on Bunny.net
5. URL returned to user

---

## 📝 CHANGE LOG

### December 5, 2025
- Initial creation of PROJECT_RULES.md
- Adapted from Reddit user's Flutter project rules
- Customized for Love Stories Museum Photo Booth project
- Added project-specific guidelines and structure

---

**END OF RULES** - These rules are **ALWAYS ACTIVE** for this project.

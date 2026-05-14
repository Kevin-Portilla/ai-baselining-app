# Survey Flow

**Project:** AI Operations Baseline Assessment
**Last Updated:** 2026-05-14

---

## High-Level Flow

PRD-006 planning update: Section 1 must support team/process assessment scope, a Director field derived from selected Tribe, and a Service/Product field filtered by selected Tribe. Diagnostic sections must support Not Applicable / fully negative responses. Notes, Director, and Service/Product metadata remain informational/contextual only; they must not affect branching, scoring, recommended classification, maturity level, domain activation, or generated/derived output values.

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER OPENS APP                             │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  SECTION 1 — Process Metadata (always visible)                  │
│                                                                 │
│  Tribe · Role · Process Type · Process Name · Frequency         │
│  Criticality · Client Data · Main Systems · Description         │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  SECTION 2 — AI Usage Selection (always visible)                │
│                                                                 │
│  "Is AI currently used in this process?"                        │
│   ○ No AI usage identified                                      │
│   ○ AI is used informally by individuals                        │
│   ○ AI supports some defined workflow activities                │
│   ○ AI is integrated across multiple workflow steps             │
│   ○ AI operates adaptive or autonomous activities               │
│   ○ Not sure                                                    │
└──────────────────────────────┬──────────────────────────────────┘
                               │
               ┌───────────────┼───────────────┐
               │               │               │
               ▼               ▼               ▼
    ┌──────────────┐  ┌───────────────┐  ┌───────────────┐
    │  No selection│  │  Level 0–4    │  │  "Not sure"   │
    │  (screening) │  │  selected     │  │  selected     │
    └──────┬───────┘  └───────┬───────┘  └───────┬───────┘
           │                  │                  │
           ▼                  ▼                  ▼
    ┌──────────────┐  ┌───────────────┐  ┌───────────────────────┐
    │  No branch   │  │  SECTION 3    │  │  NEEDS VALIDATION     │
    │  section     │  │  Level-       │  │  PATH                 │
    │  appears     │  │  specific     │  │  5 escalation         │
    │              │  │  questions    │  │  questions            │
    └──────────────┘  └───────┬───────┘  └───────────────────────┘
                              │
                              ▼
               ┌──────────────────────────┐
               │  REAL-TIME FEEDBACK      │
               │                          │
               │  ClassificationCard      │
               │  → Recommended Level     │
               │  → Level description     │
               │                          │
               │  BranchingPreview        │
               │  → Active level lit up   │
               │                          │
               │  DomainCards Matrix      │
               │  → Completion ✓ per sub  │
               └──────────────────────────┘
```

---

## Detailed Branch Flowchart

```
aiUsage selection
       │
       ├─── "No AI usage identified"
       │           │
       │           ▼
       │    section = "no-ai"
       │    SECTION_QUESTIONS["no-ai"]
       │    4 questions (People + Client domains)
       │    + evidenceL0 textarea
       │
       ├─── "AI is used informally by individuals"
       │           │
       │           ▼
       │    section = "individual"
       │    SECTION_QUESTIONS["individual"]
       │    8 questions (all 3 domains)
       │    + evidenceL1 textarea
       │
       ├─── "AI supports some defined workflow activities"
       │           │
       │           ▼
       │    section = "connected"
       │    SECTION_QUESTIONS["connected"]
       │    11 questions (all 3 domains)
       │    + evidenceL2 textarea
       │
       ├─── "AI is integrated across multiple workflow steps"
       │           │
       │           ▼
       │    section = "orchestrated"
       │    SECTION_QUESTIONS["orchestrated"]
       │    14 questions (all 3 domains)
       │    + evidenceL3 textarea
       │
       ├─── "AI operates adaptive or autonomous activities"
       │           │
       │           ▼
       │    section = "adaptive"
       │    SECTION_QUESTIONS["adaptive"]
       │    11 questions (all 3 domains)
       │    + evidenceL4 textarea
       │
       └─── "Not sure"
                   │
                   ▼
            section = "needs-validation"
            NEEDS_VALIDATION_QUESTIONS
            5 questions (no domain grouping)
            recommendedLevel = "needs-validation"
```

---

## Section 3 — Question Rendering Flow

Within each active section, questions are rendered in domain groups:

```
SECTION_QUESTIONS[currentSection]
           │
           ▼
  for each domainId in ["clientCentric", "operatingModel", "people"]
           │
           ├── filter questions where q.domain === domainId
           │
           ├── if domainQuestions.length === 0 → skip (return null)
           │
           └── render Domain Card
                      │
                      ▼
               for each question in domainQuestions
                      │
                      ├── q.type === "select"   → <FormSelect>
                      ├── q.type === "toggle"   → <ToggleGrid>
                      ├── q.type === "textarea" → <textarea>
                      └── q.type === "input"    → <input>
```

---

## State Transition Diagram

```
State: form.aiUsage

           ┌──────────────┐
           │  "" (empty)  │  currentSection = "screening"
           └──────┬───────┘  recommendedLevel = "needs-validation"
                  │ user selects
                  ▼
    ┌─────────────────────────┐
    │  "No AI usage..."       │  currentSection = "no-ai"
    │  or any option          │  recommendedLevel = "0"–"4" or "needs-validation"
    └─────────────────────────┘
                  │ user changes selection
                  ▼
    ┌─────────────────────────┐
    │  Different option       │  currentSection changes
    │                         │  AnimatePresence animates out old questions
    │                         │  AnimatePresence animates in new questions
    └─────────────────────────┘
                  │ user fills level-specific fields
                  ▼
    ┌─────────────────────────┐
    │  Supplementary signals  │  recommendedLevel may nudge up
    │  present                │  ClassificationCard updates in real time
    └─────────────────────────┘
```

---

## View Navigation Flow

```
app loads
    │
    ▼
activeView = "survey" (default)
    │
    ├── user clicks "Dashboard" tab
    │       │
    │       ▼
    │   activeView = "dashboard"
    │   DashboardView renders (form state preserved)
    │
    └── user clicks "Survey" tab
            │
            ▼
        activeView = "survey"
        SurveyView renders (all answers preserved)
```

---

## Completion Tracking Flow

```
form fields change
       │
       ▼
completion = useMemo(() => {
  fields = [tribe, role, processName, aiUsage, processDescription,
            frequency, criticality, evidence, processType,
            clientData, mainSystems]
  return Math.round(filled / total * 100)
}, [form])
       │
       ▼
Header → progress bar width = completion%
         percentage label = completion%
```

> Note: The `evidence` field in the completion calc references a non-existent field. This is a known bug — see ACTIVE_CONTEXT.md backlog.

---

## Director and Service/Product Metadata Flow

```
selected Tribe
       |
       +-- Director auto-populates from approved Tribe mapping
       |
       +-- Service/Product options filter to that Tribe
              |
              +-- invalid prior Service/Product selection is cleared
```

Director and Service/Product are saved and shown with metadata, but are not branch-routing or scoring inputs.

---

## Needs Validation Path Flow

```
aiUsage = "Not sure"
       │
       ▼
currentSection = "needs-validation"
       │
       ▼
SurveyView renders <NeedsValidation> instead of domain-grouped questions
       │
       ├── validationUncertainty (select)   — Why are you unsure?
       ├── aiOutputsSeen (select)           — Have you seen AI outputs?
       ├── validationContact (input)        — Who can confirm usage?
       ├── reviewRequired (select)          — Needs process owner review?
       └── validationContext (textarea)     — Additional context
       │
       ▼
recommendedLevel = "needs-validation"
ClassificationCard shows amber pill — "Needs Validation"
BranchingPreview — no level highlighted
```

---

## Export Flow (Planned — v1.1)

```
User clicks "Export"
       │
       ▼
JSON.stringify(form + { recommendedLevel })
       │
       ▼
new Blob([json], { type: "application/json" })
       │
       ▼
URL.createObjectURL(blob)
       │
       ▼
<a download="assessment-[processName].json">
→ Browser downloads file
→ No network call
```

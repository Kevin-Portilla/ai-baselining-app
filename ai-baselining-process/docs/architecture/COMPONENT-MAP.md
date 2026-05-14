# Component Map

**Project:** AI Operations Baseline Assessment
**Last Updated:** 2026-05-14

---

## Component Tree

PRD-006 planning update: `FormSelect`, `ToggleGrid`, `SurveyView`, `NeedsValidation`, `DomainCards`, `App.jsx`, `DashboardView`, `ClassificationCard`, and future export helpers are affected by Notes, Not Applicable, team-level assessment scope, Director mapping, and Tribe-filtered Service/Product catalog requirements.

```
main.jsx
└── App.jsx  (root — holds all state)
    ├── Header.jsx
    │     └── motion.div (Framer Motion entrance)
    │           ├── Title + subtitle
    │           └── Completion widget (% bar)
    │
    ├── ViewNav.jsx
    │     └── Survey | Dashboard toggle buttons
    │
    ├── [activeView === "survey"] SurveyView.jsx
    │     ├── DomainCards.jsx
    │     │     └── 3×3 matrix grid
    │     │           ├── Strategic Stage headers (chevron)
    │     │           └── Domain rows
    │     │                 └── Stage cells
    │     │                       └── Subcategory items + completion ✓
    │     │
    │     └── Main Grid (lg:grid-cols-3)
    │           │
    │           ├── LEFT COLUMN (lg:col-span-2) — Card
    │           │     ├── Section 1: Metadata fields
    │           │     │     ├── FormSelect (Tribe, Role, Process Type)
    │           │     │     ├── <input> (Process Name, Main Systems)
    │           │     │     ├── FormSelect (Frequency, Client Data, Criticality)
    │           │     │     ├── <textarea> (Process Description)
    │           │     │     └── FormSelect [highlight] (AI Usage — branching signal)
    │           │     │
    │           │     └── AnimatePresence → motion.div
    │           │           ├── [isActive] Domain-grouped questions
    │           │           │     └── for each domain (clientCentric, operatingModel, people)
    │           │           │           └── Domain card
    │           │           │                 └── for each question in domain
    │           │           │                       ├── FormSelect (type: select)
    │           │           │                       ├── ToggleGrid (type: toggle)
    │           │           │                       ├── <input> (type: input)
    │           │           │                       └── <textarea> (type: textarea)
    │           │           │
    │           │           └── [isNeedsValidation] NeedsValidation.jsx
    │           │                 └── 5 validation questions
    │           │
    │           └── RIGHT COLUMN — Sidebar
    │                 ├── ClassificationCard.jsx
    │                 │     └── AnimatePresence → motion.div
    │                 │           └── Level pill (color + icon + label)
    │                 │
    │                 └── BranchingPreview.jsx
    │                       └── Card list of 5 levels
    │                             └── Active level highlighted in blue
    │
    └── [activeView === "dashboard"] DashboardView.jsx
          └── Recharts charts
                ├── BarChart (maturity distribution)
                ├── BarChart (by tribe)
                └── (other charts from sampleProcesses.js)
```

---

## Component Responsibilities

### `App.jsx` — Root (State Container)
- Owns all form state (`useState(initialForm)`)
- Owns view state (`useState("survey")`)
- Derives: `currentSection`, `recommendedLevel`, `completion`, `domainActive`
- Passes everything down as props (no context, no store)
- Renders `Header`, `ViewNav`, and either `SurveyView` or `DashboardView`

### `Header.jsx` — Top Bar
- Receives: `completion` (number 0–100)
- Renders: app title, subtitle, animated completion percentage + progress bar
- No state, no callbacks

### `ViewNav.jsx` — Tab Toggle
- Receives: `activeView`, `onViewChange`
- Renders: Survey / Dashboard pill buttons
- Stateless

### `SurveyView.jsx` — Main Survey Page
- Receives: `form`, `updateField`, `currentSection`, `recommendedLevel`, `domainActive`
- Renders: DomainCards matrix, Section 1 metadata fields, animated branching questions, sidebar
- Contains the branching render logic: `questions = SECTION_QUESTIONS[currentSection]`
- Domain grouping loop: iterates `["clientCentric", "operatingModel", "people"]`

### `DomainCards.jsx` — 3×3 Matrix
- Receives: `domainActive` (per-domain boolean), `form` (for subcategory completion)
- Renders: 3 domain rows × 3 strategic stage columns
- Reads: `domains`, `strategicStages` from `levelConfig.js`
- Shows green ✓ when any field in a subcategory's `fields[]` array has a value
- **Pure display** — no callbacks

### `ClassificationCard.jsx` — Right Sidebar Level Card
- Receives: `recommendedLevel` (string "0"–"4" or "needs-validation")
- Renders: colored pill with icon, level label, level description
- Reads: `levelPillClass`, `levelIcons`, `levelShortLabels`, `levelDescriptions` from `levelConfig.js`
- Animated with `AnimatePresence` on level change
- **Pure display** — no callbacks

### `BranchingPreview.jsx` — Right Sidebar Level List
- Receives: `currentSection` (string)
- Renders: list of all 5 maturity levels; highlights the active one
- Reads: `branchingLevels` from `levelConfig.js`
- **Pure display** — no callbacks

### `NeedsValidation.jsx` — Validation Path Form
- Receives: `form`, `updateField`
- Renders: 5 validation questions from `NEEDS_VALIDATION_QUESTIONS`
- Replaces domain-grouped questions when `currentSection === "needs-validation"`

### `FormSelect.jsx` — Dropdown Component
- Receives: `label`, `value`, `onChange`, `options[]`, `placeholder`, `highlight?`
- Renders: styled `<select>` element
- Stateless — controlled component

### `ToggleGrid.jsx` — Multi-Select Toggle Grid
- Receives: `label`, `options[]`, `value[]`, `onChange`, `otherValue?`, `onOtherChange?`
- Renders: grid of toggle buttons; selected = blue fill
- Handles "Notes" option with a free-text input while preserving legacy `"Other"` values as Notes
- Stateless — controlled component

### `Icon.jsx` — Dynamic Icon Renderer
- Receives: `type` (string key)
- Renders: matching Lucide React icon or null
- Used by `ClassificationCard` and `BranchingPreview` for dynamic icon keys

### `DashboardView.jsx` — Dashboard Page
- Receives: `form`, `recommendedLevel`, `currentSection`, `completion`
- Renders: Recharts visualizations from `sampleProcesses.js` data
- Stateless — reads static sample data

---

## Props Interface Summary

```
App.jsx
  │
  ├── → Header            { completion: number }
  ├── → ViewNav           { activeView: string, onViewChange: fn }
  ├── → SurveyView        { form, updateField, currentSection, recommendedLevel, domainActive }
  │     ├── → DomainCards { domainActive, form }
  │     ├── → FormSelect  { label, value, onChange, options, placeholder, highlight? }
  │     ├── → ToggleGrid  { label, options, value, onChange, otherValue?, onOtherChange? }
  │     ├── → NeedsValidation { form, updateField }
  │     ├── → ClassificationCard { recommendedLevel, currentSection }
  │     └── → BranchingPreview  { currentSection }
  └── → DashboardView     { form, recommendedLevel, currentSection, completion }
```

---

## Data Files (Non-Component)

| File | Exports | Purpose |
|------|---------|---------|
| `data/formConfig.js` | `initialForm`, `tribes`, Director mapping, Tribe-filtered Service/Product catalog, `roleTypes`, `processTypeOptions`, `frequencies`, `criticalityOptions`, `clientDataOptions`, `aiUsageOptions` | All dropdown options + form field initial state |
| `data/questions.js` | `SECTION_QUESTIONS`, `NEEDS_VALIDATION_QUESTIONS`, `FINAL_QUESTIONS` | All survey questions per section |
| `data/levelConfig.js` | `usageToLevel`, `sectionLabels`, `levelDescriptions`, `levelShortLabels`, `levelIcons`, `levelPillClass`, `branchingLevels`, `strategicStages`, `domains` | Level metadata, domain structure, UI config |
| `data/sampleProcesses.js` | `sampleProcesses` | 50 pre-built assessment records for dashboard |
| `logic/maturity.js` | `getCurrentSection`, `calculateLevel`, `computeDomainActive` | Branch routing, score computation, and domain/quadrant activation using positive evidence only |
| `logic/assessmentTarget.js` | `getAssessmentTarget`, `normalizeAssessmentScope`, `isAssessmentContextValid`, `computeAssessmentCompletion` | Team/process assessment target compatibility, validation, labels, and completion |
| `logic/assessmentOutput.js` | `prepareAssessmentOutput`, `buildScoredDiagnosticAnswers`, `collectNotes` | Output preparation with Notes separated from scored diagnostic answers and team/process target metadata |
| `lib/utils.js` | `cn` | Tailwind class merging utility |

# System Architecture

**Project:** AI Operations Baseline Assessment
**Version:** 1.0.0
**Last Updated:** 2026-05-12

---

## 1. Overview

The AI Operations Baseline Assessment is a **single-page, client-side web application**. There is no backend, no database, and no server — all logic runs in the browser. The architecture is intentionally simple for v1: a facilitated assessment tool where an assessor fills in the form during a session and exports a JSON file.

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                              │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │              React Application (SPA)                │   │
│   │                                                     │   │
│   │   ┌──────────────┐       ┌──────────────────────┐  │   │
│   │   │   App.jsx    │       │   DashboardView.jsx  │  │   │
│   │   │  (Root State)│       │   (Recharts charts)  │  │   │
│   │   └──────┬───────┘       └──────────────────────┘  │   │
│   │          │                                          │   │
│   │   ┌──────▼───────────────────────────────────────┐ │   │
│   │   │            SurveyView.jsx                    │ │   │
│   │   │  (Form  +  DomainCards  +  Sidebar Cards)   │ │   │
│   │   └──────────────────────────────────────────────┘ │   │
│   │                                                     │   │
│   │   ┌───────────────────┐  ┌────────────────────────┐ │  │
│   │   │   data/ (config)  │  │  logic/maturity.js     │ │  │
│   │   │  formConfig.js    │  │  calculateLevel()      │ │  │
│   │   │  questions.js     │  │  getCurrentSection()   │ │  │
│   │   │  levelConfig.js   │  └────────────────────────┘ │  │
│   │   │  sampleProcesses  │                             │   │
│   │   └───────────────────┘                             │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌──────────────────────────────────────────────────────┐  │
│   │     Local State only — no network calls              │  │
│   │     Export: JSON blob via URL.createObjectURL        │  │
│   └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Layer Architecture

The application maps to a simplified three-layer architecture adapted for a frontend-only context:

```
┌──────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│   views/SurveyView.jsx       views/DashboardView.jsx         │
│   components/DomainCards     components/ClassificationCard   │
│   components/BranchingPreview  components/NeedsValidation    │
│   components/Header  components/ViewNav  components/ui/*     │
└──────────────────────────┬───────────────────────────────────┘
                           │  props / callbacks
┌──────────────────────────▼───────────────────────────────────┐
│                  APPLICATION LAYER (App.jsx)                  │
│   useState(form)           useMemo(currentSection)           │
│   useMemo(recommendedLevel) useMemo(completion)              │
│   useMemo(domainActive)    updateField()                     │
└──────────────────────────┬───────────────────────────────────┘
                           │  reads/calls
┌──────────────────────────▼───────────────────────────────────┐
│                     DOMAIN LAYER                             │
│   logic/maturity.js        data/questions.js                 │
│   calculateLevel()         SECTION_QUESTIONS{}               │
│   getCurrentSection()      NEEDS_VALIDATION_QUESTIONS[]      │
│   usageToLevel map         FINAL_QUESTIONS[]                 │
└──────────────────────────┬───────────────────────────────────┘
                           │  reads
┌──────────────────────────▼───────────────────────────────────┐
│                   CONFIGURATION LAYER                        │
│   data/formConfig.js       data/levelConfig.js               │
│   initialForm{}            domains[]  strategicStages[]      │
│   tribes[]  roleTypes[]    levelShortLabels{}  levelIcons{}  │
│   frequencies[]            levelPillClass{}  branchingLevels │
│   aiUsageOptions[]         levelDescriptions{}  sectionLabels│
└──────────────────────────────────────────────────────────────┘
```

### Dependency Direction

```
Presentation  →  Application  →  Domain  →  Configuration
     ↑_____________________________________|
     (data flows up via props)
```

---

## 3. State Architecture

All state is managed in a single `useState` hook in `App.jsx`. No external state manager (Redux, Zustand, etc.) is used.

```
App.jsx
  │
  ├── form (useState)             ← all 50+ form fields
  │     │
  │     ├── Section 1: metadata   tribe, role, processName, ...
  │     ├── Section 2: screening  aiUsage
  │     ├── Level 0 fields        aiAwareness, adoptionBarriers[], ...
  │     ├── Level 1 fields        aiLiteracy, aiToolsUsed[], ...
  │     ├── Level 2 fields        automationMaturity, reusableAssetsL2[], ...
  │     ├── Level 3 fields        connectedProcessSteps[], governanceControlsL3[], ...
  │     ├── Level 4 fields        aiAutonomyLevel, advancedTechCapabilities[], ...
  │     └── Validation fields     validationUncertainty, validationContact, ...
  │
  ├── activeView (useState)       "survey" | "dashboard"
  │
  ├── currentSection (useMemo)    derived from form.aiUsage
  │     └── calls getCurrentSection(form)
  │
  ├── recommendedLevel (useMemo)  derived from form answers
  │     └── calls calculateLevel(form)
  │
  ├── completion (useMemo)        0–100%, from Section 1 fields
  │
  └── domainActive (useMemo)      { clientCentric, operatingModel, people }
        └── true if any field in that domain has a value
```

### State Flow

```
User interaction
      │
      ▼
updateField(field, value)
      │
      ▼
setForm(prev => ({ ...prev, [field]: value }))
      │
      ├── currentSection re-derived  → SurveyView renders correct questions
      ├── recommendedLevel re-derived → ClassificationCard updates
      ├── completion re-derived      → Header progress bar updates
      └── domainActive re-derived    → DomainCards matrix updates
```

---

## 4. Routing

There is no client-side router (no React Router, no TanStack Router). Navigation between Survey and Dashboard is handled by a `activeView` state variable in `App.jsx`:

```jsx
{activeView === "survey" ? <SurveyView ... /> : <DashboardView ... />}
```

This is intentional — the app has exactly two views and no URL-addressable states are required in v1.

---

## 5. Data Flow — Survey to Classification

```
┌─────────────────────────────────────────────────────────────┐
│  1. User fills Section 1 metadata                           │
│     form.tribe, form.role, form.processName, ...            │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  2. User selects AI Usage level                             │
│     form.aiUsage = "AI supports some defined workflow..."   │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  3. getCurrentSection(form) maps aiUsage → section key      │
│     "AI supports..." → "connected"                          │
│     SurveyView renders SECTION_QUESTIONS["connected"]       │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  4. User answers domain-grouped questions (L2 example)      │
│     People:    automationMaturity, evaluatingQuality        │
│     Client:    workflowActivitiesL2[], aiIntegrationL2      │
│     OpModel:   aiGovernanceL2, reusableAssetsL2[], ...      │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  5. calculateLevel(form) computes recommended level         │
│     base = 2 (from aiUsage mapping)                        │
│     + nudges if supplementary signals present               │
│     → recommended: "2" or "3" (capped)                     │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  6. ClassificationCard renders: "2 — Connected Workflows"   │
│     DomainCards matrix shows completion per subcategory     │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Build & Deploy Architecture

```
Source (src/)
     │
     ▼  npm run build (Vite)
dist/
  ├── index.html
  ├── assets/
  │   ├── index-[hash].js    (React bundle)
  │   └── index-[hash].css   (Tailwind output)
  └── ...

     │
     ▼  Deploy to static host
Static Host (Vercel / Netlify / GitHub Pages)
  └── Serves dist/ on CDN — no server required
```

### Build Pipeline (CI)

```
git push
   │
   ▼
GitHub Actions ci.yml
   │
   ├── Job: Lint
   │     npm ci → npm run lint (ESLint)
   │     Fails fast on unused vars, missing exports
   │
   └── Job: Build (needs: lint)
         npm ci → npm run build (Vite)
         Upload dist/ as artifact (7 days)
```

---

## 7. Future Architecture (v2 — Backend)

When a backend is introduced, the architecture will expand to:

```
Browser (React SPA)
        │
        │ REST API (HTTPS)
        ▼
API Server (Node.js / Express or Next.js)
        │
        ├── Auth: Supabase Auth (JWT)
        ├── DB:   Supabase PostgreSQL
        │          process_assessments table
        │          users table
        └── Storage: Supabase Storage (PDF exports)
```

The `initialForm` object maps directly to the `process_assessments` schema. The `calculateLevel()` function moves to a server-side scoring service. See ADR-004 for the v1 decision rationale.

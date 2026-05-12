# System Patterns

> Established patterns and conventions used in this codebase.
> AI agents should follow these patterns for consistency.

*Last Updated: 2026-05-12*

---

## Architecture Pattern — Single Root State

All form state lives in one `useState` in `App.jsx`. No context provider, no state library.

```jsx
// App.jsx
const [form, setForm] = useState(initialForm);

const updateField = (field, value) =>
  setForm((prev) => ({ ...prev, [field]: value }));

// Passed down as props to all views
<SurveyView form={form} updateField={updateField} ... />
```

**Why:** The survey is a single-session tool. One form object, one update function — simple, predictable, zero boilerplate.

**Rule:** Do not introduce useContext, Redux, or Zustand unless the state genuinely needs to cross more than 3 component layers.

---

## Pattern — Derived State via useMemo

All computed values are `useMemo` hooks in `App.jsx`. They are never stored in state.

```jsx
const currentSection   = useMemo(() => getCurrentSection(form), [form]);
const recommendedLevel = useMemo(() => calculateLevel(form), [form]);
const completion       = useMemo(() => computeCompletion(form), [form]);
const domainActive     = useMemo(() => computeDomainActive(form), [form]);
```

**Rule:** If a value can be derived from `form`, compute it — never put it in state. Storing derived state leads to sync bugs.

---

## Pattern — Pure Logic Functions

`getCurrentSection` and `calculateLevel` are pure functions with no side effects.

```js
// logic/maturity.js
export function getCurrentSection(form) { ... }
export function calculateLevel(form) { ... }
```

**Rule:** All scoring and routing logic lives in `logic/maturity.js`. No business logic in components.

---

## Pattern — Controlled Components

Every form input is controlled — value from `form`, onChange calls `updateField`.

```jsx
<FormSelect
  value={form.tribe}
  onChange={(v) => updateField("tribe", v)}
  options={tribes}
/>

<ToggleGrid
  value={form.adoptionBarriers}
  onChange={(v) => updateField("adoptionBarriers", v)}
/>
```

**Rule:** Never use uncontrolled inputs (`ref`, `defaultValue`). All field values live in `initialForm`.

---

## Pattern — Three-File Sync for Questions

Every survey question requires **three synchronized entries**:

```
1. src/data/formConfig.js      → initialForm.fieldName = "" or []
2. src/data/questions.js       → { id, domain, subcategory, label, type, field, options }
3. src/data/levelConfig.js     → domains[].stages[].subcategories[].fields = ["fieldName"]
```

**Rule (BR-007):** Adding a question requires all three files. Removing a field requires auditing all three. Out-of-sync state causes runtime crashes (RCA-001).

---

## Pattern — Domain-Grouped Question Rendering

Questions within a maturity level are rendered in domain groups:

```jsx
// SurveyView.jsx
["clientCentric", "operatingModel", "people"].map((domainId) => {
  const domainQuestions = questions.filter((q) => q.domain === domainId);
  if (domainQuestions.length === 0) return null;

  return (
    <div key={domainId} className="rounded-2xl border ...">
      {/* Domain header */}
      {domainQuestions.map((q) => <QuestionRenderer key={q.id} q={q} />)}
    </div>
  );
})
```

**Rule:** Always guard with `if (domainQuestions.length === 0) return null` — some domains have no questions at certain levels.

---

## Pattern — Section Data Lookup

The active question set is determined by a simple lookup:

```jsx
const questions = SECTION_QUESTIONS[currentSection] || null;
```

`currentSection` is one of: `"no-ai"` · `"individual"` · `"connected"` · `"orchestrated"` · `"adaptive"` · `"needs-validation"` · `"screening"`.

**Rule:** Never hardcode section keys in components — always derive from `getCurrentSection()`.

---

## Pattern — Safe Array Field Access

Array fields may be undefined if referenced incorrectly. Always use `|| []` when accessing `.length` on form fields that are expected to be arrays:

```js
// In maturity.js
if ((form.governanceControlsL3 || []).length >= 4 ...) score += 0.5;
```

**Rule:** When writing new scoring signals or `domainActive` checks, use `(form.fieldName || []).length` for array fields.

---

## Pattern — Level Config as Single Source of Truth

All level metadata (labels, colors, icons, descriptions) lives in `levelConfig.js`. Never hardcode level display data in components.

```js
// Good
const pill = levelPillClass[recommendedLevel];
const label = levelShortLabels[recommendedLevel];

// Bad
const pill = recommendedLevel === "2" ? "bg-blue-600" : ...
```

**Rule:** If adding a new level or changing level display properties, update `levelConfig.js` only.

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why Bad | Fix |
|---|---|---|
| Calling `.length` on `form.fieldName` directly | If field is not in `initialForm`, it's `undefined` → `TypeError` → blank page (RCA-001) | Use `(form.fieldName \|\| []).length` |
| Hardcoding level colors in JSX | Duplicates `levelConfig.js`, drifts | Use `levelPillClass[level]` |
| Adding a question to `questions.js` without updating `formConfig.js` | Uncontrolled input, field never saved | Three-file sync pattern |
| Importing named exports that don't exist | Build passes, runtime crashes | Check `levelConfig.js` exports before importing |
| Direct commits to `develop` or `main` | Bypasses CI | Always feature branch → PR → CI ✅ |
| Logic in components | Untestable, hard to trace | Move to `logic/maturity.js` or config files |

---

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Component files | PascalCase + `.jsx` | `DomainCards.jsx` |
| Data/logic files | camelCase + `.js` | `formConfig.js`, `maturity.js` |
| CSS classes | Tailwind utilities only | `text-slate-900 font-bold` |
| Form field names | camelCase | `aiToolsUsed`, `governanceControlsL3` |
| Level keys | numeric string | `"0"`, `"1"`, `"needs-validation"` |
| Section keys | kebab-case | `"no-ai"`, `"needs-validation"` |
| Domain IDs | camelCase | `clientCentric`, `operatingModel`, `people` |
| Stage IDs | lowercase short | `sbp`, `sd`, `dh` |

---

## File Organization

```
src/
├── App.jsx              ← state, derived values, layout
├── main.jsx             ← React root mount
├── components/          ← reusable UI components (no logic)
│   ├── ui/              ← shadcn base components (Card, Button)
│   └── ...
├── views/               ← page-level components
│   ├── SurveyView.jsx   ← survey form + domain rendering
│   └── DashboardView.jsx ← charts + sample data
├── data/                ← pure config objects (no JSX, no logic)
│   ├── formConfig.js    ← initialForm + dropdown options
│   ├── questions.js     ← SECTION_QUESTIONS per level
│   ├── levelConfig.js   ← level metadata + domain structure
│   └── sampleProcesses.js ← static sample data
├── logic/               ← pure functions (no JSX, no React)
│   └── maturity.js      ← calculateLevel, getCurrentSection
└── lib/
    └── utils.js         ← cn() Tailwind class helper
```

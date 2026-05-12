# Design System

**Project:** AI Operations Baseline Assessment
**Last Updated:** 2026-05-12

---

## Design Principles

1. **Corporate / Executive** — Clean, high-contrast, professional. The tool is used in enterprise assessment contexts.
2. **Dark canvas, light content** — Deep dark background makes the white survey card the clear focus area.
3. **Progressive disclosure** — Only the relevant question set appears. The form does not overwhelm with all 48+ questions at once.
4. **Real-time feedback** — Classification card and domain matrix update immediately as the user answers.
5. **Visual hierarchy** — Blue for primary actions/levels, orange for category headers, green for completion.

---

## Color Palette

### Background & Surface

| Token | Hex / Class | Usage |
|-------|-------------|-------|
| Page background | `#020617` | Root div (slate-950 equivalent) |
| Card surface | `bg-white` | Survey form card, sidebar cards |
| Card surface subtle | `bg-white/80 backdrop-blur-md` | Domain matrix container |
| Dark header | `bg-slate-900` | ClassificationCard background |
| Dark widget | `bg-slate-800` | Completion widget, ViewNav container |
| Muted cell | `bg-slate-50/40` | Inactive domain matrix cells |

### Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Accenture Blue | `#0052CC` | Domain matrix stage headers |
| Domain label | `#0F172A` | Domain row labels (chevron) |
| Category orange | `#EA580C` | Domain category titles |

### Maturity Level Pills

| Level | Class | Hex Equivalent |
|-------|-------|----------------|
| L0 No AI | `bg-slate-700` | #334155 |
| L1 Individual | `bg-teal-700` | #0f766e |
| L2 Connected | `bg-blue-600` | #2563eb |
| L3 Orchestrated | `bg-indigo-600` | #4f46e5 |
| L4 Adaptive | `bg-violet-600` | #7c3aed |
| Needs Validation | `bg-amber-400` | #fbbf24 |

### Semantic Colors

| Usage | Class |
|-------|-------|
| Completion checkmark | `bg-emerald-500` / `text-white` |
| Active subcategory arrow | `text-blue-500` |
| Active level highlight | `bg-blue-600 text-white` |
| Input focus ring | `ring-2 ring-blue-500` |
| Border default | `border-slate-200` |
| Text primary | `text-slate-900` |
| Text secondary | `text-slate-400` |
| Text accent | `text-blue-600` |
| Text on dark | `text-white` |

---

## Typography

| Element | Classes | Description |
|---------|---------|-------------|
| App title (H1) | `text-5xl font-bold text-white tracking-tight` | "AI Operations Baseline App" |
| Survey H1 | `text-3xl font-black text-white tracking-tight` | "Roadmap for Intelligent Era" |
| Section header | `text-xl font-bold text-slate-900` | Form card title |
| Domain title | `text-[13px] font-bold text-white` | Chevron label |
| Category title | `text-[11px] font-extrabold text-[#EA580C] uppercase tracking-wider` | Orange headers in matrix |
| Subcategory | `text-[11px] font-semibold text-slate-900` | Matrix subcategory names |
| Label | `text-sm font-medium text-slate-700` | Form field labels |
| Input text | `text-sm text-slate-900` | Form input values |
| Helper text | `text-xs text-blue-600` | Subtitle below form header |
| Level label | `text-xl font-bold` | Classification pill title |
| Body small | `text-sm text-blue-300 leading-relaxed` | ClassificationCard description |
| Badge/tag | `text-xs uppercase tracking-wide` | "Maturity Level" label |

---

## Spacing

Tailwind spacing scale used throughout:

| Usage | Class |
|-------|-------|
| Page horizontal padding | `px-6` |
| Page top padding | `pt-10`, `pt-12` |
| Card padding | `p-7` |
| Card content gap | `space-y-5` |
| Domain matrix padding | `p-8` |
| Cell padding | `p-5` |
| Section gap | `gap-6` |
| Completion widget padding | `p-5` |

---

## Border Radius

| Element | Class |
|---------|-------|
| Page-level matrix | `rounded-[32px]` |
| Main cards | `rounded-2xl` |
| Domain cells | `rounded-2xl` |
| Input fields | `rounded-xl` |
| Buttons / pills | `rounded-full` |
| Icon containers | `rounded-lg`, `rounded-xl` |
| Progress bar | `rounded-full` |

---

## Component Patterns

### Form Field

```
Label (text-sm font-medium text-slate-700)
[  Select dropdown or input  border-slate-200 rounded-xl p-3  ]
           focus: ring-2 ring-blue-500
```

### Toggle Button (ToggleGrid)

```
[ Option Text ]   — unselected: bg-white border-slate-200 text-slate-700
[ Option Text ]   — selected:   bg-blue-600 border-blue-600 text-white
```

### Domain Card (in SurveyView)

```
┌─────────────────────────────────────────────┐
│  [🔧] Domain Title          (border-b)      │
├─────────────────────────────────────────────│
│  Question Label                             │
│  [  Select or ToggleGrid  ]                 │
│                                             │
│  Question Label                             │
│  [ Toggle ] [ Toggle ] [ Toggle ]           │
└─────────────────────────────────────────────┘
```

### Matrix Cell

```
┌────────────────────────────────────┐
│  CATEGORY TITLE (orange, uppercase)│
│                                    │
│  → Subcategory Name           ✓   │  ← ✓ appears when fields answered
│  → Subcategory Name               │
│  → Subcategory Name               │
└────────────────────────────────────┘
```

### Classification Pill

```
┌─────────────────────────────────────┐  ← bg-blue-600 (L2 example)
│  [🔗]  2 — Connected Workflows      │
└─────────────────────────────────────┘
  icon   level number + short label
```

### Chevron Header (Strategic Stage)

```
 ╔══════════════════════════════╗
╔  Sense, Benchmark & Position  ╗   ← clip-path polygon chevron
╚══════════════════════════════╝
```

### Domain Row Label

```
╔═══════════════════════╗
║ Client Centric         ╲  ← clip-path polygon right-pointing arrow
║ Approach                ╲
║ (Business Model)        ╱
╚═════════════════════════╝
```

---

## Animation

| Animation | Config | Where used |
|-----------|--------|------------|
| Page entrance | `initial={opacity:0, y:14}` → `animate={opacity:1, y:0}` duration 0.4s | Header, completion widget |
| Section transition | `initial={opacity:0, y:8}` → `animate={opacity:1, y:0}` exit `{opacity:0, y:-8}` duration 0.22s | Survey branching section |
| Level pill change | `initial={opacity:0, scale:0.97}` → `animate={opacity:1, scale:1}` duration 0.2s | ClassificationCard |
| Progress bar | `transition-all duration-500` | Completion bar |
| Domain cells | `transition-all duration-500` | Active state change |

---

## Layout Grid

```
┌────────────────────────────────────────── max-w-7xl ──────────────────────────────────────────┐
│                                                                                                │
│  ┌─────────────────────────────────────── full width ──────────────────────────────────────┐  │
│  │                        Header (title + completion widget)                               │  │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                │
│  ┌─────────────────────────────────────── full width ──────────────────────────────────────┐  │
│  │                        ViewNav (Survey | Dashboard tabs)                                │  │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                │
│  ┌─────────────────────────────────────── full width ──────────────────────────────────────┐  │
│  │                        DomainCards 3×3 Matrix (overflow-x: auto)                        │  │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                │
│  ┌────────────────────────── lg:grid-cols-3 gap-6 ───────────────────────────────────────┐    │
│  │                                                                                        │    │
│  │  ┌──────────────────── lg:col-span-2 ──────────────────────┐   ┌──── col-span-1 ───┐  │    │
│  │  │                                                          │   │                   │  │    │
│  │  │   Survey Form Card (white)                               │   │ ClassificationCard│  │    │
│  │  │   - Section 1 metadata                                   │   │ (dark, level pill)│  │    │
│  │  │   - AnimatePresence branching                            │   │                   │  │    │
│  │  │     - Domain-grouped questions OR NeedsValidation        │   │ BranchingPreview  │  │    │
│  │  │                                                          │   │ (level list)      │  │    │
│  │  └──────────────────────────────────────────────────────────┘   └───────────────────┘  │    │
│  └────────────────────────────────────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Responsive Breakpoints

| Context | Breakpoint | Behavior |
|---------|-----------|----------|
| Form row (Tribe + Role) | `md:grid-cols-2` | Stack on mobile, side by side on ≥768px |
| Main layout (form + sidebar) | `lg:grid-cols-3` | Single column on mobile/tablet, 3-col on ≥1024px |
| Domain matrix | `min-w-[1000px]` | Horizontal scroll on small screens |
| Page max width | `max-w-7xl` | Constrained to 80rem on large screens |

# Tech Stack

**Project:** AI Operations Baseline Assessment
**Version:** 1.0.0
**Last Updated:** 2026-05-12

---

## Summary

| Category | Choice | Version | Why |
|----------|--------|---------|-----|
| Framework | React | 19.2.x | Stable, team-familiar, large ecosystem |
| Build tool | Vite | 8.x | Fast HMR, minimal config, ESM-first |
| Language | JavaScript (JSX) | ES2022+ | No TypeScript overhead for v1 prototype |
| Styling | Tailwind CSS | 4.x | Utility-first, no runtime cost |
| UI Components | shadcn/ui | — | Accessible, unstyled base, composable |
| Animation | Framer Motion | 12.x | AnimatePresence for level transitions |
| Charts | Recharts | 3.x | React-native, composable chart primitives |
| Icons | Lucide React | 1.x | Consistent outline icon set |
| Linter | ESLint | 10.x | CI-enforced, flat config |
| CI/CD | GitHub Actions | — | Lint + Build on every push/PR |
| Hosting | Static (Vercel/Netlify) | — | No server needed for v1 |

---

## Frontend Framework — React 19

React is used as the primary UI framework. The application uses:

- **Functional components only** — no class components
- **Hooks only** — `useState`, `useMemo`; no `useEffect` (no side effects needed)
- **React.StrictMode** — enabled in `main.jsx` for development warnings
- **JSX transform** — automatic (no `import React` needed in components)

```jsx
// main.jsx — entry point
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Why React 19
- React 19 is the current stable LTS-equivalent version
- No breaking changes from 18 for this use case
- Concurrent features available but not required in v1

---

## Build Tool — Vite 8

Vite handles development server, HMR, and production bundling.

```js
// vite.config.js
export default defineConfig({
  plugins: [react()],            // @vitejs/plugin-react (SWC transform)
  resolve: {
    alias: { "@": "./src" },    // @/components → src/components
  },
});
```

### Key Vite Features Used
- **`@vitejs/plugin-react`** — SWC-based React transform (fast build)
- **Path alias `@/`** — maps to `src/` for clean imports
- **ESM output** — modern browser target, no CommonJS
- **Asset hashing** — `dist/assets/index-[hash].js` for cache busting

### Scripts
```json
"dev":     "vite"           // localhost:5173 with HMR
"build":   "vite build"     // dist/ for production
"lint":    "eslint ."       // ESLint on all JS/JSX
"preview": "vite preview"   // serves dist/ locally
```

---

## Styling — Tailwind CSS v4

Tailwind CSS v4 provides utility-first styling. All styling is done via class names — no separate CSS files except for base resets.

```
tailwindcss v4 (CSS-first config — no tailwind.config.js needed)
  └── @tailwindcss/postcss (PostCSS plugin)
       └── autoprefixer
```

### Usage Patterns

```jsx
// Dark page background
<div className="min-h-screen" style={{ backgroundColor: "#020617" }}>

// White card surface
<Card className="rounded-2xl shadow-xl">

// Domain matrix chevron header
<div className="bg-[#0052CC] text-white font-bold text-[11px] px-6
                tracking-[0.05em] uppercase rounded-sm"
     style={{ clipPath: "polygon(0% 0%, 96% 0%, 100% 50%, 96% 100%, 0% 100%)" }}>
```

### Design Tokens (Custom Colors)
| Token | Value | Usage |
|-------|-------|-------|
| Page background | `#020617` | Inline style on root div |
| Accenture blue | `#0052CC` | Domain matrix headers |
| Category orange | `#EA580C` | Domain category titles |
| Domain label | `#0F172A` | Domain row label background |
| Blue accent | `bg-blue-600` | Level 2 pill, active borders |
| Indigo accent | `bg-indigo-600` | Level 3 pill |
| Violet accent | `bg-violet-600` | Level 4 pill |
| Teal accent | `bg-teal-700` | Level 1 pill |
| Amber accent | `bg-amber-400` | Needs Validation pill |

---

## UI Components — shadcn/ui

shadcn/ui provides the base Card and Button components. These are **copied into the repo** (not installed as a package) — they live in `src/components/ui/`.

```
src/components/ui/
├── card.jsx     — Card, CardContent, CardHeader, CardTitle
└── button.jsx   — Button (variant, size props)
```

### Usage
```jsx
import { Card, CardContent } from "@/components/ui/card";

<Card className="rounded-2xl">
  <CardContent className="p-7 space-y-5">
    ...
  </CardContent>
</Card>
```

### Why shadcn/ui
- Components are owned by the project (no breaking upstream updates)
- Accessible by default (Radix UI primitives)
- Fully Tailwind-styled — no CSS-in-JS overhead

---

## Animation — Framer Motion 12

Framer Motion provides animated transitions between maturity levels in the survey form.

```jsx
import { AnimatePresence, motion } from "framer-motion";

<AnimatePresence mode="wait">
  {isActive && (
    <motion.div
      key={currentSection}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22 }}
    >
      {/* Level-specific questions */}
    </motion.div>
  )}
</AnimatePresence>
```

### Used In
- `SurveyView.jsx` — questions fade in/out when AI usage level changes
- `ClassificationCard.jsx` — level pill animates on level change
- `Header.jsx` — initial page load entrance animation

---

## Charts — Recharts 3

Recharts renders the aggregate visualizations in the Dashboard view.

```jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={distributionData}>
    <XAxis dataKey="level" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="count" fill="#3b82f6" />
  </BarChart>
</ResponsiveContainer>
```

### Why Recharts
- First-class React integration (no imperative D3 code)
- Responsive container built in
- Composable chart primitives
- Sufficient for bar/pie/radar charts needed in v1

---

## Icons — Lucide React

Lucide React provides SVG icon components. Used statically in JSX components.

```jsx
import { Settings, CheckCircle2, ArrowRight } from "lucide-react";

<Settings size={18} />
<CheckCircle2 size={10} className="text-white" strokeWidth={4} />
```

Dynamic icon rendering (based on a string key) is handled by the custom `Icon.jsx` component:

```jsx
// src/components/Icon.jsx
const iconMap = { ban, user, network, workflow, rocket, warning, ... };
export const Icon = ({ type }) => {
  const IconComponent = iconMap[type];
  return IconComponent ? <IconComponent size={20} /> : null;
};
```

---

## Linting — ESLint 10 (Flat Config)

```js
// eslint.config.js
export default defineConfig([
  globalIgnores(["dist", ".vite"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,  // hooks rules
      reactRefresh.configs.vite,            // React Refresh (HMR)
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
]);
```

### Rules Enforced
- `no-unused-vars` — catches stale imports (RCA-001 prevention)
- `react-hooks/rules-of-hooks` — hooks called at top level only
- `react-hooks/exhaustive-deps` — correct useMemo/useEffect deps
- `react-refresh/only-export-components` — HMR compatibility

---

## CI/CD — GitHub Actions

```yaml
# Two-job pipeline
Lint job:  npm ci → npm run lint
Build job: npm ci → npm run build → upload dist/ artifact

Triggers:
  push:  main, develop, release/**, feat/**, refactor/**, bugfix/**
  PR:    targeting main or develop

Concurrency: cancel in-progress on same ref
Permissions: contents: read (read-only)
```

See [ci.yml](../../.github/workflows/ci.yml) for full config.

---

## Package Versions (Pinned)

```json
"dependencies": {
  "react": "^19.2.5",
  "react-dom": "^19.2.5",
  "framer-motion": "^12.38.0",
  "recharts": "^3.8.1",
  "lucide-react": "^1.14.0",
  "tailwindcss": "^4.3.0",
  "autoprefixer": "^10.5.0",
  "postcss": "^8.5.14"
},
"devDependencies": {
  "vite": "^8.0.10",
  "@vitejs/plugin-react": "^6.0.1",
  "eslint": "^10.2.1",
  "@eslint/js": "^10.0.1",
  "eslint-plugin-react-hooks": "^7.1.1",
  "eslint-plugin-react-refresh": "^0.5.2",
  "globals": "^17.5.0",
  "@tailwindcss/postcss": "^4.3.0",
  "@types/react": "^19.2.14",
  "@types/react-dom": "^19.2.3"
}
```

> Note: `autoprefixer`, `postcss`, and `tailwindcss` are in `dependencies` rather than `devDependencies`. This is non-standard but does not affect build output. Should be corrected in the next package cleanup.

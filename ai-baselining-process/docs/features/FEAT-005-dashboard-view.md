# FEAT-005: Dashboard View

**Status:** Implemented
**PRD:** PRD-004 (referenced), PRD-003 (visual layer)
**Component:** `DashboardView.jsx`
**Data:** `sampleProcesses.js`, `levelConfig.js` (`levelShortLabels`)

---

## Overview

The Dashboard View provides an aggregate visualization of multiple process assessments. It is accessible via the view toggle in the navigation bar (`ViewNav.jsx`) and shows charts summarizing maturity distribution, domain gaps, and top governance risks across a sample dataset of 50 processes.

---

## Navigation

`ViewNav.jsx` renders two tabs: "Survey" and "Dashboard". State is managed by `activeView` in `App.jsx`.

---

## Data Source

`sampleProcesses.js` — a static array of 50 process assessment records, each with:
- `id`, `processName`, `tribe`, `role`, `processType`
- `aiUsage` (maps to maturity level)
- A subset of maturity question fields

The current form state is not yet injected into the dashboard — the dashboard displays the static sample dataset only (v1 scope).

---

## Charts (Recharts)

| Chart | Type | Description |
|-------|------|-------------|
| Maturity Distribution | BarChart | Count of processes per maturity level (L0–L4 + Needs Validation) |
| Level by Tribe | BarChart (stacked or grouped) | Maturity level breakdown per organizational tribe |
| AI Tools Usage | PieChart or BarChart | Frequency of each AI tool across all assessed processes |
| Governance Risks | BarChart | Most commonly flagged governance risks |
| Domain Coverage | Radar or BarChart | Average completion across the 3 domains |

---

## Future Enhancements (Post-v1)

- Inject live form submission into the dataset (requires backend or LocalStorage persistence).
- Filter dashboard by tribe, level, or date.
- Export dashboard as PDF or PNG.
- Show delta from previous assessment (requires versioning).
- Break down by domain (clientCentric, operatingModel, people) using domain-aware fields.

---

## Acceptance Criteria

- [x] Dashboard view renders without errors when "Dashboard" tab is selected
- [x] At least one chart renders with data from `sampleProcesses.js`
- [x] Navigation between Survey and Dashboard preserves form state
- [x] Dashboard does not crash when `form` prop has empty/default values

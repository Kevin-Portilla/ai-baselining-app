# FEAT-003: Domain Cards Matrix

**Status:** Implemented
**PRD:** PRD-005 §4
**Component:** `DomainCards.jsx`
**Data:** `levelConfig.js` (`domains`, `strategicStages`)

---

## Overview

The Domain Cards Matrix is the visual orientation layer at the top of the survey page. It renders a `3 × 3` grid — 3 organizational domains as rows, 3 strategic stages as columns — giving respondents and assessors a full-picture view of where the organization sits across all dimensions simultaneously.

Each cell in the matrix shows the category name and its subcategories, with a green checkmark indicating when a subcategory has at least one answered field.

---

## Layout

```
                  | Sense, Benchmark   | Scale &            | Become a Human-AI  |
                  | & Position         | Differentiate      | Delivery Hub       |
------------------|--------------------|--------------------|--------------------|
Client Centric    | AI Impact to       | AI Impact to       | AI Impact End      |
Approach          | Client             | Customers of       | to End             |
(Business Model)  | • Align w/ Client  | Clients            | • Infinite Led     |
                  | • Identify Opps    | • Co-design        | • AI-Managed       |
------------------|--------------------|--------------------|--------------------|
Operating Model   | Standardization    | Embedded           | Intelligent        |
& Technology      | & Modernization    | Intelligent        | by Design          |
(How we deliver)  | • AI-Readiness     | Automation         | • Secure Platforms |
                  | • Baseline Ops     | • Auto Workflows   | • Tribe Enablement |
                  | • Governance       | • Performance      |                    |
                  | • Secure Envs      |                    |                    |
------------------|--------------------|--------------------|--------------------|
People            | AI Enhances        | Upskilling &       | Superminds         |
(How our people   | People             | Right Sourcing     | (Human + AI)       |
grow & win)       | • Training         | • Staffing         | • Next-Gen Roles   |
                  | • AI Talent        | • Champions        | • Perf Mgmt        |
                  | • Managers         | • Mgr Fluency      | • Leadership       |
```

---

## Completion Indicators

- Each subcategory checks whether its associated `fields` array has any answered values.
- An answered field = non-empty string or non-empty array.
- A green `CheckCircle2` icon appears next to the subcategory name when active.
- The entire domain row is visually active (full opacity, white background cells) if the `domainActive` prop is true for that domain.

---

## Data Source

`levelConfig.js` `domains` array:
```js
{
  id: "clientCentric",
  title: "Client Centric Approach",
  subTitle: "(Business Model)",
  stages: {
    sbp: { category: "...", subcategories: [{ name: "...", fields: ["fieldName1", ...] }] },
    sd: { ... },
    dh: { ... }
  }
}
```

`DomainCards.jsx` iterates `domains` × `strategicStages` to build the grid.

---

## Visual Design

- **Container:** White/80 backdrop-blur card with rounded-[32px] corners, shadow, dark border
- **Stage headers:** Accenture blue (#0052CC) chevron-shaped banners
- **Domain labels:** Dark slate (#0F172A) chevron label with clipped right edge
- **Active cells:** White background, blue-tinted border
- **Inactive cells:** Slate-50 background, reduced opacity, slight grayscale
- **Category headings:** Orange (#EA580C), uppercase, bold
- **Subcategory items:** Arrow indicator (ArrowRight) + text; green CheckCircle when complete

---

## Acceptance Criteria

- [x] 3×3 matrix renders with correct domains and stages
- [x] Chevron-shaped stage headers render correctly
- [x] Subcategory completion indicators update as form fields are answered
- [x] Domain rows activate when any field in that domain is answered
- [x] `sub.fields` array (not `sub.field`) used for completion check (RCA-001 fix)
- [x] No React import warning (removed unused `import React from "react"`)

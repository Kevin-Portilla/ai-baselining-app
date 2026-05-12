# Implementation Plan: PRD-004 Enterprise Assessment Redesign

This plan outlines the steps to migrate the AI Operations Baseline App to the new 5-section global flow and maturity-constrained progression model defined in PRD-004.

## 1. Objectives
- Implement the 5-section survey flow.
- Update process and respondent metadata fields.
- Integrate the Client-Centric Operational Framework (3 Domains, 3 Strategic Stages).
- Implement the "Needs Validation" and "Final Questions" sections.
- Initialize 30+ new form fields.
- Update maturity scoring logic.

## 2. Technical Strategy
- **State Management:** All new fields will be added to the `initialForm` object in `App.jsx`.
- **Component Structure:** Refactor the main `App.jsx` render loop to handle the 5-section flow.
- **Data Model:** Update `PILLAR_QUESTIONS` constant to include the new hierarchical structure.
- **Scoring Engine:** Modify `recommendedClassification` useMemo to incorporate new signals.

## 3. Atomic Tasks

### Phase 1: State & Metadata (Architect/Developer)
- [ ] **Task 1.1:** Initialize all 30+ new form fields in `initialForm`.
- [ ] **Task 1.2:** Update Section 1 (Metadata) select options (Tribe, Role, Frequency, Criticality).
- [ ] **Task 1.3:** Correct Tribe name to "Intelligent Automation".

### Phase 2: Client-Centric Framework Integration (Architect/Developer)
- [ ] **Task 2.1:** Restructure `SECTION_QUESTIONS` in `src/data/questions.js` to map to the 3 Domains and their Subcategories.
- [ ] **Task 2.2:** Update `initialForm` in `src/data/formConfig.js` with new field IDs if necessary.
- [ ] **Task 2.3:** Re-introduce `DomainCards` (formerly DimensionCards) with the 3 new domains.
- [ ] **Task 2.4:** Refactor `SurveyView.jsx` to render questions grouped by Domain and Subcategory.
- [ ] **Task 2.5:** Implement "Needs Validation" and "Final Questions" sets.

### Phase 3: UI & Branching (Developer)
- [ ] **Task 3.1:** Update the main render loop to handle Section 3 (Dynamic Branch), Section 4 (Validation/Evidence), and Section 5 (Final Questions).
- [ ] **Task 3.2:** Implement conditional rendering for Transition & Evidence subsections at each level.
- [ ] **Task 3.3:** Ensure Level 4 correctly shows Evidence instead of Transition.
- [ ] **Task 3.4:** Update `pillarActive` logic to handle the new section triggers.

### Phase 4: Scoring & Verification (Developer/QA)
- [ ] **Task 4.1:** Update maturity scoring logic with new weights and signals.
- [ ] **Task 4.2:** Validate compilation and resolve any alias/import issues.
- [ ] **Task 4.3:** Run linting and ensure zero errors.
- [ ] **Task 4.4:** Perform a full survey walkthrough to verify branching logic.

## 4. Acceptance Criteria
- Matches all requirements in `docs/requirements/PRD-004-enterprise-assessment-redesign.md`.
- No overlap between maturity level option sets.
- Final questions visible only when a path is active.
- Completion percentage reflects the new structure.

## 5. Risks & Mitigations
- **Complexity:** 30+ new fields could lead to state drift. *Mitigation:* Centralized state in `initialForm` with strict prop passing.
- **UI Overflow:** Large question sets might break the corporate layout. *Mitigation:* Use Framer Motion for smooth transitions and scrollable containers if needed.

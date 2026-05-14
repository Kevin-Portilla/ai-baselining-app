# Task Checklist: AI Operations Baseline Assessment

## Phase 1: State & Metadata
- [ ] Task 1.1: Initialize new fields in `initialForm`
- [ ] Task 1.2: Update Metadata select options
- [ ] Task 1.3: Correct Tribe name

## Phase 2: Client-Centric Framework Integration
- [ ] Task 2.1: Restructure `SECTION_QUESTIONS` for 3 Domains
- [ ] Task 2.2: Update `initialForm` with new IDs
- [ ] Task 2.3: Re-introduce `DomainCards` (3 domains)
- [ ] Task 2.4: Refactor `SurveyView` for grouped rendering
- [ ] Task 2.5: Implement Needs Validation & Final Questions

## Phase 3: UI & Branching
- [ ] Task 3.1: Update main render loop for 5-section flow
- [ ] Task 3.2: Implement Transition/Evidence subsections
- [ ] Task 3.3: Handle Level 4 UI specifics
- [ ] Task 3.4: Update `pillarActive` logic

## Phase 4: Scoring & Verification
- [x] Task 4.1: Update maturity scoring logic
- [x] Task 4.2: Validate compilation
- [x] Task 4.3: Run linting
- [ ] Task 4.4: Full survey walkthrough

## Phase 5: PRD-006 Requirements Finalization
- [x] Task 5.1: Capture PRD-006 requirements from meeting notes
- [ ] Task 5.2: Decide whether Not Applicable counts toward completion
- [x] Task 5.3: Document Notes as informational-only
- [ ] Task 5.4: Decide team-level assessment model approach
- [ ] Task 5.5: Decide Services / Products preload source and owner
- [ ] Task 5.6: Confirm Not Applicable / negative response wording
- [x] Task 5.7: Add acceptance criteria for each PRD-006 requirement
- [x] Task 5.8: Document Director and tribe-filtered Services/Products requirements
- [x] Task 5.9: Confirm complete Services/Products list per Tribe
- [ ] Task 5.10: Confirm canonical Tribe labels and legacy Tribe alias handling

## Phase 6: PRD-006 Implementation
- [x] Task 6.1: Add approved metadata fields to `initialForm`
- [x] Task 6.2: Add Services / Products preload options if approved
- [x] Task 6.3: Rename user-facing "Other" to "Notes"
- [x] Task 6.4: Add Not Applicable / negative diagnostic responses
- [x] Task 6.5: Ensure Notes do not affect scoring, branching, classification, completion, dashboard, or recommendations
- [x] Task 6.6: Add team/process scope-aware output labels and export fields
- [x] Task 6.7: Add Service/Product catalog field and fallback behavior
- [ ] Task 6.8: Add unit and smoke tests for PRD-006 behavior
- [x] Task 6.9: Add unit regression tests for Not Applicable scoring and branch stability
- [x] Task 6.10: Add unit regression tests for Notes exclusion from scoring, branching, classification, output, readiness level, and quadrant matching
- [x] Task 6.11: Add unit regression tests for team-level assessment creation, editing, output, and legacy process compatibility
- [x] Task 6.12: Add unit regression tests for Service/Product catalog loading, selection, editing, output persistence, and scoring neutrality
- [x] Task 6.12a: Create frontend-only typed Director and Services/Products catalog config
- [x] Task 6.13: Add Director field and auto-populate it from selected Tribe
- [x] Task 6.14: Replace flat Service/Product options with Tribe-filtered catalog
- [ ] Task 6.15: Display Director and Service/Product in view/edit/details/output surfaces
- [x] Task 6.16: Add regression tests proving Director and Service/Product do not affect scoring, classification, branching, or domain activation

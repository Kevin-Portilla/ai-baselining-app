import test from "node:test";
import assert from "node:assert/strict";

import { buildScoredDiagnosticAnswers, collectNotes, prepareAssessmentOutput } from "./assessmentOutput.js";
import {
  ASSESSMENT_SCOPE_PROCESS,
  ASSESSMENT_SCOPE_TEAM,
  computeAssessmentCompletion,
  getAssessmentTarget,
  isAssessmentContextValid,
} from "./assessmentTarget.js";
import { calculateLevel, computeDomainActive, getCurrentSection } from "./maturity.js";
import {
  LEGACY_OTHER_OPTION,
  NOT_APPLICABLE_OPTION,
  NOTES_OPTION,
  hasPositiveResponse,
  positiveSelections,
  toggleOptionSelection,
  withNotApplicable,
  withNotesOption,
} from "../data/responseOptions.js";
import { initialForm, serviceProductOptions } from "../data/formConfig.js";
import { FINAL_QUESTIONS, NEEDS_VALIDATION_QUESTIONS, SECTION_QUESTIONS } from "../data/questions.js";

test("withNotesOption renames legacy Other options to Notes", () => {
  assert.deepEqual(
    withNotesOption(["A", "B", LEGACY_OTHER_OPTION]),
    ["A", "B", NOTES_OPTION]
  );
});

test("withNotApplicable inserts the option before Notes", () => {
  assert.deepEqual(
    withNotApplicable(["A", "B", NOTES_OPTION]),
    ["A", "B", NOT_APPLICABLE_OPTION, NOTES_OPTION]
  );
});

test("positiveSelections excludes Not Applicable and Notes", () => {
  assert.deepEqual(
    positiveSelections([NOT_APPLICABLE_OPTION, NOTES_OPTION, LEGACY_OTHER_OPTION, "Human validation"]),
    ["Human validation"]
  );
});

test("hasPositiveResponse treats Not Applicable and Notes as non-positive evidence", () => {
  assert.equal(hasPositiveResponse(NOT_APPLICABLE_OPTION), false);
  assert.equal(hasPositiveResponse(NOTES_OPTION), false);
  assert.equal(hasPositiveResponse(LEGACY_OTHER_OPTION), false);
  assert.equal(hasPositiveResponse([NOT_APPLICABLE_OPTION]), false);
  assert.equal(hasPositiveResponse([NOTES_OPTION, LEGACY_OTHER_OPTION]), false);
  assert.equal(hasPositiveResponse("Basic awareness"), true);
});

test("Not Applicable does not satisfy L2 scoring thresholds", () => {
  const form = {
    aiUsage: "AI supports some defined workflow activities",
    omtGovernanceL2: [NOT_APPLICABLE_OPTION, "Validation embedded in workflow"],
    omtAutoWorkflowsL2: [NOT_APPLICABLE_OPTION],
  };

  assert.equal(calculateLevel(form), "2");
});

test("positive evidence still nudges the recommended level", () => {
  const form = {
    aiUsage: "AI supports some defined workflow activities",
    omtGovernanceL2: ["Validation embedded in workflow", "Governance monitored operationally"],
    omtAutoWorkflowsL2: ["Shared operational automation", "Cross-functional orchestration enabled"],
  };

  assert.equal(calculateLevel(form), "3");
});

test("Not Applicable answers do not change branch routing", () => {
  const form = {
    aiUsage: "AI supports some defined workflow activities",
    omtGovernanceL2: [NOT_APPLICABLE_OPTION],
  };

  assert.equal(getCurrentSection(form), "connected");
});

test("toggleOptionSelection keeps Not Applicable mutually exclusive", () => {
  assert.deepEqual(
    toggleOptionSelection(["Human validation", "Audit trail"], NOT_APPLICABLE_OPTION),
    [NOT_APPLICABLE_OPTION]
  );

  assert.deepEqual(
    toggleOptionSelection([NOT_APPLICABLE_OPTION], "Human validation"),
    ["Human validation"]
  );
});

test("toggleOptionSelection keeps Notes informational and legacy-compatible", () => {
  assert.deepEqual(
    toggleOptionSelection(["Human validation"], NOTES_OPTION),
    ["Human validation", NOTES_OPTION]
  );

  assert.deepEqual(
    toggleOptionSelection([LEGACY_OTHER_OPTION, "Human validation"], NOTES_OPTION),
    ["Human validation"]
  );

  assert.deepEqual(
    toggleOptionSelection([NOTES_OPTION, "Human validation"], NOT_APPLICABLE_OPTION),
    [NOTES_OPTION, NOT_APPLICABLE_OPTION]
  );
});

test("Notes do not satisfy scoring thresholds", () => {
  const form = {
    aiUsage: "AI supports some defined workflow activities",
    omtGovernanceL2: [NOTES_OPTION, LEGACY_OTHER_OPTION],
    omtAutoWorkflowsL2: [NOTES_OPTION],
  };

  assert.equal(calculateLevel(form), "2");
});

test("Notes with no positive diagnostic answers do not create maturity evidence", () => {
  const form = {
    aiUsage: "AI supports some defined workflow activities",
    omtGovernanceL2: [NOTES_OPTION],
    omtGovernanceL2Other: "Governance may exist, but the assessor is not sure.",
    omtAutoWorkflowsL2: [LEGACY_OTHER_OPTION],
    omtAutoWorkflowsL2Other: "Automation context needs follow-up.",
  };

  assert.equal(calculateLevel(form), "2");
  assert.deepEqual(computeDomainActive(form), {
    clientCentric: false,
    operatingModel: false,
    people: false,
  });
  assert.deepEqual(buildScoredDiagnosticAnswers(form).omtGovernanceL2, []);
  assert.deepEqual(buildScoredDiagnosticAnswers(form).omtAutoWorkflowsL2, []);
});

test("Notes entered with valid maturity answers do not change recommended classification", () => {
  const baselineForm = {
    aiUsage: "AI supports some defined workflow activities",
    omtGovernanceL2: ["Validation embedded in workflow", "Governance monitored operationally"],
    omtAutoWorkflowsL2: ["Shared operational automation", "Cross-functional orchestration enabled"],
  };
  const notesForm = {
    ...baselineForm,
    omtGovernanceL2: [...baselineForm.omtGovernanceL2, NOTES_OPTION],
    omtGovernanceL2Other: "Evidence source captured for the facilitator.",
    aiLiteracy: NOTES_OPTION,
    aiLiteracyOther: "People context only.",
  };

  assert.equal(calculateLevel(notesForm), calculateLevel(baselineForm));
  assert.equal(prepareAssessmentOutput(notesForm).derived.recommendedLevel, "3");
  assert.deepEqual(
    buildScoredDiagnosticAnswers(notesForm).omtGovernanceL2,
    baselineForm.omtGovernanceL2
  );
  assert.equal(buildScoredDiagnosticAnswers(notesForm).aiLiteracy, "");
});

test("Notes combined with Not Applicable remain unscored output context", () => {
  const form = {
    aiUsage: "AI supports some defined workflow activities",
    omtGovernanceL2: [NOTES_OPTION, NOT_APPLICABLE_OPTION],
    omtGovernanceL2Other: "This governance indicator is out of scope for the team.",
  };
  const output = prepareAssessmentOutput(form);

  assert.equal(output.derived.currentSection, "connected");
  assert.equal(output.derived.recommendedLevel, "2");
  assert.deepEqual(output.diagnosticAnswers.omtGovernanceL2, []);
  assert.deepEqual(output.notes.omtGovernanceL2, {
    field: "omtGovernanceL2Other",
    value: "This governance indicator is out of scope for the team.",
  });
});

test("Notes do not change branch routing or output readiness level", () => {
  const baselineForm = {
    aiUsage: "AI is integrated across multiple workflow steps",
    omtGovernanceL3: ["Multi-stage governance exists", "Governance operationalized"],
  };
  const notesForm = {
    ...baselineForm,
    omtGovernanceL3: [...baselineForm.omtGovernanceL3, NOTES_OPTION],
    omtGovernanceL3Other: "Governance artifacts are under review.",
    operationalAiCapability: LEGACY_OTHER_OPTION,
    operationalAiCapabilityOther: "Capability note.",
  };

  const baselineOutput = prepareAssessmentOutput(baselineForm);
  const notesOutput = prepareAssessmentOutput(notesForm);

  assert.equal(getCurrentSection(notesForm), getCurrentSection(baselineForm));
  assert.equal(notesOutput.derived.recommendedLevel, baselineOutput.derived.recommendedLevel);
  assert.equal(notesOutput.derived.aiReadinessLevel, baselineOutput.derived.aiReadinessLevel);
  assert.equal(notesOutput.derived.maturityScore, baselineOutput.derived.maturityScore);
});

test("exported question option sets no longer expose Other", () => {
  const optionSets = [
    ...Object.values(SECTION_QUESTIONS).flat(),
    ...NEEDS_VALIDATION_QUESTIONS,
    ...FINAL_QUESTIONS,
  ]
    .filter((question) => Array.isArray(question.options))
    .map((question) => question.options);

  assert.equal(optionSets.some((options) => options.includes(LEGACY_OTHER_OPTION)), false);
  assert.equal(optionSets.some((options) => options.includes(NOTES_OPTION)), true);
});

test("creating a team-level assessment is valid without process-specific fields", () => {
  const form = {
    assessmentScope: ASSESSMENT_SCOPE_TEAM,
    teamName: "Client Operations Enablement",
    tribe: "Client Services",
    squad: "AI Enablement",
    role: "Manager / Lead",
    managerName: "Dana Manager",
    serviceProduct: "SecureNow",
    aiUsage: "AI supports some defined workflow activities",
  };

  assert.equal(isAssessmentContextValid(form), true);
  assert.deepEqual(getAssessmentTarget(form), {
    scope: ASSESSMENT_SCOPE_TEAM,
    label: "Client Operations Enablement",
    isTeam: true,
    teamName: "Client Operations Enablement",
    area: "",
    tribe: "Client Services",
    squad: "AI Enablement",
    managerName: "Dana Manager",
    serviceProduct: "SecureNow",
    processName: "",
  });
  assert.equal(calculateLevel(form), "2");
  assert.equal(computeAssessmentCompletion(form), 100);
});

test("editing a team-level assessment updates the evaluated target", () => {
  const form = {
    assessmentScope: ASSESSMENT_SCOPE_TEAM,
    teamName: "Original Team",
    area: "Managed Operations",
    tribe: "Client Services",
  };
  const edited = {
    ...form,
    teamName: "Platform Operations",
    squad: "Automation Squad",
  };

  assert.equal(getAssessmentTarget(form).label, "Original Team");
  assert.equal(getAssessmentTarget(edited).label, "Platform Operations");
  assert.equal(isAssessmentContextValid(edited), true);
});

test("team-level assessment output identifies the evaluated team", () => {
  const form = {
    assessmentScope: ASSESSMENT_SCOPE_TEAM,
    teamName: "Platform Operations",
    area: "Managed Operations",
    tribe: "Infrastructure Services",
    squad: "Automation Squad",
    managerName: "Morgan Lead",
    serviceProduct: "Cloud Operations",
    processName: "",
    aiUsage: "AI is integrated across multiple workflow steps",
    omtGovernanceL3: ["Multi-stage governance exists", "Governance operationalized", "Real-time adaptive governance enabled"],
  };
  const output = prepareAssessmentOutput(form);

  assert.equal(output.metadata.assessmentScope, ASSESSMENT_SCOPE_TEAM);
  assert.equal(output.metadata.assessmentTarget, "Platform Operations");
  assert.equal(output.metadata.processName, "");
  assert.equal(output.derived.assessmentTarget.scope, ASSESSMENT_SCOPE_TEAM);
  assert.equal(output.derived.assessmentTarget.label, "Platform Operations");
  assert.equal(output.derived.assessmentContextValid, true);
  assert.equal(output.derived.recommendedLevel, "4");
});

test("legacy process-level records remain compatible without assessmentScope", () => {
  const legacyForm = {
    processName: "Invoice Validation",
    tribe: "Professional Services",
    aiUsage: "AI supports some defined workflow activities",
  };
  const output = prepareAssessmentOutput(legacyForm);

  assert.equal(getAssessmentTarget(legacyForm).scope, ASSESSMENT_SCOPE_PROCESS);
  assert.equal(getAssessmentTarget(legacyForm).label, "Invoice Validation");
  assert.equal(isAssessmentContextValid(legacyForm), true);
  assert.equal(output.metadata.assessmentScope, ASSESSMENT_SCOPE_PROCESS);
  assert.equal(output.metadata.assessmentTarget, "Invoice Validation");
  assert.equal(output.derived.recommendedLevel, "2");
});

test("explicit process-level assessments still require process name as context", () => {
  assert.equal(
    isAssessmentContextValid({
      assessmentScope: ASSESSMENT_SCOPE_PROCESS,
      teamName: "Client Operations",
      aiUsage: "AI is used informally by individuals",
    }),
    false
  );

  assert.equal(
    isAssessmentContextValid({
      assessmentScope: ASSESSMENT_SCOPE_PROCESS,
      processName: "Client Reporting",
      aiUsage: "AI is used informally by individuals",
    }),
    true
  );
});

test("service/product options load from local catalog configuration", () => {
  assert.equal(Array.isArray(serviceProductOptions), true);
  assert.ok(serviceProductOptions.includes("SecureNow"));
  assert.ok(serviceProductOptions.includes("Unlisted / Not sure"));
  assert.equal(new Set(serviceProductOptions).size, serviceProductOptions.length);
});

test("selecting a service/product is saved with the assessment output", () => {
  const form = {
    ...initialForm,
    teamName: "Client Operations Enablement",
    tribe: "Client Services",
    area: "Managed Operations",
    serviceProduct: "SecureNow",
    aiUsage: "AI supports some defined workflow activities",
  };
  const output = prepareAssessmentOutput(form);

  assert.equal(output.metadata.serviceProduct, "SecureNow");
  assert.equal(output.metadata.teamName, "Client Operations Enablement");
  assert.equal(output.metadata.area, "Managed Operations");
  assert.equal(output.metadata.tribe, "Client Services");
  assert.equal(output.derived.assessmentTarget.serviceProduct, "SecureNow");
});

test("editing an existing service/product selection updates output without changing target identity", () => {
  const form = {
    ...initialForm,
    teamName: "Client Operations Enablement",
    serviceProduct: "SecureNow",
    aiUsage: "AI supports some defined workflow activities",
  };
  const edited = {
    ...form,
    serviceProduct: "Cloud Operations",
  };

  assert.equal(prepareAssessmentOutput(form).metadata.serviceProduct, "SecureNow");
  assert.equal(prepareAssessmentOutput(edited).metadata.serviceProduct, "Cloud Operations");
  assert.equal(getAssessmentTarget(edited).label, "Client Operations Enablement");
});

test("service/product selection does not affect maturity scoring", () => {
  const baselineForm = {
    ...initialForm,
    teamName: "Client Operations Enablement",
    aiUsage: "AI supports some defined workflow activities",
    omtGovernanceL2: ["Validation embedded in workflow", "Governance monitored operationally"],
    omtAutoWorkflowsL2: ["Shared operational automation", "Cross-functional orchestration enabled"],
  };
  const secureNowForm = {
    ...baselineForm,
    serviceProduct: "SecureNow",
  };
  const cloudOpsForm = {
    ...baselineForm,
    serviceProduct: "Cloud Operations",
  };

  assert.equal(calculateLevel(secureNowForm), calculateLevel(baselineForm));
  assert.equal(calculateLevel(cloudOpsForm), calculateLevel(baselineForm));
  assert.equal(prepareAssessmentOutput(secureNowForm).derived.recommendedLevel, "3");
  assert.equal(prepareAssessmentOutput(cloudOpsForm).derived.recommendedLevel, "3");
});

test("tribe, director, and service/product changes do not affect scoring or branch outputs", () => {
  const baselineForm = {
    ...initialForm,
    assessmentScope: ASSESSMENT_SCOPE_TEAM,
    teamName: "Client Operations Enablement",
    aiUsage: "AI supports some defined workflow activities",
    omtGovernanceL2: ["Validation embedded in workflow", "Governance monitored operationally"],
    omtAutoWorkflowsL2: ["Shared operational automation", "Cross-functional orchestration enabled"],
  };
  const metadataVariants = [
    {
      ...baselineForm,
      tribe: "Client Services Tribe",
      director: "Andrey Brenes",
      serviceProduct: "Unlisted / Not sure",
    },
    {
      ...baselineForm,
      tribe: "Automation Tribe",
      director: "Jonathan Herrera",
      serviceProduct: "Architect; ROBO",
    },
    {
      ...baselineForm,
      tribe: "Infrastructure Tribe",
      director: "Fernando Golcher",
      serviceProduct: "Cloud Operations",
    },
    {
      ...baselineForm,
      tribe: "Development Tribe",
      director: "Laura Monge",
      serviceProduct: "Platform Engineering",
    },
  ];

  for (const variant of metadataVariants) {
    assert.equal(getCurrentSection(variant), getCurrentSection(baselineForm));
    assert.equal(calculateLevel(variant), calculateLevel(baselineForm));
    assert.deepEqual(computeDomainActive(variant), computeDomainActive(baselineForm));

    const baselineOutput = prepareAssessmentOutput(baselineForm);
    const variantOutput = prepareAssessmentOutput(variant);
    assert.equal(variantOutput.derived.currentSection, baselineOutput.derived.currentSection);
    assert.equal(variantOutput.derived.recommendedLevel, baselineOutput.derived.recommendedLevel);
    assert.equal(variantOutput.derived.aiReadinessLevel, baselineOutput.derived.aiReadinessLevel);
    assert.equal(variantOutput.derived.maturityScore, baselineOutput.derived.maturityScore);
    assert.deepEqual(variantOutput.derived.domainActive, baselineOutput.derived.domainActive);
  }
});

test("director and service/product are not diagnostic answers", () => {
  const form = {
    ...initialForm,
    tribe: "Professional Services",
    director: "Adrian Duarte",
    serviceProduct: "Unlisted / Not sure",
    aiUsage: "AI is used informally by individuals",
  };
  const output = prepareAssessmentOutput(form);

  assert.equal(Object.hasOwn(output.diagnosticAnswers, "tribe"), false);
  assert.equal(Object.hasOwn(output.diagnosticAnswers, "director"), false);
  assert.equal(Object.hasOwn(output.diagnosticAnswers, "serviceProduct"), false);
});

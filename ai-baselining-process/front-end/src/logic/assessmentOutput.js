import { FINAL_QUESTIONS, NEEDS_VALIDATION_QUESTIONS, SECTION_QUESTIONS } from "../data/questions.js";
import { hasPositiveResponse, positiveSelections } from "../data/responseOptions.js";
import { getAssessmentTarget, isAssessmentContextValid } from "./assessmentTarget.js";
import { calculateLevel, computeDomainActive, getCurrentSection } from "./maturity.js";

const questionList = [
  ...Object.values(SECTION_QUESTIONS).flat(),
  ...NEEDS_VALIDATION_QUESTIONS,
  ...FINAL_QUESTIONS,
];

const diagnosticQuestions = questionList.filter((question) => question.field);

function scoredValue(value) {
  if (Array.isArray(value)) {
    return positiveSelections(value);
  }

  return hasPositiveResponse(value) ? value : "";
}

export function collectNotes(form) {
  return Object.fromEntries(
    diagnosticQuestions
      .filter((question) => question.otherField && form[question.otherField])
      .map((question) => [
        question.field,
        {
          field: question.otherField,
          value: form[question.otherField],
        },
      ])
  );
}

export function buildScoredDiagnosticAnswers(form) {
  return Object.fromEntries(
    diagnosticQuestions.map((question) => [
      question.field,
      scoredValue(form[question.field]),
    ])
  );
}

export function prepareAssessmentOutput(form) {
  const currentSection = getCurrentSection(form);
  const recommendedLevel = calculateLevel(form);
  const assessmentTarget = getAssessmentTarget(form);

  return {
    metadata: {
      assessmentScope: assessmentTarget.scope,
      assessmentTarget: assessmentTarget.label,
      teamName: assessmentTarget.teamName,
      area: assessmentTarget.area,
      tribe: form.tribe || "",
      squad: assessmentTarget.squad,
      role: form.role || "",
      managerName: assessmentTarget.managerName,
      serviceProduct: assessmentTarget.serviceProduct,
      processName: form.processName || "",
      processDescription: form.processDescription || "",
      processType: form.processType || "",
      frequency: form.frequency || "",
      criticality: form.criticality || "",
      clientData: form.clientData || "",
      mainSystems: form.mainSystems || "",
    },
    diagnosticAnswers: buildScoredDiagnosticAnswers(form),
    notes: collectNotes(form),
    derived: {
      assessmentTarget,
      assessmentContextValid: isAssessmentContextValid(form),
      currentSection,
      recommendedLevel,
      aiReadinessLevel: recommendedLevel,
      maturityScore: recommendedLevel,
      domainActive: computeDomainActive(form),
    },
  };
}

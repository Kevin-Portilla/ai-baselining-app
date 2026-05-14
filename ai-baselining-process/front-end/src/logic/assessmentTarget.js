export const ASSESSMENT_SCOPE_TEAM = "Team";
export const ASSESSMENT_SCOPE_PROCESS = "Process";

export function normalizeAssessmentScope(form = {}) {
  if (form.assessmentScope === ASSESSMENT_SCOPE_TEAM || form.assessmentScope === ASSESSMENT_SCOPE_PROCESS) {
    return form.assessmentScope;
  }

  return form.processName && !form.teamName ? ASSESSMENT_SCOPE_PROCESS : ASSESSMENT_SCOPE_TEAM;
}

export function getAssessmentTarget(form = {}) {
  const scope = normalizeAssessmentScope(form);
  const isTeam = scope === ASSESSMENT_SCOPE_TEAM;
  const label = isTeam
    ? form.teamName || form.squad || form.area || form.tribe || "Unnamed team"
    : form.processName || "Unnamed process";

  return {
    scope,
    label,
    isTeam,
    teamName: form.teamName || "",
    area: form.area || "",
    tribe: form.tribe || "",
    squad: form.squad || "",
    managerName: form.managerName || "",
    serviceProduct: form.serviceProduct || "",
    processName: form.processName || "",
  };
}

export function isAssessmentContextValid(form = {}) {
  const target = getAssessmentTarget(form);

  if (target.isTeam) {
    return Boolean(target.teamName || target.squad || target.area || target.tribe);
  }

  return Boolean(target.processName);
}

export function computeAssessmentCompletion(form = {}) {
  const target = getAssessmentTarget(form);
  const primaryFields = target.isTeam
    ? [
        form.assessmentScope,
        form.tribe,
        form.teamName || form.squad || form.area,
        form.role,
        form.managerName,
        form.serviceProduct,
        form.aiUsage,
      ]
    : [
        form.assessmentScope,
        form.tribe,
        form.role,
        form.processName,
        form.processType,
        form.frequency,
        form.criticality,
        form.aiUsage,
      ];

  return Math.round((primaryFields.filter(Boolean).length / primaryFields.length) * 100);
}

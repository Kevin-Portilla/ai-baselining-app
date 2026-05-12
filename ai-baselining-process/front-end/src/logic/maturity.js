// ── maturity.js — getCurrentSection() and calculateLevel() ───────────────────

import { usageToLevel } from "@/data/levelConfig";

export function getCurrentSection(form) {
  const level = usageToLevel[form.aiUsage];
  if (!form.aiUsage) return "screening";
  if (level === "0") return "no-ai";
  if (level === "1") return "individual";
  if (level === "2") return "connected";
  if (level === "3") return "orchestrated";
  if (level === "4") return "adaptive";
  return "needs-validation";
}

export function calculateLevel(form) {
  if (form.maturityOverride) return form.maturityOverride;
  const base = usageToLevel[form.aiUsage];
  if (!base || base === "needs-validation") return "needs-validation";

  let score = Number(base);
  if (form.consistentValidation === "Yes — consistently" && score < 3) score += 0.5;
  if (form.measurableImpactL2 === "Measured operational improvements" && score < 3) score += 0.5;
  if ((form.governanceControlsL3 || []).length >= 4 && score < 4) score += 0.5;
  if ((form.advancedTechCapabilities || []).length >= 4 && score < 4) score += 0.5;
  const l3CcaAnswered = [form.ccaAlignPrioritiesL3, form.ccaCodesignL3, form.ccaInfiniteLedL3, form.ccaAiDeliveryL3, form.ccaGovControlsL3].filter(Boolean).length;
  if (l3CcaAnswered >= 3 && score < 3) score += 0.5;

  return String(Math.min(4, Math.round(score)));
}

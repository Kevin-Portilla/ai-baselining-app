// ── maturity.js — getCurrentSection() and calculateLevel() ───────────────────

import { usageToLevel } from "../data/levelConfig.js";
import { hasPositiveResponse, positiveSelections } from "../data/responseOptions.js";

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
  // Governance at L2 → nudge toward L3
  if (positiveSelections(form.omtGovernanceL2).length >= 2 && score < 3) score += 0.5;
  // Automation at L2 → nudge toward L3
  if (positiveSelections(form.omtAutoWorkflowsL2).length >= 2 && score < 3) score += 0.5;
  // Governance at L3 → nudge toward L4
  if (positiveSelections(form.omtGovernanceL3).length >= 3 && score < 4) score += 0.5;
  // Advanced tech at L4
  if (positiveSelections(form.omtTechCapL4).length >= 4 && score < 4) score += 0.5;
  // Connected systems at L3
  if (positiveSelections(form.omtConnectedSystemsL3).length >= 4 && score < 3) score += 0.5;

  return String(Math.min(4, Math.round(score)));
}

const arr = positiveSelections;

export function computeDomainActive(form) {
  return {
    clientCentric: !!(arr(form.ccaAlignPrioritiesL0).length || arr(form.ccaAlignPrioritiesL1).length || arr(form.ccaAlignPrioritiesL2).length || arr(form.ccaAlignPrioritiesL3).length || arr(form.ccaAlignPrioritiesL4).length || arr(form.ccaIdentifyOppsL0).length || arr(form.ccaIdentifyOppsL1).length || arr(form.ccaIdentifyOppsL2).length || arr(form.ccaIdentifyOppsL3).length || arr(form.ccaIdentifyOppsL4).length || arr(form.ccaCodesignL0).length || arr(form.ccaCodesignL1).length || arr(form.ccaCodesignL2).length || arr(form.ccaCodesignL3).length || arr(form.ccaCodesignL4).length || arr(form.ccaIpAssetsL0).length || arr(form.ccaIpAssetsL1).length || arr(form.ccaIpAssetsL2).length || arr(form.ccaIpAssetsL3).length || arr(form.ccaIpAssetsL4).length || arr(form.ccaDeliveryL0).length || arr(form.ccaDeliveryL1).length || arr(form.ccaDeliveryL2).length || arr(form.ccaDeliveryL3).length || arr(form.ccaDeliveryL4).length),
    operatingModel: !!(arr(form.omtBarriersL0).length || arr(form.omtBaselineL0).length || arr(form.omtGovernanceL0).length || arr(form.omtSecureL0).length || arr(form.omtAutoWorkflowsL0).length || arr(form.omtPerformanceL0).length || arr(form.omtPlatformsL0).length || arr(form.omtTribesL0).length || arr(form.omtToolsUsedL1).length || arr(form.omtStandardL1).length || arr(form.omtBaselineL1).length || arr(form.omtGovernanceL1).length || arr(form.omtSecureL1).length || arr(form.omtStandardL2).length || arr(form.omtBaselineL2).length || arr(form.omtGovernanceL2).length || arr(form.omtAutoWorkflowsL2).length || arr(form.omtPerformanceL2).length || arr(form.omtReusableAssetsL2).length || arr(form.omtStandardL3).length || arr(form.omtGovernanceL3).length || arr(form.omtConnectedSystemsL3).length || arr(form.omtAutoWorkflowsL3).length || arr(form.omtPerformanceL3).length || arr(form.omtTechCapL4).length || arr(form.omtGovernanceL4).length || arr(form.omtAutoWorkflowsL4).length),
    people: !!(hasPositiveResponse(form.aiAwareness) || arr(form.adoptionBarriers).length || hasPositiveResponse(form.aiLiteracy) || arr(form.broaderAdoptionBarriers).length || hasPositiveResponse(form.automationMaturity) || hasPositiveResponse(form.evaluatingQuality) || arr(form.remainingBarriersL2).length || hasPositiveResponse(form.operationalAiCapability) || hasPositiveResponse(form.limitationsRiskEval) || hasPositiveResponse(form.preparednessAdaptive) || hasPositiveResponse(form.improvingAiDecisions)),
  };
}

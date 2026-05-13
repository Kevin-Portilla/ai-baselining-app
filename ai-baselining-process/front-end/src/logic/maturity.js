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

  const arr = (v) => (Array.isArray(v) ? v : []);
  let score = Number(base);
  // Governance at L2 → nudge toward L3
  if (arr(form.omtGovernanceL2).length >= 2 && score < 3) score += 0.5;
  // Automation at L2 → nudge toward L3
  if (arr(form.omtAutoWorkflowsL2).length >= 2 && score < 3) score += 0.5;
  // Governance at L3 → nudge toward L4
  if (arr(form.omtGovernanceL3).length >= 3 && score < 4) score += 0.5;
  // Advanced tech at L4
  if (arr(form.omtTechCapL4).length >= 4 && score < 4) score += 0.5;
  // Connected systems at L3
  if (arr(form.omtConnectedSystemsL3).length >= 4 && score < 3) score += 0.5;

  return String(Math.min(4, Math.round(score)));
}

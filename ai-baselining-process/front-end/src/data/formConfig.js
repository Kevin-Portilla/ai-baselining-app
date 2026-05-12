// ── formConfig.js — initial state and options ────────────────────────────────

export const initialForm = {
  // Section 1: Respondent & Process Metadata
  tribe: "",
  role: "",
  processType: "",
  processName: "",
  frequency: "",
  clientData: "",
  mainSystems: "",
  processDescription: "",
  criticality: "",

  // Section 2: Screening
  aiUsage: "",

  // Section 3 & 4: Maturity Questions (Unified IDs for branching)
  
  // ── Level 0 ──────────────────────────────────────────────────────────────
  // People
  aiAwareness: "",          aiAwarenessOther: "",
  adoptionBarriers: [],     adoptionBarriersOther: "",
  // Client Centric Approach — Sense, Benchmark & Position
  ccaAlignPrioritiesL0: "", ccaAlignPrioritiesL0Other: "",
  ccaIdentifyOppsL0: "",    ccaIdentifyOppsL0Other: "",
  // Client Centric Approach — Scale & Differentiate
  ccaCodesignL0: "",        ccaCodesignL0Other: "",
  ccaIpAssetsL0: "",        ccaIpAssetsL0Other: "",
  // Client Centric Approach — Become a Human-AI Delivery Hub
  ccaInfiniteLedL0: "",     ccaInfiniteLedL0Other: "",
  ccaAiDeliveryL0: "",      ccaAiDeliveryL0Other: "",
  // Client Centric Approach — Operational Enablers
  ccaGovControlsL0: "",     ccaGovControlsL0Other: "",
  ccaToolingL0: "",         ccaToolingL0Other: "",
  ccaRolesOpsL0: "",        ccaRolesOpsL0Other: "",
  // Operating Model
  evidenceL0: "",

  // ── Level 1 ──────────────────────────────────────────────────────────────
  // People
  aiLiteracy: "",               aiLiteracyOther: "",
  equipManagers: "",            equipManagersOther: "",
  broaderAdoptionBarriers: [],  broaderAdoptionBarriersOther: "",
  // Client Centric Approach — Sense, Benchmark & Position
  ccaAlignPrioritiesL1: "",     ccaAlignPrioritiesL1Other: "",
  ccaIdentifyOppsL1: "",        ccaIdentifyOppsL1Other: "",
  // Client Centric Approach — Scale & Differentiate
  ccaCodesignL1: "",            ccaCodesignL1Other: "",
  ccaIpAssetsL1: "",            ccaIpAssetsL1Other: "",
  // Client Centric Approach — Become a Human-AI Delivery Hub
  ccaInfiniteLedL1: "",         ccaInfiniteLedL1Other: "",
  ccaAiDeliveryL1: "",          ccaAiDeliveryL1Other: "",
  // Client Centric Approach — Operational Enablers
  ccaGovControlsL1: "",         ccaGovControlsL1Other: "",
  ccaToolingL1: "",             ccaToolingL1Other: "",
  ccaRolesOpsL1: "",            ccaRolesOpsL1Other: "",
  // Operating Model
  outputValidationL1: "",       outputValidationL1Other: "",
  aiToolsUsed: [],              aiToolsUsedOther: "",
  infoSecurityClearance: "",    infoSecurityClearanceOther: "",
  governanceRisksL1: [],        governanceRisksL1Other: "",
  evidenceL1: "",

  // ── Level 2 ──────────────────────────────────────────────────────────────
  // People
  automationMaturity: "",    automationMaturityOther: "",
  evaluatingQuality: "",     evaluatingQualityOther: "",
  remainingBarriersL2: [],   remainingBarriersL2Other: "",
  // Client Centric Approach — Sense, Benchmark & Position
  ccaAlignPrioritiesL2: "",  ccaAlignPrioritiesL2Other: "",
  ccaIdentifyOppsL2: "",     ccaIdentifyOppsL2Other: "",
  // Client Centric Approach — Scale & Differentiate
  ccaCodesignL2: "",         ccaCodesignL2Other: "",
  ccaIpAssetsL2: "",         ccaIpAssetsL2Other: "",
  // Client Centric Approach — Become a Human-AI Delivery Hub
  ccaInfiniteLedL2: "",      ccaInfiniteLedL2Other: "",
  ccaAiDeliveryL2: "",       ccaAiDeliveryL2Other: "",
  // Client Centric Approach — Operational Enablers
  ccaGovControlsL2: "",      ccaGovControlsL2Other: "",
  ccaToolingL2: "",          ccaToolingL2Other: "",
  ccaRolesOpsL2: "",         ccaRolesOpsL2Other: "",
  // Operating Model
  aiGovernanceL2: "",        aiGovernanceL2Other: "",
  sensitiveDataHandling: "", sensitiveDataHandlingOther: "",
  consistentValidation: "",  consistentValidationOther: "",
  reusableAssetsL2: [],      reusableAssetsL2Other: "",
  measurableImpactL2: "",    measurableImpactL2Other: "",
  improvedAreasL2: [],       improvedAreasL2Other: "",
  evidenceL2: "",

  // ── Level 3 ──────────────────────────────────────────────────────────────
  // People
  operationalAiCapability: "",      operationalAiCapabilityOther: "",
  limitationsRiskEval: "",          limitationsRiskEvalOther: "",
  // Client Centric Approach — Sense, Benchmark & Position
  ccaAlignPrioritiesL3: "",         ccaAlignPrioritiesL3Other: "",
  ccaIdentifyOppsL3: "",            ccaIdentifyOppsL3Other: "",
  // Client Centric Approach — Scale & Differentiate
  ccaCodesignL3: "",                ccaCodesignL3Other: "",
  ccaIpAssetsL3: "",                ccaIpAssetsL3Other: "",
  // Client Centric Approach — Become a Human-AI Delivery Hub
  ccaInfiniteLedL3: "",             ccaInfiniteLedL3Other: "",
  ccaAiDeliveryL3: "",              ccaAiDeliveryL3Other: "",
  // Client Centric Approach — Operational Enablers
  ccaGovControlsL3: "",             ccaGovControlsL3Other: "",
  ccaToolingL3: "",                 ccaToolingL3Other: "",
  ccaRolesOpsL3: "",                ccaRolesOpsL3Other: "",
  // Operating Model
  connectedSystems: [],             connectedSystemsOther: "",
  operationalImpactMeasurement: "", operationalImpactMeasurementOther: "",
  governanceControlsL3: [],         governanceControlsL3Other: "",
  auditableOutputs: "",             auditableOutputsOther: "",
  riskManagementL3: "",             riskManagementL3Other: "",
  approvalCriteria: "",             approvalCriteriaOther: "",
  reusableCapabilitiesL3: [],       reusableCapabilitiesL3Other: "",
  environmentReliability: "",       environmentReliabilityOther: "",
  impactMetricsL3: [],              impactMetricsL3Other: "",
  performanceMonitoringL3: "",      performanceMonitoringL3Other: "",
  missingForAdaptive: [],           missingForAdaptiveOther: "",
  evidenceL3: "",

  // ── Level 4 ──────────────────────────────────────────────────────────────
  // People
  preparednessAdaptive: "",     preparednessAdaptiveOther: "",
  improvingAiDecisions: "",     improvingAiDecisionsOther: "",
  // Client Centric Approach — Sense, Benchmark & Position
  ccaAlignPrioritiesL4: "",     ccaAlignPrioritiesL4Other: "",
  ccaIdentifyOppsL4: "",        ccaIdentifyOppsL4Other: "",
  // Client Centric Approach — Scale & Differentiate
  ccaCodesignL4: "",            ccaCodesignL4Other: "",
  ccaIpAssetsL4: "",            ccaIpAssetsL4Other: "",
  // Client Centric Approach — Become a Human-AI Delivery Hub
  ccaInfiniteLedL4: "",         ccaInfiniteLedL4Other: "",
  ccaAiDeliveryL4: "",          ccaAiDeliveryL4Other: "",
  // Client Centric Approach — Operational Enablers
  ccaGovControlsL4: "",         ccaGovControlsL4Other: "",
  ccaToolingL4: "",             ccaToolingL4Other: "",
  ccaRolesOpsL4: "",            ccaRolesOpsL4Other: "",
  // Operating Model
  advancedTechCapabilities: [], advancedTechCapabilitiesOther: "",
  humanOversightRequired: [],   humanOversightRequiredOther: "",
  advancedGovernanceL4: [],     advancedGovernanceL4Other: "",
  continuousMonitoringL4: "",   continuousMonitoringL4Other: "",
  humanOverrideMechanism: "",   humanOverrideMechanismOther: "",
  escalationPathsL4: "",        escalationPathsL4Other: "",
  platformAdaptivity: "",       platformAdaptivityOther: "",
  evidenceL4: "",

  // Needs Validation Path
  validationUncertainty: "", validationUncertaintyOther: "",
  aiOutputsSeen: "",         aiOutputsSeenOther: "",
  validationContact: "",
  reviewRequired: "",        reviewRequiredOther: "",
  validationContext: "",
};

export const tribes = [
  "Compliance",
  "Intelligent Automation",
  "Customer Experience",
  "Data & Analytics",
  "Risk Management",
  "Operations",
  "Technology",
  "Implementation",
  "Client Services",
  "Development",
  "Professional Services",
  "Infrastructure",
  "Other",
];

export const roleTypes = [
  "Process Owner",
  "SME (Subject Matter Expert)",
  "Business Analyst",
  "Operations Associate",
  "Manager / Lead",
  "Other",
];

export const processTypeOptions = [
  "Data Entry & Validation",
  "Report Generation",
  "Decision Support / Underwriting",
  "Customer Communication",
  "Monitoring & Alerting",
  "Complex Analysis",
  "Software Development / Testing",
  "Other",
];

export const frequencies = [
  "Real-time / Continuous",
  "Daily",
  "Weekly",
  "Monthly",
  "Ad-hoc",
];

export const criticalityOptions = [
  "Critical (Direct client/financial/regulatory impact)",
  "High (Significant operational impact)",
  "Medium (Moderate impact)",
  "Low (Minor/Internal impact)",
];

export const clientDataOptions = [
  "Yes — contains PII/Sensitive data",
  "No — internal/public data only",
  "Unsure",
];

export const aiUsageOptions = [
  "No AI usage identified",
  "AI is used informally by individuals",
  "AI supports some defined workflow activities",
  "AI is integrated across multiple workflow steps",
  "AI operates adaptive or autonomous activities",
  "Not sure",
];

export const criticalities = [
  "Low",
  "Medium",
  "High",
  "Critical",
];

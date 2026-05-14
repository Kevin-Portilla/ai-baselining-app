// ── formConfig.js — initial state and options ────────────────────────────────

export const initialForm = {
  // Section 1: Assessment Target, Respondent & Supporting Process Metadata
  assessmentScope: "Team",
  teamName: "",
  area: "",
  tribe: "",
  director: "",
  squad: "",
  role: "",
  serviceProduct: "",
  processType: "",
  processName: "",
  managerName: "",
  smeName: "",
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
  ccaDeliveryL0: "",        ccaDeliveryL0Other: "",
  // Operating Model — L0
  omtBarriersL0: [],       omtBarriersL0Other: "",
  omtVisibilityL0: [],     omtVisibilityL0Other: "",
  omtBaselineL0: [],       omtBaselineL0Other: "",
  omtGovernanceL0: [],     omtGovernanceL0Other: "",
  omtSecureL0: [],         omtSecureL0Other: "",
  omtAutoWorkflowsL0: [],  omtAutoWorkflowsL0Other: "",
  omtPerformanceL0: [],    omtPerformanceL0Other: "",
  omtPlatformsL0: [],      omtPlatformsL0Other: "",
  omtTribesL0: [],         omtTribesL0Other: "",
  evidenceL0: "",

  // ── Level 1 ──────────────────────────────────────────────────────────────
  // People
  aiLiteracy: "",               aiLiteracyOther: "",
  equipManagers: "",            equipManagersOther: "",
  broaderAdoptionBarriers: [],  broaderAdoptionBarriersOther: "",
  // Client Centric Approach — Sense, Benchmark & Position
  ccaAlignPrioritiesL1: [],     ccaAlignPrioritiesL1Other: "",
  ccaIdentifyOppsL1: [],        ccaIdentifyOppsL1Other: "",
  // Client Centric Approach — Scale & Differentiate
  ccaCodesignL1: [],            ccaCodesignL1Other: "",
  ccaIpAssetsL1: [],            ccaIpAssetsL1Other: "",
  // Client Centric Approach — Become a Human-AI Delivery Hub
  ccaDeliveryL1: [],            ccaDeliveryL1Other: "",
  // Operating Model — L1
  omtToolsUsedL1: [],      omtToolsUsedL1Other: "",
  omtStandardL1: [],       omtStandardL1Other: "",
  omtBaselineL1: [],       omtBaselineL1Other: "",
  omtGovernanceL1: [],     omtGovernanceL1Other: "",
  omtSecureL1: [],         omtSecureL1Other: "",
  omtAutoWorkflowsL1: [],  omtAutoWorkflowsL1Other: "",
  omtPerformanceL1: [],    omtPerformanceL1Other: "",
  omtPlatformsL1: [],      omtPlatformsL1Other: "",
  omtTribesL1: [],         omtTribesL1Other: "",
  evidenceL1: "",

  // ── Level 2 ──────────────────────────────────────────────────────────────
  // People
  automationMaturity: "",    automationMaturityOther: "",
  evaluatingQuality: "",     evaluatingQualityOther: "",
  remainingBarriersL2: [],   remainingBarriersL2Other: "",
  // Client Centric Approach — Sense, Benchmark & Position
  ccaAlignPrioritiesL2: [],  ccaAlignPrioritiesL2Other: "",
  ccaIdentifyOppsL2: [],     ccaIdentifyOppsL2Other: "",
  // Client Centric Approach — Scale & Differentiate
  ccaCodesignL2: [],         ccaCodesignL2Other: "",
  ccaIpAssetsL2: [],         ccaIpAssetsL2Other: "",
  // Client Centric Approach — Become a Human-AI Delivery Hub
  ccaDeliveryL2: [],         ccaDeliveryL2Other: "",
  // Operating Model — L2
  omtStandardL2: [],        omtStandardL2Other: "",
  omtBaselineL2: [],        omtBaselineL2Other: "",
  omtGovernanceL2: [],      omtGovernanceL2Other: "",
  omtSecureL2: [],          omtSecureL2Other: "",
  omtAutoWorkflowsL2: [],   omtAutoWorkflowsL2Other: "",
  omtPerformanceL2: [],     omtPerformanceL2Other: "",
  omtPlatformsL2: [],       omtPlatformsL2Other: "",
  omtReusableAssetsL2: [],  omtReusableAssetsL2Other: "",
  omtTribesL2: [],          omtTribesL2Other: "",
  evidenceL2: "",

  // ── Level 3 ──────────────────────────────────────────────────────────────
  // People
  operationalAiCapability: "",      operationalAiCapabilityOther: "",
  limitationsRiskEval: "",          limitationsRiskEvalOther: "",
  // Client Centric Approach — Sense, Benchmark & Position
  ccaAlignPrioritiesL3: [],         ccaAlignPrioritiesL3Other: "",
  ccaIdentifyOppsL3: [],            ccaIdentifyOppsL3Other: "",
  // Client Centric Approach — Scale & Differentiate
  ccaCodesignL3: [],                ccaCodesignL3Other: "",
  ccaIpAssetsL3: [],                ccaIpAssetsL3Other: "",
  // Client Centric Approach — Become a Human-AI Delivery Hub
  ccaDeliveryL3: [],                ccaDeliveryL3Other: "",
  // Operating Model — L3
  omtStandardL3: [],           omtStandardL3Other: "",
  omtBaselineL3: [],           omtBaselineL3Other: "",
  omtGovernanceL3: [],         omtGovernanceL3Other: "",
  omtSecureL3: [],             omtSecureL3Other: "",
  omtAutoWorkflowsL3: [],      omtAutoWorkflowsL3Other: "",
  omtPerformanceL3: [],        omtPerformanceL3Other: "",
  omtConnectedSystemsL3: [],   omtConnectedSystemsL3Other: "",
  omtPlatformsL3: [],          omtPlatformsL3Other: "",
  omtTribesL3: [],             omtTribesL3Other: "",
  evidenceL3: "",

  // ── Level 4 ──────────────────────────────────────────────────────────────
  // People
  preparednessAdaptive: "",     preparednessAdaptiveOther: "",
  improvingAiDecisions: "",     improvingAiDecisionsOther: "",
  // Client Centric Approach — Sense, Benchmark & Position
  ccaAlignPrioritiesL4: [],     ccaAlignPrioritiesL4Other: "",
  ccaIdentifyOppsL4: [],        ccaIdentifyOppsL4Other: "",
  // Client Centric Approach — Scale & Differentiate
  ccaCodesignL4: [],            ccaCodesignL4Other: "",
  ccaIpAssetsL4: [],            ccaIpAssetsL4Other: "",
  // Client Centric Approach — Become a Human-AI Delivery Hub
  ccaDeliveryL4: [],            ccaDeliveryL4Other: "",
  // Operating Model — L4
  omtStandardL4: [],       omtStandardL4Other: "",
  omtBaselineL4: [],       omtBaselineL4Other: "",
  omtGovernanceL4: [],     omtGovernanceL4Other: "",
  omtSecureL4: [],         omtSecureL4Other: "",
  omtAutoWorkflowsL4: [],  omtAutoWorkflowsL4Other: "",
  omtPerformanceL4: [],    omtPerformanceL4Other: "",
  omtTechCapL4: [],        omtTechCapL4Other: "",
  omtPlatformsL4: [],      omtPlatformsL4Other: "",
  omtTribesL4: [],         omtTribesL4Other: "",
  evidenceL4: "",

  // Needs Validation Path
  validationUncertainty: "", validationUncertaintyOther: "",
  aiOutputsSeen: "",         aiOutputsSeenOther: "",
  validationContact: "",
  reviewRequired: "",        reviewRequiredOther: "",
  validationContext: "",
};

export const assessmentScopeOptions = [
  "Team",
  "Process",
];

export const tribes = [
  "Client Services",
  "Intelligence Automation",
  "Professional Services",
  "Development",
  "Infrastructure Services",
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
  "Client Facing",
  "Internal Process",
];

export const serviceProductOptions = [
  "SecureNow",
  "Cloud Operations",
  "Managed Services",
  "Customer Support",
  "Implementation Services",
  "Data & Analytics",
  "Platform Engineering",
  "Unlisted / Not sure",
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

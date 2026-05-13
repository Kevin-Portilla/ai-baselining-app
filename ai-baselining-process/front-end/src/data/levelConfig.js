// ── levelConfig.js — level metadata, colors, descriptions, and domains ─────

export const usageToLevel = {
  "No AI usage identified": "0",
  "AI is used informally by individuals": "1",
  "AI supports some defined workflow activities": "2",
  "AI is integrated across multiple workflow steps": "3",
  "AI operates adaptive or autonomous activities": "4",
  "Not sure": "needs-validation",
};

export const sectionLabels = {
  screening: "Awaiting AI Usage Input",
  "no-ai": "No AI Usage",
  individual: "Individual AI Use",
  connected: "Connected Workflows",
  orchestrated: "Orchestrated Systems",
  adaptive: "Adaptive / Autonomous Operations",
  "needs-validation": "Needs Validation",
};

export const levelDescriptions = {
  screening: "Select an AI usage level to determine the assessment path.",
  "0": "No AI is currently used in the process. The workflow is manual or supported only by traditional tools.",
  "1": "AI is used informally by individuals for isolated activities, but it is not documented or standardized.",
  "2": "AI supports defined steps in the process, but the full workflow is not yet redesigned or orchestrated.",
  "3": "AI is integrated across multiple workflow steps and connects with tools, systems, or data sources.",
  "4": "AI supports highly automated, adaptive, or agentic workflows with human oversight and continuous monitoring.",
  "needs-validation": "The process cannot be scored confidently because current AI usage is unclear.",
};

export const levelShortLabels = {
  "0": "No AI Usage",
  "1": "Individual AI Use",
  "2": "Connected Workflows",
  "3": "Orchestrated Systems",
  "4": "Adaptive / Autonomous Operations",
  "needs-validation": "Needs Validation",
};

export const levelIcons = {
  "0": "ban",
  "1": "user",
  "2": "network",
  "3": "workflow",
  "4": "rocket",
  "needs-validation": "warning",
};

export const levelPillClass = {
  "0": "bg-slate-700",
  "1": "bg-teal-700",
  "2": "bg-blue-600",
  "3": "bg-indigo-600",
  "4": "bg-violet-600",
  "needs-validation": "bg-amber-400",
};

export const branchingLevels = [
  { id: "0", section: "no-ai", label: "0 — No AI Usage", icon: "ban", desc: "No AI is currently used in the process. The workflow is manual or supported only by traditional tools." },
  { id: "1", section: "individual", label: "1 — Individual AI Use", icon: "user", desc: "AI is used informally by individuals for isolated activities, but it is not documented or standardized." },
  { id: "2", section: "connected", label: "2 — Connected Workflows", icon: "network", desc: "AI supports defined steps in the process, but the full workflow is not yet redesigned or orchestrated." },
  { id: "3", section: "orchestrated", label: "3 — Orchestrated Systems", icon: "workflow", desc: "AI is integrated across multiple workflow steps and connects with tools, systems, or data sources." },
  { id: "4", section: "adaptive", label: "4 — Adaptive / Autonomous Operations", icon: "rocket", desc: "AI supports highly automated, adaptive, or agentic workflows with human oversight and continuous monitoring." },
];

export const strategicStages = [
  { id: "sbp", title: "Sense, Benchmark & Position", subtitle: "Understand. Measure. Prioritize.", number: "01" },
  { id: "sd",  title: "Scale & Differentiate",        subtitle: "Build. Automate. Elevate.",       number: "02" },
  { id: "dh",  title: "Become a Human-AI Delivery Hub", subtitle: "Lead. Integrate. Transform.",  number: "03" },
];

export const domains = [
  {
    id: "clientCentric",
    title: "Client Centric Approach",
    subTitle: "(Business Model)",
    icon: "users",
    stages: {
      sbp: {
        category: "AI impact to Client",
        subcategories: [
          { name: "Align with Client priorities", fields: ["ccaAlignPrioritiesL0", "ccaAlignPrioritiesL1", "ccaAlignPrioritiesL2", "ccaAlignPrioritiesL3", "ccaAlignPrioritiesL4"] },
          { name: "Identify opportunities.", fields: ["ccaIdentifyOppsL0", "ccaIdentifyOppsL1", "ccaIdentifyOppsL2", "ccaIdentifyOppsL3", "ccaIdentifyOppsL4"] },
        ],
      },
      sd: {
        category: "AI impact to customers of our clients",
        subcategories: [
          { name: "Co-design.", fields: ["ccaCodesignL0", "ccaCodesignL1", "ccaCodesignL2", "ccaCodesignL3", "ccaCodesignL4"] },
          { name: "IP - reusable accelerators and service patterns.", fields: ["ccaIpAssetsL0", "ccaIpAssetsL1", "ccaIpAssetsL2", "ccaIpAssetsL3", "ccaIpAssetsL4"] },
        ],
      },
      dh: {
        category: "AI impact end to end",
        subcategories: [
          { name: "Infinite Led.", fields: ["ccaDeliveryL0", "ccaDeliveryL1", "ccaDeliveryL2", "ccaDeliveryL3", "ccaDeliveryL4"] },
          { name: "Evolve towards AI-managed delivery models.", fields: ["ccaDeliveryL0", "ccaDeliveryL1", "ccaDeliveryL2", "ccaDeliveryL3", "ccaDeliveryL4"] },
        ],
      },
    },
  },
  {
    id: "operatingModel",
    title: "Operating Model & Technology",
    subTitle: "(How we deliver)",
    icon: "settings",
    stages: {
      sbp: {
        category: "Drive standardization and modernization",
        subcategories: [
          { name: "Standard for AI-readiness, and baseline setting", fields: ["omtBarriersL0","omtVisibilityL0","omtStandardL1","omtStandardL2","omtStandardL3","omtStandardL4"] },
          { name: "Baseline operations",                             fields: ["omtBaselineL0","omtToolsUsedL1","omtBaselineL1","omtBaselineL2","omtBaselineL3","omtBaselineL4"] },
          { name: "Intelligent processes & governance.",             fields: ["omtGovernanceL0","omtGovernanceL1","omtGovernanceL2","omtGovernanceL3","omtGovernanceL4"] },
          { name: "Secure environments.",                            fields: ["omtSecureL0","omtSecureL1","omtSecureL2","omtSecureL3","omtSecureL4"] },
        ],
      },
      sd: {
        category: "Embedded intelligent automation",
        subcategories: [
          { name: "Highly automated workflows.",                                                       fields: ["omtAutoWorkflowsL0","omtAutoWorkflowsL1","omtAutoWorkflowsL2","omtAutoWorkflowsL3","omtAutoWorkflowsL4"] },
          { name: "Improve delivery performance and capacity via intelligent models.",                 fields: ["omtPerformanceL0","omtPerformanceL1","omtPerformanceL2","omtPerformanceL3","omtPerformanceL4"] },
        ],
      },
      dh: {
        category: "Intelligent by Design",
        subcategories: [
          { name: "Run delivery on secure, monitored, and reusable platforms.",                                                          fields: ["omtPlatformsL0","omtPlatformsL1","omtPlatformsL2","omtConnectedSystemsL3","omtPlatformsL3","omtTechCapL4","omtPlatformsL4"] },
          { name: "Enable tribes and squads with integrated-automated tools, knowledge, and operational gates.", fields: ["omtTribesL0","omtTribesL1","omtReusableAssetsL2","omtTribesL2","omtTribesL3","omtTribesL4"] },
        ],
      },
    },
  },
  {
    id: "people",
    title: "People",
    subTitle: "(How our people grow & win)",
    icon: "user-group",
    stages: {
      sbp: {
        category: 'The right mindset: "AI enhances people; adapting is not an option."',
        subcategories: [
          { name: "Strengthen training.", fields: ["aiAwareness", "adoptionBarriers"] },
          { name: "Develop fresh AI talent.", fields: ["aiLiteracy", "broaderAdoptionBarriers"] },
          { name: "Equip managers to in this Era.", fields: ["equipManagers"] },
        ],
      },
      sd: {
        category: "Upskilling and right sourcing",
        subcategories: [
          { name: "Intelligent AI-enable staffing.", fields: [] },
          { name: "Champion and mentor networks.", fields: ["remainingBarriersL2"] },
          { name: "Build manager fluency.", fields: ["automationMaturity", "evaluatingQuality"] },
        ],
      },
      dh: {
        category: "Superminds (Human + AI combined)",
        subcategories: [
          { name: "Career paths for the next generation of delivery roles.", fields: [] },
          { name: "Technology-enabled performance management.", fields: ["operationalAiCapability", "limitationsRiskEval"] },
          { name: "Strong leadership for modern delivery.", fields: ["preparednessAdaptive", "improvingAiDecisions"] },
        ],
      },
    },
  },
];

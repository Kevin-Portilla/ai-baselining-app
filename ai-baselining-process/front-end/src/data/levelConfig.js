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
  { id: "sbp", title: "Sense, Benchmark & Position" },
  { id: "sd", title: "Scale & Differentiate" },
  { id: "dh", title: "Become a Human-AI Delivery Hub" },
  { id: "oe", title: "Operational Enablers" },
];

export const domains = [
  {
    id: "clientCentric",
    title: "Client Centric Approach",
    subTitle: "(Business Model)",
    icon: "users",
    stages: {
      sbp: {
        category: "AI Impact to Client",
        subcategories: [
          {
            name: "Align with Client Priorities",
            fields: ["ccaAlignPrioritiesL0", "ccaAlignPrioritiesL1", "ccaAlignPrioritiesL2", "ccaAlignPrioritiesL3", "ccaAlignPrioritiesL4"],
          },
          {
            name: "Identify Opportunities",
            fields: ["ccaIdentifyOppsL0", "ccaIdentifyOppsL1", "ccaIdentifyOppsL2", "ccaIdentifyOppsL3", "ccaIdentifyOppsL4"],
          },
        ],
      },
      sd: {
        category: "AI Impact to Customers of Clients",
        subcategories: [
          {
            name: "Co-design",
            fields: ["ccaCodesignL0", "ccaCodesignL1", "ccaCodesignL2", "ccaCodesignL3", "ccaCodesignL4"],
          },
          {
            name: "IP - Reusable Accelerators",
            fields: ["ccaIpAssetsL0", "ccaIpAssetsL1", "ccaIpAssetsL2", "ccaIpAssetsL3", "ccaIpAssetsL4"],
          },
        ],
      },
      dh: {
        category: "AI Impact End to End",
        subcategories: [
          {
            name: "Infinite Led",
            fields: ["ccaInfiniteLedL0", "ccaInfiniteLedL1", "ccaInfiniteLedL2", "ccaInfiniteLedL3", "ccaInfiniteLedL4"],
          },
          {
            name: "AI-Managed Delivery Models",
            fields: ["ccaAiDeliveryL0", "ccaAiDeliveryL1", "ccaAiDeliveryL2", "ccaAiDeliveryL3", "ccaAiDeliveryL4"],
          },
        ],
      },
      oe: {
        category: "Cross-Cutting Capabilities",
        subcategories: [
          {
            name: "Governance & Controls",
            fields: ["ccaGovControlsL0", "ccaGovControlsL1", "ccaGovControlsL2", "ccaGovControlsL3", "ccaGovControlsL4"],
          },
          {
            name: "Tooling & AI Environments",
            fields: ["ccaToolingL0", "ccaToolingL1", "ccaToolingL2", "ccaToolingL3", "ccaToolingL4"],
          },
          {
            name: "AI-Enabled Roles & Operational Practices",
            fields: ["ccaRolesOpsL0", "ccaRolesOpsL1", "ccaRolesOpsL2", "ccaRolesOpsL3", "ccaRolesOpsL4"],
          },
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
        category: "Standardization & Modernization",
        subcategories: [
          { name: "Standard for AI-Readiness", fields: ["aiToolsUsed"] },
          { name: "Baseline Operations", fields: ["evidenceL0", "evidenceL1", "evidenceL2", "evidenceL3", "evidenceL4"] },
          { name: "Intelligent Governance", fields: ["outputValidationL1", "governanceRisksL1", "aiGovernanceL2", "consistentValidation", "governanceControlsL3", "auditableOutputs", "riskManagementL3", "approvalCriteria", "humanOversightRequired", "advancedGovernanceL4", "humanOverrideMechanism", "escalationPathsL4"] },
          { name: "Secure Environments", fields: ["infoSecurityClearance", "sensitiveDataHandling"] },
        ],
      },
      sd: {
        category: "Embedded Intelligent Automation",
        subcategories: [
          { name: "Highly Automated Workflows", fields: ["missingForAdaptive", "advancedTechCapabilities"] },
          { name: "Performance & Capacity", fields: ["measurableImpactL2", "improvedAreasL2", "operationalImpactMeasurement", "impactMetricsL3", "performanceMonitoringL3", "continuousMonitoringL4"] },
        ],
      },
      dh: {
        category: "Intelligent by Design",
        subcategories: [
          { name: "Secure Platforms", fields: ["reusableAssetsL2", "reusableCapabilitiesL3", "environmentReliability", "platformAdaptivity"] },
          { name: "Tribe Enablement", fields: ["connectedSystems"] },
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
        category: "AI Enhances People",
        subcategories: [
          { name: "Strengthen Training", fields: ["aiAwareness", "adoptionBarriers"] },
          { name: "Develop Fresh AI Talent", fields: ["aiLiteracy", "broaderAdoptionBarriers"] },
          { name: "Equip Managers to Win", fields: ["equipManagers"] },
        ],
      },
      sd: {
        category: "Upskilling & Right Sourcing",
        subcategories: [
          { name: "Intelligent Staffing", fields: ["intelligentStaffing"] },
          { name: "Champion & Mentor Networks", fields: ["remainingBarriersL2", "mentorNetworks"] },
          { name: "Build Manager Fluency", fields: ["automationMaturity", "evaluatingQuality", "managerFluency"] },
        ],
      },
      dh: {
        category: "Superminds",
        subcategories: [
          { name: "Next-Gen Roles", fields: ["nextGenRoles"] },
          { name: "Performance Management", fields: ["operationalAiCapability", "limitationsRiskEval", "techPerformanceManagement"] },
          { name: "Strong Leadership", fields: ["preparednessAdaptive", "improvingAiDecisions", "leadershipModernDelivery"] },
        ],
      },
    },
  },
];

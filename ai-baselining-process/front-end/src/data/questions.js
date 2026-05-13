// ── questions.js — ACE Framework Maturity Questions ──────────────────────────
// Pillar: Client Centric Approach
// Strategic Lenses: Sense Benchmark & Position | Scale & Differentiate |
//                   Become a Human-AI Delivery Hub | Operational Enablers

export const SECTION_QUESTIONS = {
  "no-ai": [
    // ── People domain (unchanged — pending next pillar share) ──────────────
    {
      id: "aiAwareness",
      domain: "people",
      subcategory: "Strengthen Training",
      label: "What is the current AI awareness level within the team?",
      type: "select",
      field: "aiAwareness",
      otherField: "aiAwarenessOther",
      options: ["No awareness", "Basic awareness", "Other"],
    },
    {
      id: "adoptionBarriers",
      domain: "people",
      subcategory: "Strengthen Training",
      label: "What barriers currently prevent AI adoption?",
      type: "toggle",
      field: "adoptionBarriers",
      otherField: "adoptionBarriersOther",
      options: ["Lack of training", "Unclear business value", "Security concerns", "No approved tools", "Client restrictions", "Resistance to change", "Data quality", "Lack of governance", "Other"],
    },

    // ── Client Centric Approach — Sense, Benchmark & Position ─────────────
    {
      id: "ccaAlignPrioritiesL0",
      domain: "clientCentric",
      subcategory: "Align with Client priorities",
      strategicLens: "Sense, Benchmark & Position",
      label: "Is this process executed entirely without AI support connected to client priorities or delivery outcomes?",
      type: "toggle",
      field: "ccaAlignPrioritiesL0",
      otherField: "ccaAlignPrioritiesL0Other",
      options: ["No AI usage in this process", "Process is fully manual", "Traditional tooling only", "No AI operational support identified", "Other"],
    },
    {
      id: "ccaIdentifyOppsL0",
      domain: "clientCentric",
      subcategory: "Identify opportunities.",
      strategicLens: "Sense, Benchmark & Position",
      label: "Has this process operated without any AI opportunity identification or assessment performed?",
      type: "toggle",
      field: "ccaIdentifyOppsL0",
      otherField: "ccaIdentifyOppsL0Other",
      options: ["No AI opportunity assessment performed", "No automation review exists", "No AI use cases identified", "Process not evaluated for AI potential", "Other"],
    },

    // ── Client Centric Approach — Scale & Differentiate ───────────────────
    {
      id: "ccaCodesignL0",
      domain: "clientCentric",
      subcategory: "Co-design.",
      strategicLens: "Scale & Differentiate",
      label: "Is this process executed without AI-enabled collaboration or customer interaction support?",
      type: "toggle",
      field: "ccaCodesignL0",
      otherField: "ccaCodesignL0Other",
      options: ["Collaboration is fully manual", "Customer interaction has no AI support", "No intelligent assistance exists", "Traditional communication only", "Other"],
    },
    {
      id: "ccaIpAssetsL0",
      domain: "clientCentric",
      subcategory: "IP – reusable accelerators and service patterns.",
      strategicLens: "Scale & Differentiate",
      label: "Does this process operate without reusable AI assets or automation patterns?",
      type: "toggle",
      field: "ccaIpAssetsL0",
      otherField: "ccaIpAssetsL0Other",
      options: ["No reusable AI assets exist", "No prompt libraries exist", "No automation patterns identified", "Process execution is fully manual", "Other"],
    },

    // ── Client Centric Approach — Become a Human-AI Delivery Hub ──────────
    {
      id: "ccaDeliveryL0",
      domain: "clientCentric",
      subcategory: "Evolve towards AI-managed delivery models.",
      strategicLens: "Become a Human-AI Delivery Hub",
      label: "Is this process executed entirely without AI-enabled operational support?",
      type: "toggle",
      field: "ccaDeliveryL0",
      otherField: "ccaDeliveryL0Other",
      options: ["Fully manual execution", "No workflow AI integration", "No intelligent operational support", "Human-coordinated execution only", "Other"],
    },

    // ── Operating Model & Technology ──────────────────────────────────────
    // sbp: Drive Standardization & Modernization
    { id:"omtBarriersL0",       domain:"operatingModel", subcategory:"Standard for AI-readiness & baseline setting", label:"What barriers currently limit broader AI adoption within this process?",                                                 type:"toggle", field:"omtBarriersL0",       otherField:"omtBarriersL0Other",       options:["Lack of training","Low confidence","Unclear process applicability","No internal champions","Resistance to change","Tool limitations","Other"] },
    { id:"omtVisibilityL0",     domain:"operatingModel", subcategory:"Standard for AI-readiness & baseline setting", label:"Is AI usage within this process visible, tracked, and operationally documented?",                                      type:"toggle", field:"omtVisibilityL0",     otherField:"omtVisibilityL0Other",     options:["No visibility exists","AI usage is informally known","Some workflow activities are manually tracked","AI usage is systematically documented and reviewed","Other"] },
    { id:"omtBaselineL0",       domain:"operatingModel", subcategory:"Baseline operations",                          label:"Does this process operate manually without AI support or workflow intelligence?",                                       type:"toggle", field:"omtBaselineL0",       otherField:"omtBaselineL0Other",       options:["Fully manual execution","Some isolated AI experimentation","AI supports selected activities","AI integrated into operational workflow stages","Other"] },
    { id:"omtGovernanceL0",     domain:"operatingModel", subcategory:"Intelligent processes & governance",           label:"Are governance and validation controls applied to AI-enabled activities in this process?",                              type:"toggle", field:"omtGovernanceL0",     otherField:"omtGovernanceL0Other",     options:["No governance exists","Informal reviews occur","Validation controls exist for selected stages","Governance and traceability are operationalized","Other"] },
    { id:"omtSecureL0",         domain:"operatingModel", subcategory:"Secure environments",                          label:"Are AI-enabled activities executed within approved and monitored environments?",                                        type:"toggle", field:"omtSecureL0",         otherField:"omtSecureL0Other",         options:["No approved AI tools","Public AI usage only","Partial enterprise-approved environments","Fully governed secure AI environments","Other"] },
    // sd: Embedded Intelligent Automation
    { id:"omtAutoWorkflowsL0",  domain:"operatingModel", subcategory:"Highly automated workflows",                   label:"Is workflow execution automated or intelligently orchestrated within this process?",                                    type:"toggle", field:"omtAutoWorkflowsL0",  otherField:"omtAutoWorkflowsL0Other",  options:["Fully manual workflow","Isolated automation exists","Partial workflow automation","Intelligent orchestration across connected stages","Other"] },
    { id:"omtPerformanceL0",    domain:"operatingModel", subcategory:"Improve delivery performance and capacity via intelligent models", label:"Are AI-driven models supporting forecasting, prioritization, or operational optimization?",         type:"toggle", field:"omtPerformanceL0",    otherField:"omtPerformanceL0Other",    options:["No AI-driven support","Individual analysis support","AI supports selected operational activities","AI continuously optimizes operational performance","Other"] },
    // dh: Intelligent by Design
    { id:"omtPlatformsL0",      domain:"operatingModel", subcategory:"Run delivery on secure, monitored, and reusable platforms",       label:"Does this process run on integrated, monitored, and reusable delivery platforms?",               type:"toggle", field:"omtPlatformsL0",      otherField:"omtPlatformsL0Other",      options:["Fully disconnected tools","Some workflow integrations","Reusable monitored platforms support selected stages","Scalable AI-enabled enterprise platforms support operations","Other"] },
    { id:"omtTribesL0",         domain:"operatingModel", subcategory:"Enable tribes and squads with integrated-automated tools, knowledge, and operational gates", label:"Are reusable knowledge systems, AI-enabled tools, or operational gates integrated into this process?", type:"toggle", field:"omtTribesL0", otherField:"omtTribesL0Other", options:["Tribal knowledge only","Shared documentation exists","AI-enabled reusable assets support selected stages","Intelligent knowledge systems and operational gates are integrated","Other"] },
    { id:"evidenceL0",          domain:"operatingModel", subcategory:"Baseline operations", label:"What evidence supports that this process has no AI usage today?", type:"textarea", field:"evidenceL0" },
  ],

  individual: [
    // ── People domain (unchanged — pending next pillar share) ──────────────
    {
      id: "aiLiteracy",
      domain: "people",
      subcategory: "Develop Fresh AI Talent",
      label: "How would you describe AI literacy within the team?",
      type: "select",
      field: "aiLiteracy",
      otherField: "aiLiteracyOther",
      options: ["Basic awareness", "Moderate practical usage", "Some individuals highly capable", "Other"],
    },
    {
      id: "broaderAdoptionBarriers",
      domain: "people",
      subcategory: "Develop Fresh AI Talent",
      label: "What barriers limit broader AI adoption?",
      type: "toggle",
      field: "broaderAdoptionBarriers",
      otherField: "broaderAdoptionBarriersOther",
      options: ["Lack of training", "Low confidence", "Unclear process applicability", "No internal champions", "Resistance to change", "Tool limitations", "Other"],
    },
    {
      id: "equipManagers",
      domain: "people",
      subcategory: "Equip Managers to Win",
      label: "Are managers using AI-enabled operational insights to manage this process?",
      type: "select",
      field: "equipManagers",
      otherField: "equipManagersOther",
      options: ["No", "Occasionally for reporting", "Starting to use AI insights for oversight", "Other"],
    },

    // ── Client Centric Approach — Sense, Benchmark & Position ─────────────
    {
      id: "ccaAlignPrioritiesL1",
      domain: "clientCentric",
      subcategory: "Align with Client priorities",
      strategicLens: "Sense, Benchmark & Position",
      label: "Are individuals independently using AI for isolated client-related activities in this process, without standardization across the team?",
      type: "toggle",
      field: "ccaAlignPrioritiesL1",
      otherField: "ccaAlignPrioritiesL1Other",
      options: ["Personal AI usage only", "AI used for summaries or emails", "No team standardization", "No workflow integration", "Other"],
    },
    {
      id: "ccaIdentifyOppsL1",
      domain: "clientCentric",
      subcategory: "Identify opportunities.",
      strategicLens: "Sense, Benchmark & Position",
      label: "Are individuals independently exploring or experimenting with AI opportunities in this process?",
      type: "toggle",
      field: "ccaIdentifyOppsL1",
      otherField: "ccaIdentifyOppsL1Other",
      options: ["Personal experimentation exists", "Individuals testing prompts/tools", "No formal evaluation process", "Findings not consolidated at team level", "Other"],
    },

    // ── Client Centric Approach — Scale & Differentiate ───────────────────
    {
      id: "ccaCodesignL1",
      domain: "clientCentric",
      subcategory: "Co-design.",
      strategicLens: "Scale & Differentiate",
      label: "Are individuals independently using AI to support customer interaction or collaboration activities?",
      type: "toggle",
      field: "ccaCodesignL1",
      otherField: "ccaCodesignL1Other",
      options: ["AI used for meeting summaries", "Personal AI usage exists", "No team-level integration", "AI used only for isolated collaboration tasks", "Other"],
    },
    {
      id: "ccaIpAssetsL1",
      domain: "clientCentric",
      subcategory: "IP – reusable accelerators and service patterns.",
      strategicLens: "Scale & Differentiate",
      label: "Are individuals creating personal AI prompts, scripts, or helpers for this process?",
      type: "toggle",
      field: "ccaIpAssetsL1",
      otherField: "ccaIpAssetsL1Other",
      options: ["Personal prompts/scripts exist", "No team reuse exists", "No governance exists", "AI assets are isolated per individual", "Other"],
    },

    // ── Client Centric Approach — Become a Human-AI Delivery Hub ──────────
    {
      id: "ccaDeliveryL1",
      domain: "clientCentric",
      subcategory: "Evolve towards AI-managed delivery models.",
      strategicLens: "Become a Human-AI Delivery Hub",
      label: "Are individuals independently using AI for isolated operational activities in this process?",
      type: "toggle",
      field: "ccaDeliveryL1",
      otherField: "ccaDeliveryL1Other",
      options: ["AI used for isolated tasks only", "Personal productivity usage exists", "No workflow orchestration exists", "No operational integration exists", "Other"],
    },

    // ── Operating Model & Technology ──────────────────────────────────────
    { id:"omtToolsUsedL1",      domain:"operatingModel", subcategory:"Baseline operations",                          label:"Which AI tools are currently used within this process?",                                                                type:"toggle", field:"omtToolsUsedL1",      otherField:"omtToolsUsedL1Other",      options:["ChatGPT","Microsoft Copilot","GitHub Copilot","Claude","Gemini","Internal tools","Other"] },
    { id:"omtStandardL1",       domain:"operatingModel", subcategory:"Standard for AI-readiness & baseline setting", label:"Is AI usage standardized and operationally visible across this process?",                                              type:"toggle", field:"omtStandardL1",       otherField:"omtStandardL1Other",       options:["No standardization","Individual AI usage only","Team-level standards emerging","Operational AI standards established","Other"] },
    { id:"omtBaselineL1",       domain:"operatingModel", subcategory:"Baseline operations",                          label:"Is AI usage operationally integrated into workflow execution?",                                                        type:"toggle", field:"omtBaselineL1",       otherField:"omtBaselineL1Other",       options:["No AI support","Personal productivity usage","Shared workflow AI support","AI operationally embedded across stages","Other"] },
    { id:"omtGovernanceL1",     domain:"operatingModel", subcategory:"Intelligent processes & governance",           label:"Are AI outputs reviewed, validated, and governed within this process?",                                                type:"toggle", field:"omtGovernanceL1",     otherField:"omtGovernanceL1Other",     options:["No validation","Informal review only","Controlled review process exists","Governance embedded operationally","Other"] },
    { id:"omtSecureL1",         domain:"operatingModel", subcategory:"Secure environments",                          label:"Are secure enterprise-approved AI environments used in this process?",                                                 type:"toggle", field:"omtSecureL1",         otherField:"omtSecureL1Other",         options:["Public tools only","Limited approved tools","Approved enterprise AI environments exist","Fully governed adaptive environments","Other"] },
    { id:"omtAutoWorkflowsL1",  domain:"operatingModel", subcategory:"Highly automated workflows",                   label:"Is workflow automation coordinated and integrated operationally?",                                                     type:"toggle", field:"omtAutoWorkflowsL1",  otherField:"omtAutoWorkflowsL1Other",  options:["Fully manual","Individual automation only","Team-level automation exists","Cross-stage orchestration enabled","Other"] },
    { id:"omtPerformanceL1",    domain:"operatingModel", subcategory:"Improve delivery performance and capacity via intelligent models", label:"Are intelligent models supporting operational decision-making?",                                   type:"toggle", field:"omtPerformanceL1",    otherField:"omtPerformanceL1Other",    options:["No model support","Personal productivity support","Shared forecasting/optimization support","AI continuously optimizes decisions","Other"] },
    { id:"omtPlatformsL1",      domain:"operatingModel", subcategory:"Run delivery on secure, monitored, and reusable platforms",       label:"Are AI-enabled operational platforms integrated into workflow execution?",                          type:"toggle", field:"omtPlatformsL1",      otherField:"omtPlatformsL1Other",      options:["No platform integration","External isolated tools","Partial monitored integrations","Enterprise reusable AI platforms","Other"] },
    { id:"omtTribesL1",         domain:"operatingModel", subcategory:"Enable tribes and squads with integrated-automated tools, knowledge, and operational gates", label:"Are AI-enabled knowledge systems and reusable assets shared operationally?", type:"toggle", field:"omtTribesL1", otherField:"omtTribesL1Other", options:["Personal assets only","Informal team sharing","Shared reusable assets exist","Enterprise integrated knowledge systems","Other"] },
    { id:"evidenceL1",          domain:"operatingModel", subcategory:"Baseline operations", label:"What evidence supports the detected maturity level?", type:"textarea", field:"evidenceL1" },
  ],

  connected: [
    // ── People domain (unchanged — pending next pillar share) ──────────────
    {
      id: "automationMaturity",
      domain: "people",
      subcategory: "Build Manager Fluency",
      label: "How mature is the team's understanding of process automation?",
      type: "select",
      field: "automationMaturity",
      otherField: "automationMaturityOther",
      options: ["Emerging", "Developing capability", "Established", "Other"],
    },
    {
      id: "evaluatingQuality",
      domain: "people",
      subcategory: "Build Manager Fluency",
      label: "Are teams capable of evaluating AI output quality?",
      type: "select",
      field: "evaluatingQuality",
      otherField: "evaluatingQualityOther",
      options: ["No", "Partially", "Yes", "Other"],
    },
    {
      id: "remainingBarriersL2",
      domain: "people",
      subcategory: "Champion & Mentor Networks",
      label: "What barriers remain to broader AI integration?",
      type: "toggle",
      field: "remainingBarriersL2",
      otherField: "remainingBarriersL2Other",
      options: ["Skill gaps", "Limited governance", "Tool constraints", "Data access limitations", "Change management challenges", "Other"],
    },

    // ── Client Centric Approach — Sense, Benchmark & Position ─────────────
    {
      id: "ccaAlignPrioritiesL2",
      domain: "clientCentric",
      subcategory: "Align with Client priorities",
      strategicLens: "Sense, Benchmark & Position",
      label: "Is AI integrated into specific shared workflow activities that support client reporting or delivery execution?",
      type: "toggle",
      field: "ccaAlignPrioritiesL2",
      otherField: "ccaAlignPrioritiesL2Other",
      options: ["AI supports reporting activities", "AI used in recurring workflow stages", "Shared team usage exists", "Workflow integration exists in specific activities", "Other"],
    },
    {
      id: "ccaIdentifyOppsL2",
      domain: "clientCentric",
      subcategory: "Identify opportunities.",
      strategicLens: "Sense, Benchmark & Position",
      label: "Are AI opportunities documented and operationalized within specific workflow stages of this process?",
      type: "toggle",
      field: "ccaIdentifyOppsL2",
      otherField: "ccaIdentifyOppsL2Other",
      options: ["AI opportunities documented", "AI implemented in specific activities", "Workflow improvements identified", "Shared visibility exists at team level", "Other"],
    },

    // ── Client Centric Approach — Scale & Differentiate ───────────────────
    {
      id: "ccaCodesignL2",
      domain: "clientCentric",
      subcategory: "Co-design.",
      strategicLens: "Scale & Differentiate",
      label: "Is AI integrated into workflow activities supporting customer interaction or collaboration?",
      type: "toggle",
      field: "ccaCodesignL2",
      otherField: "ccaCodesignL2Other",
      options: ["AI supports customer communications", "AI integrated into workflow activities", "Shared operational usage exists", "AI improves operational alignment", "Other"],
    },
    {
      id: "ccaIpAssetsL2",
      domain: "clientCentric",
      subcategory: "IP – reusable accelerators and service patterns.",
      strategicLens: "Scale & Differentiate",
      label: "Are reusable AI assets integrated into specific workflow stages of this process?",
      type: "toggle",
      field: "ccaIpAssetsL2",
      otherField: "ccaIpAssetsL2Other",
      options: ["Shared prompt templates exist", "AI assets reused across team", "AI supports recurring activities", "Specific workflow integration exists", "Other"],
    },

    // ── Client Centric Approach — Become a Human-AI Delivery Hub ──────────
    {
      id: "ccaDeliveryL2",
      domain: "clientCentric",
      subcategory: "Evolve towards AI-managed delivery models.",
      strategicLens: "Become a Human-AI Delivery Hub",
      label: "Are AI-enabled workflow improvements operationalized in specific execution activities of this process?",
      type: "toggle",
      field: "ccaDeliveryL2",
      otherField: "ccaDeliveryL2Other",
      options: ["AI supports operational execution", "Workflow integration exists in specific stages", "Shared operational usage exists", "AI assists recurring operational activities", "Other"],
    },

    // ── Operating Model & Technology ──────────────────────────────────────
    { id:"omtStandardL2",       domain:"operatingModel", subcategory:"Standard for AI-readiness & baseline setting", label:"Is AI integration documented and measured within defined operational stages?",                                          type:"toggle", field:"omtStandardL2",       otherField:"omtStandardL2Other",       options:["No tracking","Informal tracking","Structured workflow tracking","Operational monitoring across stages","Other"] },
    { id:"omtBaselineL2",       domain:"operatingModel", subcategory:"Baseline operations",                          label:"Is AI operationally integrated into defined workflow stages?",                                                          type:"toggle", field:"omtBaselineL2",       otherField:"omtBaselineL2Other",       options:["No integration","Individual usage only","Shared AI-enabled workflow stages","Multi-stage operational AI integration","Other"] },
    { id:"omtGovernanceL2",     domain:"operatingModel", subcategory:"Intelligent processes & governance",           label:"Are AI-enabled activities governed through operational validation controls?",                                            type:"toggle", field:"omtGovernanceL2",     otherField:"omtGovernanceL2Other",     options:["No governance","Informal reviews","Validation embedded in workflow","Governance monitored operationally","Other"] },
    { id:"omtSecureL2",         domain:"operatingModel", subcategory:"Secure environments",                          label:"Are AI-enabled workflows executed within approved enterprise environments?",                                             type:"toggle", field:"omtSecureL2",         otherField:"omtSecureL2Other",         options:["Public environments only","Partial enterprise approval","Approved monitored environments","Adaptive secure operational environments","Other"] },
    { id:"omtAutoWorkflowsL2",  domain:"operatingModel", subcategory:"Highly automated workflows",                   label:"Is intelligent automation integrated into operational workflow stages?",                                                 type:"toggle", field:"omtAutoWorkflowsL2",  otherField:"omtAutoWorkflowsL2Other",  options:["Manual execution","Isolated automation","Shared operational automation","Cross-functional orchestration enabled","Other"] },
    { id:"omtPerformanceL2",    domain:"operatingModel", subcategory:"Improve delivery performance and capacity via intelligent models", label:"Are intelligent models supporting forecasting and optimization activities?",                        type:"toggle", field:"omtPerformanceL2",    otherField:"omtPerformanceL2Other",    options:["No AI support","Informal usage","Shared operational models","AI continuously optimizes operations","Other"] },
    { id:"omtPlatformsL2",      domain:"operatingModel", subcategory:"Run delivery on secure, monitored, and reusable platforms",       label:"Are AI-enabled workflow tools integrated into monitored delivery platforms?",                       type:"toggle", field:"omtPlatformsL2",      otherField:"omtPlatformsL2Other",      options:["Disconnected tools","Partial integrations","Monitored workflow platforms","Enterprise AI-enabled reusable platforms","Other"] },
    { id:"omtReusableAssetsL2", domain:"operatingModel", subcategory:"Enable tribes and squads with integrated-automated tools, knowledge, and operational gates", label:"What reusable assets exist within this process?",                    type:"toggle", field:"omtReusableAssetsL2", otherField:"omtReusableAssetsL2Other", options:["Templates","Prompt libraries","Knowledge bases","Connectors","Workflow automations","APIs","System integration","Agents","Monitoring Dashboard","Other"] },
    { id:"omtTribesL2",         domain:"operatingModel", subcategory:"Enable tribes and squads with integrated-automated tools, knowledge, and operational gates", label:"Are reusable AI-enabled assets integrated into operational workflows?", type:"toggle", field:"omtTribesL2", otherField:"omtTribesL2Other", options:["Tribal knowledge only","Informal shared assets","Shared reusable operational assets","Enterprise operational knowledge systems","Other"] },
    { id:"evidenceL2",          domain:"operatingModel", subcategory:"Baseline operations", label:"What evidence supports the detected maturity level?", type:"textarea", field:"evidenceL2" },
  ],

  orchestrated: [
    // ── People domain (unchanged — pending next pillar share) ──────────────
    {
      id: "operationalAiCapability",
      domain: "people",
      subcategory: "Performance Management",
      label: "How mature is operational AI capability in the team?",
      type: "select",
      field: "operationalAiCapability",
      otherField: "operationalAiCapabilityOther",
      options: ["High", "Advanced operational capability", "Other"],
    },
    {
      id: "limitationsRiskEval",
      domain: "people",
      subcategory: "Performance Management",
      label: "How effectively can teams evaluate AI limitations and risks?",
      type: "select",
      field: "limitationsRiskEval",
      otherField: "limitationsRiskEvalOther",
      options: ["Most teams understand limitations", "Teams consistently evaluate outputs and risks", "Other"],
    },

    // ── Client Centric Approach — Sense, Benchmark & Position ─────────────
    {
      id: "ccaAlignPrioritiesL3",
      domain: "clientCentric",
      subcategory: "Align with Client priorities",
      strategicLens: "Sense, Benchmark & Position",
      label: "Is AI integrated across multiple connected stages of this process to support client prioritization, delivery visibility, or operational decisions?",
      type: "toggle",
      field: "ccaAlignPrioritiesL3",
      otherField: "ccaAlignPrioritiesL3Other",
      options: ["AI integrated across connected workflow stages", "AI supports prioritization decisions", "AI generates operational insights", "Shared operational dependency exists", "Other"],
    },
    {
      id: "ccaIdentifyOppsL3",
      domain: "clientCentric",
      subcategory: "Identify opportunities.",
      strategicLens: "Sense, Benchmark & Position",
      label: "Does this process generate optimization opportunities through AI-driven operational analysis?",
      type: "toggle",
      field: "ccaIdentifyOppsL3",
      otherField: "ccaIdentifyOppsL3Other",
      options: ["AI identifies operational bottlenecks", "AI generates optimization recommendations", "Operational metrics analyzed continuously", "Governance cadence exists", "Other"],
    },

    // ── Client Centric Approach — Scale & Differentiate ───────────────────
    {
      id: "ccaCodesignL3",
      domain: "clientCentric",
      subcategory: "Co-design.",
      strategicLens: "Scale & Differentiate",
      label: "Is AI integrated across multiple connected stages supporting collaboration or customer interaction?",
      type: "toggle",
      field: "ccaCodesignL3",
      otherField: "ccaCodesignL3Other",
      options: ["AI integrated across connected workflow stages", "AI supports operational collaboration", "AI analyzes customer interactions", "Shared ownership/governance exists", "Other"],
    },
    {
      id: "ccaIpAssetsL3",
      domain: "clientCentric",
      subcategory: "IP – reusable accelerators and service patterns.",
      strategicLens: "Scale & Differentiate",
      label: "Are reusable AI accelerators embedded across multiple connected workflow stages?",
      type: "toggle",
      field: "ccaIpAssetsL3",
      otherField: "ccaIpAssetsL3Other",
      options: ["AI accelerators standardized", "Workflow orchestration exists", "Ownership/governance assigned", "Multi-stage reuse exists", "Other"],
    },

    // ── Client Centric Approach — Become a Human-AI Delivery Hub ──────────
    {
      id: "ccaDeliveryL3",
      domain: "clientCentric",
      subcategory: "Evolve towards AI-managed delivery models.",
      strategicLens: "Become a Human-AI Delivery Hub",
      label: "Is AI integrated across multiple connected operational workflow stages?",
      type: "toggle",
      field: "ccaDeliveryL3",
      otherField: "ccaDeliveryL3Other",
      options: ["Connected workflow integration exists", "AI supports operational coordination", "AI supports prioritization/planning", "Operational dependency exists", "Other"],
    },

    // ── Operating Model & Technology ──────────────────────────────────────
    { id:"omtStandardL3",       domain:"operatingModel", subcategory:"Standard for AI-readiness & baseline setting", label:"Is AI operational maturity continuously governed across workflow stages?",                                               type:"toggle", field:"omtStandardL3",       otherField:"omtStandardL3Other",       options:["No governance","Partial governance","Multi-stage governance exists","Continuous adaptive governance enabled","Other"] },
    { id:"omtBaselineL3",       domain:"operatingModel", subcategory:"Baseline operations",                          label:"Is AI embedded across connected operational stages with measurable contribution?",                                     type:"toggle", field:"omtBaselineL3",       otherField:"omtBaselineL3Other",       options:["Manual operations","Partial AI integration","Multi-stage AI operations","Adaptive operational AI orchestration","Other"] },
    { id:"omtGovernanceL3",     domain:"operatingModel", subcategory:"Intelligent processes & governance",           label:"Are governance and traceability embedded operationally across AI workflows?",                                          type:"toggle", field:"omtGovernanceL3",     otherField:"omtGovernanceL3Other",     options:["No traceability","Partial controls","Governance operationalized","Real-time adaptive governance enabled","Other"] },
    { id:"omtSecureL3",         domain:"operatingModel", subcategory:"Secure environments",                          label:"Do AI-enabled workflows operate within secure governed environments?",                                                  type:"toggle", field:"omtSecureL3",         otherField:"omtSecureL3Other",         options:["Public/non-governed tools","Partial enterprise governance","Secure governed operational environments","Adaptive risk-aware environments","Other"] },
    { id:"omtAutoWorkflowsL3",  domain:"operatingModel", subcategory:"Highly automated workflows",                   label:"Does intelligent automation orchestrate workflow execution operationally?",                                              type:"toggle", field:"omtAutoWorkflowsL3",  otherField:"omtAutoWorkflowsL3Other",  options:["Manual routing","Partial automation","Operational orchestration","Adaptive autonomous orchestration","Other"] },
    { id:"omtPerformanceL3",    domain:"operatingModel", subcategory:"Improve delivery performance and capacity via intelligent models", label:"Are AI-driven models continuously optimizing operational performance?",                              type:"toggle", field:"omtPerformanceL3",    otherField:"omtPerformanceL3Other",    options:["No optimization","Partial optimization","Continuous operational optimization","Autonomous optimization enabled","Other"] },
    { id:"omtConnectedSystemsL3",domain:"operatingModel",subcategory:"Run delivery on secure, monitored, and reusable platforms",       label:"Which systems or tools does the AI-enabled workflow connect with?",                                type:"toggle", field:"omtConnectedSystemsL3",otherField:"omtConnectedSystemsL3Other",options:["CRM systems","ERP systems","Ticketing tools","Data warehouses","Communication platforms","APIs / middleware","Workflow automation tools","Databases","Other"] },
    { id:"omtPlatformsL3",      domain:"operatingModel", subcategory:"Run delivery on secure, monitored, and reusable platforms",       label:"Does delivery execution run on scalable reusable AI-enabled platforms?",                           type:"toggle", field:"omtPlatformsL3",      otherField:"omtPlatformsL3Other",      options:["Disconnected tools","Partial reusable platforms","Operational reusable AI platforms","Adaptive self-optimizing platforms","Other"] },
    { id:"omtTribesL3",         domain:"operatingModel", subcategory:"Enable tribes and squads with integrated-automated tools, knowledge, and operational gates", label:"Are AI-enabled operational gates and knowledge systems embedded across connected stages?", type:"toggle", field:"omtTribesL3", otherField:"omtTribesL3Other", options:["No operational integration","Partial workflow support","Operational AI-enabled gates","Adaptive knowledge and governance systems","Other"] },
    { id:"evidenceL3",          domain:"operatingModel", subcategory:"Baseline operations", label:"What evidence supports the detected maturity level?", type:"textarea", field:"evidenceL3" },
  ],

  adaptive: [
    // ── People domain (unchanged — pending next pillar share) ──────────────
    {
      id: "preparednessAdaptive",
      domain: "people",
      subcategory: "Strong Leadership",
      label: "How prepared are teams to operate adaptive AI workflows?",
      type: "select",
      field: "preparednessAdaptive",
      otherField: "preparednessAdaptiveOther",
      options: ["Advanced", "AI-native operational capability", "Other"],
    },
    {
      id: "improvingAiDecisions",
      domain: "people",
      subcategory: "Strong Leadership",
      label: "How actively do teams improve AI-supported decisions?",
      type: "select",
      field: "improvingAiDecisions",
      otherField: "improvingAiDecisionsOther",
      options: ["Teams validate and improve workflows", "Teams continuously optimize AI decisions", "Other"],
    },

    // ── Client Centric Approach — Sense, Benchmark & Position ─────────────
    {
      id: "ccaAlignPrioritiesL4",
      domain: "clientCentric",
      subcategory: "Align with Client priorities",
      strategicLens: "Sense, Benchmark & Position",
      label: "Does AI dynamically adapt process execution and automate delivery decisions within defined governance boundaries?",
      type: "toggle",
      field: "ccaAlignPrioritiesL4",
      otherField: "ccaAlignPrioritiesL4Other",
      options: ["AI dynamically adapts execution", "AI uses live operational signals", "Workflow decisions are automated", "Humans focus mainly on exceptions/governance", "Other"],
    },
    {
      id: "ccaIdentifyOppsL4",
      domain: "clientCentric",
      subcategory: "Identify opportunities.",
      strategicLens: "Sense, Benchmark & Position",
      label: "Does AI continuously identify and trigger optimization opportunities using live operational signals?",
      type: "toggle",
      field: "ccaIdentifyOppsL4",
      otherField: "ccaIdentifyOppsL4Other",
      options: ["AI monitors live operational signals", "AI triggers workflow improvements automatically", "Governance boundaries defined", "Human oversight focused on exceptions", "Other"],
    },

    // ── Client Centric Approach — Scale & Differentiate ───────────────────
    {
      id: "ccaCodesignL4",
      domain: "clientCentric",
      subcategory: "Co-design.",
      strategicLens: "Scale & Differentiate",
      label: "Does AI dynamically adapt customer interactions using operational or behavioral signals?",
      type: "toggle",
      field: "ccaCodesignL4",
      otherField: "ccaCodesignL4Other",
      options: ["AI adapts interactions dynamically", "AI uses customer feedback signals", "Automated operational adjustments exist", "Governance boundaries defined", "Other"],
    },
    {
      id: "ccaIpAssetsL4",
      domain: "clientCentric",
      subcategory: "IP – reusable accelerators and service patterns.",
      strategicLens: "Scale & Differentiate",
      label: "Do reusable AI assets adapt or improve automatically based on operational signals?",
      type: "toggle",
      field: "ccaIpAssetsL4",
      otherField: "ccaIpAssetsL4Other",
      options: ["AI assets self-improve", "Feedback-driven optimization exists", "Adaptive workflow behavior exists", "Governance boundaries defined", "Other"],
    },

    // ── Client Centric Approach — Become a Human-AI Delivery Hub ──────────
    {
      id: "ccaDeliveryL4",
      domain: "clientCentric",
      subcategory: "Evolve towards AI-managed delivery models.",
      strategicLens: "Become a Human-AI Delivery Hub",
      label: "Does AI orchestrate or optimize operational execution dynamically using live operational signals?",
      type: "toggle",
      field: "ccaDeliveryL4",
      otherField: "ccaDeliveryL4Other",
      options: ["AI orchestrates workflow execution", "AI reacts to live operational signals", "Operational decisions automated", "Humans manage governance/exceptions", "Other"],
    },

    // ── Operating Model & Technology ──────────────────────────────────────
    { id:"omtStandardL4",       domain:"operatingModel", subcategory:"Standard for AI-readiness & baseline setting", label:"Is AI operational maturity continuously monitored and adaptively governed?",                                            type:"toggle", field:"omtStandardL4",       otherField:"omtStandardL4Other",       options:["No operational monitoring","Partial monitoring","Continuous monitoring","Adaptive autonomous governance","Other"] },
    { id:"omtBaselineL4",       domain:"operatingModel", subcategory:"Baseline operations",                          label:"Does AI dynamically adapt workflow execution operationally?",                                                           type:"toggle", field:"omtBaselineL4",       otherField:"omtBaselineL4Other",       options:["Manual execution","Partial operational adaptation","Dynamic AI orchestration","Autonomous operational execution","Other"] },
    { id:"omtGovernanceL4",     domain:"operatingModel", subcategory:"Intelligent processes & governance",           label:"Is AI governance automated and adaptive in real time?",                                                                type:"toggle", field:"omtGovernanceL4",     otherField:"omtGovernanceL4Other",     options:["Manual governance","Partial automation","Real-time operational governance","Autonomous adaptive governance","Other"] },
    { id:"omtSecureL4",         domain:"operatingModel", subcategory:"Secure environments",                          label:"Do secure AI environments dynamically adapt based on operational risk?",                                               type:"toggle", field:"omtSecureL4",         otherField:"omtSecureL4Other",         options:["Static environments","Partially adaptive controls","Dynamic risk-aware environments","Autonomous secure operational governance","Other"] },
    { id:"omtAutoWorkflowsL4",  domain:"operatingModel", subcategory:"Highly automated workflows",                   label:"Does intelligent automation dynamically orchestrate workflows using live operational signals?",                          type:"toggle", field:"omtAutoWorkflowsL4",  otherField:"omtAutoWorkflowsL4Other",  options:["Static automation","Partial orchestration","Dynamic orchestration","Autonomous workflow balancing","Other"] },
    { id:"omtPerformanceL4",    domain:"operatingModel", subcategory:"Improve delivery performance and capacity via intelligent models", label:"Do AI models autonomously optimize operational performance and capacity?",                          type:"toggle", field:"omtPerformanceL4",    otherField:"omtPerformanceL4Other",    options:["Manual optimization","Partial AI optimization","Continuous operational optimization","Autonomous optimization and execution","Other"] },
    { id:"omtTechCapL4",        domain:"operatingModel", subcategory:"Run delivery on secure, monitored, and reusable platforms",       label:"Which advanced technology capabilities support this process?",                                      type:"toggle", field:"omtTechCapL4",        otherField:"omtTechCapL4Other",        options:["Agentic orchestration platform","Real-time data pipelines","Model fine-tuning","RAG (Retrieval-Augmented Generation)","Vector databases","Custom evaluation harness","Autonomous decision routing","Multi-model AI","Other"] },
    { id:"omtPlatformsL4",      domain:"operatingModel", subcategory:"Run delivery on secure, monitored, and reusable platforms",       label:"Do delivery platforms dynamically self-adjust operationally using AI telemetry?",                   type:"toggle", field:"omtPlatformsL4",      otherField:"omtPlatformsL4Other",      options:["Static platforms","Partial operational adaptation","Dynamic AI-enabled platforms","Autonomous adaptive enterprise platforms","Other"] },
    { id:"omtTribesL4",         domain:"operatingModel", subcategory:"Enable tribes and squads with integrated-automated tools, knowledge, and operational gates", label:"Do AI-driven knowledge systems dynamically adapt operational governance and recommendations?", type:"toggle", field:"omtTribesL4", otherField:"omtTribesL4Other", options:["Static knowledge systems","Partially adaptive knowledge support","Dynamic AI-enabled knowledge systems","Autonomous operational governance and guidance","Other"] },
    { id:"evidenceL4",          domain:"operatingModel", subcategory:"Baseline operations", label:"What evidence supports the detected maturity level?", type:"textarea", field:"evidenceL4" },
  ],
};

// ── NEEDS_VALIDATION_QUESTIONS ────────────────────────────────────────────────

export const NEEDS_VALIDATION_QUESTIONS = [
  {
    id: "validationUncertainty",
    label: "Why are you unsure whether AI is used in this process?",
    type: "select",
    field: "validationUncertainty",
    otherField: "validationUncertaintyOther",
    options: ["No AI tools are available", "I don't know enough about the process", "Usage may be informal or hidden", "The process is new", "Other"],
  },
  {
    id: "aiOutputsSeen",
    label: "Have you seen any AI-generated outputs or workflow assistance?",
    type: "select",
    field: "aiOutputsSeen",
    otherField: "aiOutputsSeenOther",
    options: ["No", "Yes — occasionally", "Yes — regularly", "Other"],
  },
  {
    id: "validationContact",
    label: "Who could confirm current AI usage?",
    type: "input",
    field: "validationContact",
    placeholder: "Name, role, or team",
  },
  {
    id: "reviewRequired",
    label: "Should this process be reviewed with the process owner?",
    type: "select",
    field: "reviewRequired",
    otherField: "reviewRequiredOther",
    options: ["No", "Possibly", "Yes — recommended", "Other"],
  },
  {
    id: "validationContext",
    label: "Additional context",
    type: "textarea",
    field: "validationContext",
    placeholder: "Any additional context that may help confirm AI usage.",
  },
];

// ── FINAL_QUESTIONS (Kept for reference but not currently rendered) ───────────

export const FINAL_QUESTIONS = [
  { id: "maturityAccurate", label: "Does the detected maturity level seem accurate?", type: "select", field: "maturityAccurate", options: ["Yes — accurate", "Partially accurate", "No — too low", "No — too high"] },
  { id: "strongestDimension", label: "Which domain is strongest today?", type: "select", field: "strongestDimension", options: ["Client Centric Approach", "Operating Model & Technology", "People & Talent"] },
  { id: "weakestDimension", label: "Which domain is weakest today?", type: "select", field: "weakestDimension", options: ["Client Centric Approach", "Operating Model & Technology", "People & Talent"] },
  { id: "nextLevelNeeds", label: "What would be needed to move this process to the next maturity level?", type: "toggle", field: "nextLevelNeeds", options: ["More training", "Better tooling", "Governance framework", "Process documentation", "Leadership support", "Data readiness", "Integration work", "Dedicated budget", "Other"], otherField: "nextLevelNeedsOther" },
  { id: "deeperAssessment", label: "Should this process be considered for deeper assessment or scaling?", type: "select", field: "deeperAssessment", options: ["No", "Possibly", "Yes — recommended"] },
  { id: "additionalComments", label: "Additional comments or examples", type: "textarea", field: "additionalComments" },
];

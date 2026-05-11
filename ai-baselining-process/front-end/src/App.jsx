import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Icon = ({ type, className = "" }) => {
  const icons = {
    brain: "AI",
    workflow: "⚙",
    shield: "✓",
    database: "▣",
    clipboard: "☑",
    route: "◇",
    layers: "▱",
    rocket: "↗",
    user: "○",
    ban: "⊘",
    network: "⌘",
    check: "✓",
    warning: "!",
    arrow: "→",
    download: "↓",
    reset: "↻",
  };
  return (
    <span className={cn("inline-flex items-center justify-center font-bold", className)}>
      {icons[type] || "•"}
    </span>
  );
};

// ── Data ─────────────────────────────────────────────────────────────────────

const initialForm = {
  tribe: "",
  role: "",
  processName: "",
  processDescription: "",
  frequency: "",
  criticality: "",
  aiUsage: "",
  individualActivities: [],
  processSteps: [],
  tools: [],
  governanceControls: [],
  techEnablement: [],
  impactMeasured: "",
  humanValidation: "",
  maturityOverride: "",
  evidence: "",
  barriers: [],
  aiBenefit: "",
  validationContact: "",
  humanOversight: "",
  individualActivitiesOther: "",
  toolsOther: "",
  processStepsOther: "",
  // Pillar-specific fields (PRD-002)
  literacyAwareness: "",
  literacyBarriers: [],
  integrationDocumentation: "",
  integrationScope: "",
  integrationImprovements: [],
  governanceRisks: [],
  governanceDataHandling: "",
  governanceRiskManagement: "",
  technologyCurrentTools: [],
  technologyDataReadiness: "",
  technologyReuse: "",
  technologyEnterpriseIntegration: "",
  // PRD-003 new fields
  squad: "",
  processType: "",
  clientData: "",
  mainSystems: "",
  aiDependency: "",
  outcomeImpact: "",
  outcomeAreas: [],
};

const tribes = [
  "Implementation",
  "Client Services",
  "Development",
  "Professional Services",
  "Intelligence Automation",
  "Infrastructure",
  "Other",
];

const roleTypes = [
  "Analyst",
  "Consultant",
  "Manager / Team Lead",
  "Project Manager",
  "Engineer / Developer",
  "Executive / Director",
  "Operations Specialist",
  "Other",
];

const frequencies = ["Ad hoc / on demand", "Daily", "Weekly", "Monthly", "Quarterly"];

const criticalities = [
  "Low — minor impact if disrupted",
  "Medium — moderate impact if disrupted",
  "High — significant impact if disrupted",
  "Critical — severe impact if disrupted",
];

const aiUsageOptions = [
  "No AI usage identified",
  "AI is used informally by individuals",
  "AI supports some defined workflow activities",
  "AI is integrated across multiple workflow steps",
  "AI operates adaptive or autonomous activities",
  "Not sure",
];

const usageToLevel = {
  "No AI usage identified": "0",
  "AI is used informally by individuals": "1",
  "AI supports some defined workflow activities": "2",
  "AI is integrated across multiple workflow steps": "3",
  "AI operates adaptive or autonomous activities": "4",
  "Not sure": "needs-validation",
};


// PRD-003 new option arrays
const processTypeOptions = [
  "Customer-facing operations",
  "Internal operations",
  "Compliance / risk management",
  "Product development",
  "Support / service delivery",
  "Other",
];

const clientDataOptions = [
  "Yes — this process handles client or sensitive data",
  "No — no sensitive data involved",
  "Partially — some steps involve sensitive data",
];

const aiDependencyOptions = [
  "No dependency — process runs without AI",
  "Individual productivity support only",
  "Some workflow activities depend on AI",
  "Multiple operational activities depend on AI",
  "The process is designed around AI-driven execution",
];

const outcomeImpactOptions = [
  "No impact identified",
  "Perceived improvements only",
  "Small local improvements",
  "Measured operational improvements",
  "KPI or SLA impact",
  "Strategic business impact",
];

const outcomeAreaOptions = [
  "Productivity",
  "Cycle time",
  "Quality",
  "Error reduction",
  "Capacity",
  "Customer experience",
  "Compliance",
  "Decision-making",
];

// ── PILLAR_QUESTIONS — level × pillar question definitions (PRD-003 constrained) ─

const PILLAR_QUESTIONS = {
  "no-ai": [
    {
      id: "literacy", title: "AI Literacy & Readiness", icon: "brain",
      questions: [
        {
          id: "literacyAwareness", label: "What is the current AI awareness level within the team?",
          type: "select", field: "literacyAwareness",
          options: ["No awareness", "Basic awareness"],
        },
        {
          id: "literacyBarriers", label: "What barriers currently prevent AI adoption?",
          type: "toggle", field: "literacyBarriers",
          options: ["Lack of knowledge or training", "Unclear business value", "Security or compliance concerns", "No approved tools", "Client restrictions", "Resistance to change"],
        },
      ],
    },
    {
      id: "integration", title: "Operational Process AI Integration", icon: "workflow",
      questions: [
        {
          id: "integrationScope", label: "How is the workflow currently executed?",
          type: "select", field: "integrationScope",
          options: ["Fully manual", "Traditional tools only", "Rule-based automation only"],
        },
        {
          id: "aiBenefit", label: "Which process areas could potentially benefit from AI?",
          type: "toggle", field: "barriers",
          options: ["Documentation", "Reporting", "Analysis", "Classification", "Communication", "Monitoring", "Decision support", "Development", "Testing", "Governance"],
        },
      ],
    },
    {
      id: "governance", title: "AI Governance", icon: "shield",
      questions: [
        {
          id: "governanceDataHandling", label: "How is AI usage currently governed in this process?",
          type: "select", field: "governanceDataHandling",
          options: ["No governance defined", "Informal awareness only"],
        },
        {
          id: "governanceRisks", label: "What governance risks are most concerning today?",
          type: "toggle", field: "governanceRisks",
          options: ["Invisible AI usage", "Sensitive data exposure", "No validation practices", "Compliance concerns", "Lack of traceability"],
        },
      ],
    },
    {
      id: "technology", title: "Technology & Data Enablement", icon: "database",
      questions: [
        {
          id: "technologyCurrentTools", label: "What AI capabilities currently exist?",
          type: "select", field: "integrationDocumentation",
          options: ["No AI tools", "Isolated experimentation only"],
        },
        {
          id: "technologyDataReadiness", label: "How prepared is process data for future AI usage?",
          type: "select", field: "technologyDataReadiness",
          options: ["Not structured", "Partially structured but inconsistent"],
        },
      ],
    },
  ],

  individual: [
    {
      id: "literacy", title: "AI Literacy & Readiness", icon: "brain",
      questions: [
        {
          id: "literacyAwareness", label: "How would you describe AI literacy within the team?",
          type: "select", field: "literacyAwareness",
          options: ["Basic awareness", "Moderate practical usage", "Some individuals highly capable"],
        },
        {
          id: "literacyBarriers", label: "What barriers limit broader AI adoption?",
          type: "toggle", field: "literacyBarriers",
          options: ["Lack of training", "Low confidence", "Unclear process applicability", "No internal champions", "Resistance to change", "Tool limitations"],
        },
      ],
    },
    {
      id: "integration", title: "Operational Process AI Integration", icon: "workflow",
      questions: [
        {
          id: "individualActivities", label: "What individual AI activities are currently performed?",
          type: "toggle", field: "individualActivities",
          options: ["Writing / rewriting", "Summarization", "Brainstorming", "Documentation", "Reporting", "Code assistance", "Communication support", "Basic analysis"],
          otherField: "individualActivitiesOther",
        },
        {
          id: "integrationScope", label: "How integrated is AI within the official workflow?",
          type: "select", field: "integrationScope",
          options: ["Personal productivity only", "Isolated activities", "Some repeatable individual usage"],
        },
      ],
    },
    {
      id: "governance", title: "AI Governance", icon: "shield",
      questions: [
        {
          id: "humanValidation", label: "How are AI outputs validated?",
          type: "select", field: "humanValidation",
          options: ["No validation", "Informal human review", "Peer review in some situations"],
        },
        {
          id: "governanceRisks", label: "What governance risks currently exist?",
          type: "toggle", field: "governanceRisks",
          options: ["Invisible AI usage", "Lack of validation", "Sensitive data exposure", "No traceability", "No escalation path"],
        },
      ],
    },
    {
      id: "technology", title: "Technology & Data Enablement", icon: "database",
      questions: [
        {
          id: "tools", label: "Which AI tools are currently used?",
          type: "toggle", field: "tools",
          options: ["ChatGPT", "Microsoft Copilot", "Claude", "Gemini", "GitHub Copilot", "Internal tools", "Other"],
          otherField: "toolsOther",
        },
        {
          id: "technologyReuse", label: "How are prompts or outputs reused?",
          type: "select", field: "technologyReuse",
          options: ["No reuse", "Individual informal reuse", "Shared informally inside team"],
        },
      ],
    },
  ],

  connected: [
    {
      id: "literacy", title: "AI Literacy & Readiness", icon: "brain",
      questions: [
        {
          id: "literacyAwareness", label: "How capable is the team at identifying operational AI opportunities?",
          type: "select", field: "literacyAwareness",
          options: ["Moderate", "High"],
        },
        {
          id: "integrationImprovements", label: "What operational improvements have been observed?",
          type: "toggle", field: "integrationImprovements",
          options: ["Faster execution", "Reduced effort", "Better quality", "Reduced errors", "Improved reporting", "Better decision support"],
        },
      ],
    },
    {
      id: "integration", title: "Operational Process AI Integration", icon: "workflow",
      questions: [
        {
          id: "processSteps", label: "Which workflow activities are AI-supported?",
          type: "toggle", field: "processSteps",
          options: ["Intake", "Classification", "Analysis", "Reporting", "Documentation", "Monitoring", "Decision support", "Communication"],
          otherField: "processStepsOther",
        },
        {
          id: "integrationScope", label: "How integrated is AI across the workflow?",
          type: "select", field: "integrationScope",
          options: ["AI supports defined workflow steps", "AI connects some activities together", "AI partially supports operational flow"],
        },
      ],
    },
    {
      id: "governance", title: "AI Governance", icon: "shield",
      questions: [
        {
          id: "humanValidation", label: "How are AI activities governed?",
          type: "select", field: "humanValidation",
          options: ["Human validation required", "Partial documented controls", "Team-level responsible use practices"],
        },
        {
          id: "governanceDataHandling", label: "How is sensitive data handled?",
          type: "select", field: "governanceDataHandling",
          options: ["Basic guidance", "Defined team practices", "Partial standardization"],
        },
      ],
    },
    {
      id: "technology", title: "Technology & Data Enablement", icon: "database",
      questions: [
        {
          id: "techEnablement", label: "What reusable assets exist?",
          type: "toggle", field: "techEnablement",
          options: ["Templates", "Prompt libraries", "Knowledge bases", "Connectors", "Workflow automations"],
        },
        {
          id: "technologyDataReadiness", label: "How prepared is the data environment?",
          type: "select", field: "technologyDataReadiness",
          options: ["Organized for some use cases", "Reliable for defined workflows"],
        },
      ],
    },
  ],

  orchestrated: [
    {
      id: "literacy", title: "AI Literacy & Readiness", icon: "brain",
      questions: [
        {
          id: "literacyAwareness", label: "How mature is operational AI capability in the team?",
          type: "select", field: "literacyAwareness",
          options: ["High", "Advanced operational capability"],
        },
        {
          id: "integrationImprovements", label: "How effectively can teams evaluate AI limitations and risks?",
          type: "select", field: "integrationDocumentation",
          options: ["Most teams understand limitations", "Teams consistently evaluate outputs and risks"],
        },
      ],
    },
    {
      id: "integration", title: "Operational Process AI Integration", icon: "workflow",
      questions: [
        {
          id: "integrationScope", label: "How is AI integrated operationally?",
          type: "select", field: "integrationScope",
          options: ["AI supports multiple workflow steps", "AI integrates with systems and data sources", "AI enables measurable operational workflows"],
        },
        {
          id: "impactMeasured", label: "How is AI impact measured?",
          type: "select", field: "impactMeasured",
          options: ["Informally tracked", "Measured with operational metrics", "Measured with KPIs and SLAs"],
        },
      ],
    },
    {
      id: "governance", title: "AI Governance", icon: "shield",
      questions: [
        {
          id: "governanceControls", label: "Which governance controls are implemented?",
          type: "toggle", field: "governanceControls",
          options: ["Human validation", "Audit trail", "Approval workflows", "Risk documentation", "Traceability", "Monitoring", "Escalation procedures"],
        },
        {
          id: "governanceRiskManagement", label: "How mature is AI risk management?",
          type: "select", field: "governanceRiskManagement",
          options: ["Documented and reviewed", "Continuously managed operationally"],
        },
      ],
    },
    {
      id: "technology", title: "Technology & Data Enablement", icon: "database",
      questions: [
        {
          id: "techEnablement", label: "Which reusable enterprise capabilities exist?",
          type: "toggle", field: "techEnablement",
          options: ["APIs", "Agents", "Enterprise integrations", "Shared orchestration workflows", "Monitoring dashboards"],
        },
        {
          id: "technologyEnterpriseIntegration", label: "How reliable is the technical environment?",
          type: "select", field: "technologyEnterpriseIntegration",
          options: ["Reliable and repeatable", "Operationally scalable"],
        },
      ],
    },
  ],

  adaptive: [
    {
      id: "literacy", title: "AI Literacy & Readiness", icon: "brain",
      questions: [
        {
          id: "literacyAwareness", label: "How prepared are teams to operate adaptive AI workflows?",
          type: "select", field: "literacyAwareness",
          options: ["Advanced", "AI-native operational capability"],
        },
        {
          id: "integrationImprovements", label: "How actively do teams improve AI-supported decisions?",
          type: "select", field: "integrationDocumentation",
          options: ["Teams validate and improve workflows", "Teams continuously optimize AI decisions"],
        },
      ],
    },
    {
      id: "integration", title: "Operational Process AI Integration", icon: "workflow",
      questions: [
        {
          id: "integrationScope", label: "How autonomous is the workflow?",
          type: "select", field: "integrationScope",
          options: ["AI recommends actions", "AI executes some actions autonomously", "AI adapts operational behavior dynamically"],
        },
        {
          id: "humanOversight", label: "What is the human oversight model?",
          type: "textarea", field: "humanOversight",
          placeholder: "Where do humans approve, override, monitor, or handle exceptions?",
        },
      ],
    },
    {
      id: "governance", title: "AI Governance", icon: "shield",
      questions: [
        {
          id: "governanceControls", label: "Which advanced governance capabilities exist?",
          type: "toggle", field: "governanceControls",
          options: ["Continuous monitoring", "Automated controls", "Auditability", "Confidence thresholds", "Escalation automation", "Human override", "Risk lifecycle management"],
        },
        {
          id: "governanceRiskManagement", label: "How is AI compliance monitored?",
          type: "select", field: "governanceRiskManagement",
          options: ["Continuously monitored", "Embedded operationally", "Adaptive risk management"],
        },
      ],
    },
    {
      id: "technology", title: "Technology & Data Enablement", icon: "database",
      questions: [
        {
          id: "techEnablement", label: "Which adaptive capabilities exist?",
          type: "toggle", field: "techEnablement",
          options: ["Agents", "Autonomous workflows", "Adaptive orchestration", "Continuous learning systems", "Enterprise monitoring"],
        },
        {
          id: "technologyEnterpriseIntegration", label: "How adaptive is the platform ecosystem?",
          type: "select", field: "technologyEnterpriseIntegration",
          options: ["AI integrated enterprise-wide", "AI-enabled continuous optimization", "Adaptive operational architecture"],
        },
      ],
    },
  ],
};

// ── Dimensions ───────────────────────────────────────────────────────────────

const dimensions = [
  {
    pillar: "literacy",
    title: "AI Literacy & Readiness",
    icon: "brain",
    desc: "Knowledge, confidence, and readiness to use AI responsibly in daily work.",
  },
  {
    pillar: "integration",
    title: "Operational Process AI Integration",
    icon: "workflow",
    desc: "How AI is embedded into workflow steps, operating procedures, and execution.",
  },
  {
    pillar: "governance",
    title: "AI Governance",
    icon: "shield",
    desc: "Controls, risk management, validation, traceability, and responsible use.",
  },
  {
    pillar: "technology",
    title: "Technology & Data Enablement",
    icon: "database",
    desc: "Tools, data readiness, reusable components, integrations, and scalability.",
  },
];

// ── Branching preview (levels 0-4 only) ──────────────────────────────────────

const branchingLevels = [
  {
    id: "0",
    section: "no-ai",
    label: "0 — No AI Usage",
    icon: "ban",
    desc: "No AI is currently used in the process. The workflow is manual or supported only by traditional tools.",
  },
  {
    id: "1",
    section: "individual",
    label: "1 — Individual AI Use",
    icon: "user",
    desc: "AI is used informally by individuals for isolated activities, but it is not documented or standardized.",
  },
  {
    id: "2",
    section: "connected",
    label: "2 — Connected Workflows",
    icon: "network",
    desc: "AI supports defined steps in the process, but the full workflow is not yet redesigned or orchestrated.",
  },
  {
    id: "3",
    section: "orchestrated",
    label: "3 — Orchestrated Systems",
    icon: "workflow",
    desc: "AI is integrated across multiple workflow steps and connects with tools, systems, or data sources.",
  },
  {
    id: "4",
    section: "adaptive",
    label: "4 — Adaptive / Autonomous Operations",
    icon: "rocket",
    desc: "AI supports highly automated, adaptive, or agentic workflows with human oversight and continuous monitoring.",
  },
];

// ── Section labels & metadata ─────────────────────────────────────────────────

const sectionLabels = {
  screening: "Awaiting AI Usage Input",
  "no-ai": "No AI Usage",
  individual: "Individual AI Use",
  connected: "Connected Workflows",
  orchestrated: "Orchestrated Systems",
  adaptive: "Adaptive / Autonomous Operations",
  "needs-validation": "Needs Validation",
};

const levelDescriptions = {
  screening: "Select an AI usage level to determine the assessment path.",
  "0": "No AI is currently used in the process. The workflow is manual or supported only by traditional tools.",
  "1": "AI is used informally by individuals for isolated activities, but it is not documented or standardized.",
  "2": "AI supports defined steps in the process, but the full workflow is not yet redesigned or orchestrated.",
  "3": "AI is integrated across multiple workflow steps and connects with tools, systems, or data sources.",
  "4": "AI supports highly automated, adaptive, or agentic workflows with human oversight and continuous monitoring.",
  "needs-validation": "The process cannot be scored confidently because current AI usage is unclear.",
};

const levelShortLabels = {
  "0": "No AI Usage",
  "1": "Individual AI Use",
  "2": "Connected Workflows",
  "3": "Orchestrated Systems",
  "4": "Adaptive / Autonomous Operations",
  "needs-validation": "Needs Validation",
};

const levelIcons = {
  "0": "ban",
  "1": "user",
  "2": "network",
  "3": "workflow",
  "4": "rocket",
  "needs-validation": "warning",
};

// Pill background per level — matches screenshot colors
const levelPillClass = {
  "0": "bg-slate-700",
  "1": "bg-teal-700",
  "2": "bg-blue-600",
  "3": "bg-indigo-600",
  "4": "bg-violet-600",
  "needs-validation": "bg-amber-400",
};

// ── Logic ─────────────────────────────────────────────────────────────────────

function getCurrentSection(form) {
  const level = usageToLevel[form.aiUsage];
  if (!form.aiUsage) return "screening";
  if (level === "0") return "no-ai";
  if (level === "1") return "individual";
  if (level === "2") return "connected";
  if (level === "3") return "orchestrated";
  if (level === "4") return "adaptive";
  return "needs-validation";
}

function calculateLevel(form) {
  if (form.maturityOverride) return form.maturityOverride;
  const base = usageToLevel[form.aiUsage];
  if (!base || base === "needs-validation") return "needs-validation";

  let score = Number(base);
  if (form.humanValidation === "Formal and required" && score < 3) score += 0.5;
  if (form.impactMeasured === "Yes, with defined metrics" && score < 3) score += 0.5;
  if (form.governanceControls.length >= 4 && score < 4) score += 0.5;
  if (form.techEnablement.length >= 4 && score < 4) score += 0.5;
  if (form.processSteps.length >= 4 && score < 3) score += 0.5;

  return String(Math.min(4, Math.round(score)));
}

// ── Sub-components ────────────────────────────────────────────────────────────

const FormSelect = ({ label, value, onChange, options, placeholder, highlight }) => (
  <div>
    <label
      className={cn(
        "block text-sm font-medium mb-1",
        highlight ? "text-blue-600" : "text-slate-700"
      )}
    >
      {label}
    </label>
    <select
      className="w-full border border-slate-200 rounded-xl p-3 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder || "Select…"}</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

const ToggleGrid = ({ label, options, value, onChange, otherValue, onOtherChange }) => {
  const toggle = (opt) =>
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);

  const hasOther = options.includes("Other");
  const otherSelected = value.includes("Other");

  return (
    <div>
      {label && <p className="text-sm font-medium text-slate-700 mb-3">{label}</p>}
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={cn(
              "p-3 rounded-xl text-sm text-left border transition-all",
              value.includes(opt)
                ? "bg-blue-50 border-blue-400 text-blue-800 font-medium"
                : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {hasOther && otherSelected && onOtherChange && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <input
              autoFocus
              className="w-full border border-blue-300 bg-blue-50 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder='Please describe what "Other" includes…'
              value={otherValue || ""}
              onChange={(e) => onOtherChange(e.target.value)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// PillarSection — renders one pillar's questions for a given maturity level
const PillarSection = ({ pillar, form, updateField }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {pillar.questions.map((q) => {
          if (q.type === "select") {
            return (
              <FormSelect
                key={q.id}
                label={q.label}
                value={form[q.field] || ""}
                onChange={(v) => updateField(q.field, v)}
                options={q.options}
                placeholder="Select…"
              />
            );
          }
          if (q.type === "toggle") {
            return (
              <ToggleGrid
                key={q.id}
                label={q.label}
                options={q.options}
                value={form[q.field] || []}
                onChange={(v) => updateField(q.field, v)}
                otherValue={q.otherField ? form[q.otherField] : undefined}
                onOtherChange={q.otherField ? (v) => updateField(q.otherField, v) : undefined}
              />
            );
          }
          if (q.type === "textarea") {
            return (
              <div key={q.id}>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {q.label}
                </label>
                <textarea
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 min-h-[90px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={q.placeholder || ""}
                  value={form[q.field] || ""}
                  onChange={(e) => updateField(q.field, e.target.value)}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [form, setForm] = useState(initialForm);

  const currentSection = useMemo(() => getCurrentSection(form), [form]);
  const recommendedLevel = useMemo(() => calculateLevel(form), [form]);

  const completion = useMemo(() => {
    const fields = [
      form.tribe,
      form.role,
      form.processName,
      form.aiUsage,
      form.processDescription,
      form.frequency,
      form.criticality,
      form.evidence,
      form.squad,
      form.processType,
      form.clientData,
      form.mainSystems,
      form.aiDependency,
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [form]);

  const pillarActive = useMemo(() => ({
    literacy: !!(form.literacyAwareness || form.literacyBarriers.length),
    integration: !!(
      form.individualActivities.length ||
      form.processSteps.length ||
      form.integrationDocumentation ||
      form.integrationScope ||
      form.integrationImprovements.length ||
      form.impactMeasured ||
      form.outcomeAreas.length ||
      form.outcomeImpact
    ),
    governance: !!(
      form.governanceControls.length ||
      form.governanceRisks.length ||
      form.governanceDataHandling ||
      form.governanceRiskManagement ||
      form.humanValidation
    ),
    technology: !!(
      form.tools.length ||
      form.techEnablement.length ||
      form.technologyCurrentTools.length ||
      form.technologyDataReadiness ||
      form.technologyReuse ||
      form.technologyEnterpriseIntegration
    ),
  }), [form]);

  const updateField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));


  const isActive = currentSection !== "screening";
  const isNeedsValidation = currentSection === "needs-validation";

  const pillClass = levelPillClass[recommendedLevel] || "bg-slate-700";
  const pillIconClass = isNeedsValidation ? "bg-amber-500/30 text-amber-900" : "bg-white/20 text-white";
  const pillLabelClass = isNeedsValidation ? "text-amber-800" : "text-white/70";
  const pillTitleClass = isNeedsValidation ? "text-slate-900" : "text-white";

  const classificationTitle =
    recommendedLevel === "needs-validation" || !levelShortLabels[recommendedLevel]
      ? levelShortLabels[recommendedLevel] || "Awaiting Input"
      : `${recommendedLevel} — ${levelShortLabels[recommendedLevel]}`;

  // Determine which pillar set to render
  const activePillars = PILLAR_QUESTIONS[currentSection] || null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#020617" }}>
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-8">
        <div className="flex items-start justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
          >
            <h1 className="text-5xl font-bold text-white tracking-tight leading-tight">
              AI Operations Baseline App
            </h1>
            <p className="mt-3 text-slate-400 text-sm max-w-lg leading-relaxed">
              Model the survey flow, apply branching logic, and classify each operational
              process using the AI maturity framework.
            </p>
          </motion.div>

          {/* Completion Widget */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-slate-800 rounded-2xl p-5 shrink-0 min-w-[220px]"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Assessment completion
              </p>
              <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 text-sm">
                ☑
              </div>
            </div>
            <p className="text-4xl font-bold text-white">{completion}%</p>
            <div className="mt-3 w-full bg-slate-700 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Dimension Cards ── */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {dimensions.map((d, i) => {
            const active = pillarActive[d.pillar];
            return (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
            >
              <Card className={cn("rounded-2xl h-full transition-all duration-300", active && "border-blue-500 shadow-md shadow-blue-100")}>
                <CardContent className="p-5">
                  <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold mb-3 transition-all duration-300", active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700")}>
                    <Icon type={d.icon} />
                  </div>
                  <p className="font-bold text-sm text-slate-900 leading-snug">{d.title}</p>
                  <p className={cn("text-xs mt-1.5 leading-relaxed transition-colors duration-300", active ? "text-blue-600" : "text-slate-500")}>{d.desc}</p>
                  {active && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-blue-600 font-medium">
                      <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                      In progress
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="max-w-7xl mx-auto px-6 pb-16 grid lg:grid-cols-3 gap-6 items-start">
        {/* ── Left: Form ── */}
        <div className="lg:col-span-2">
          <Card className="rounded-2xl shadow-xl">
            <CardContent className="p-7 space-y-5">
              {/* Form header */}
              <div>
                <h2 className="text-xl font-bold text-slate-900">Process Assessment Flow</h2>
                <p className="text-sm text-blue-600 mt-0.5">
                  The questions below change based on the current AI usage answer.
                </p>
              </div>

              {/* Row 1: Tribe | Role type */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormSelect
                  label="Tribe"
                  value={form.tribe}
                  onChange={(v) => updateField("tribe", v)}
                  options={tribes}
                  placeholder="Select..."
                />
                <FormSelect
                  label="Role type"
                  value={form.role}
                  onChange={(v) => updateField("role", v)}
                  options={roleTypes}
                  placeholder="Select..."
                />
              </div>

              {/* Row 1b: Team / Squad | Process Type */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Team / Squad
                  </label>
                  <input
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Example: SecureNow Delivery Squad"
                    value={form.squad}
                    onChange={(e) => updateField("squad", e.target.value)}
                  />
                </div>
                <FormSelect
                  label="Process Type"
                  value={form.processType}
                  onChange={(v) => updateField("processType", v)}
                  options={processTypeOptions}
                  placeholder="Select..."
                />
              </div>

              {/* Row 2: Process name | Execution frequency */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Process name
                  </label>
                  <input
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Example: SecureNow report validation"
                    value={form.processName}
                    onChange={(e) => updateField("processName", e.target.value)}
                  />
                </div>
                <FormSelect
                  label="Execution frequency"
                  value={form.frequency}
                  onChange={(v) => updateField("frequency", v)}
                  options={frequencies}
                  placeholder="Select..."
                />
              </div>

              {/* Row 2b: Client data | Main systems */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormSelect
                  label="Does this process handle client or sensitive data?"
                  value={form.clientData}
                  onChange={(v) => updateField("clientData", v)}
                  options={clientDataOptions}
                  placeholder="Select..."
                />
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Main systems / platforms used
                  </label>
                  <input
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Example: Salesforce, Jira, Power BI"
                    value={form.mainSystems}
                    onChange={(e) => updateField("mainSystems", e.target.value)}
                  />
                </div>
              </div>

              {/* Brief process description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Brief process description
                </label>
                <textarea
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the operational workflow being assessed"
                  value={form.processDescription}
                  onChange={(e) => updateField("processDescription", e.target.value)}
                />
              </div>

              {/* Row 3: Criticality | Is AI used */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormSelect
                  label="Process criticality"
                  value={form.criticality}
                  onChange={(v) => updateField("criticality", v)}
                  options={criticalities}
                  placeholder="Select..."
                />
                <FormSelect
                  label="Is AI currently used in this process?"
                  value={form.aiUsage}
                  onChange={(v) => updateField("aiUsage", v)}
                  options={aiUsageOptions}
                  placeholder="Select..."
                  highlight
                />
              </div>

              {/* Row 3b: Operational AI dependency */}
              <FormSelect
                label="How dependent is the process on AI to operate effectively?"
                value={form.aiDependency}
                onChange={(v) => updateField("aiDependency", v)}
                options={aiDependencyOptions}
                placeholder="Select..."
                highlight
              />

              {/* ── Branching section ── */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    key={currentSection}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-5"
                  >
                    {/* ── Levels 0–4: Pillar-based sections ── */}
                    {activePillars && (
                      <div className="rounded-2xl border border-slate-200 p-5 space-y-4">
                        <p className="text-base font-bold text-slate-900">
                          Path: {sectionLabels[currentSection]}
                        </p>
                        <div className="space-y-3">
                          {activePillars.map((pillar) => (
                            <PillarSection
                              key={pillar.id}
                              pillar={pillar}
                              form={form}
                              updateField={updateField}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── Outcome & Value Measurement ── */}
                    {isActive && !isNeedsValidation && (
                      <div className="rounded-2xl border border-slate-200 p-5 space-y-5">
                        <p className="text-base font-bold text-slate-900">Outcome & Value Measurement</p>
                        <FormSelect
                          label="What measurable impact has AI produced on this process?"
                          value={form.outcomeImpact}
                          onChange={(v) => updateField("outcomeImpact", v)}
                          options={outcomeImpactOptions}
                          placeholder="Select..."
                        />
                        <ToggleGrid
                          label="Which areas improved due to AI?"
                          options={outcomeAreaOptions}
                          value={form.outcomeAreas}
                          onChange={(v) => updateField("outcomeAreas", v)}
                        />
                      </div>
                    )}

                    {/* ── Needs Validation ── */}
                    {isNeedsValidation && (
                      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-5 space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">
                            !
                          </div>
                          <div>
                            <p className="text-base font-bold text-amber-900">
                              Path: Needs Validation
                            </p>
                            <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                              The respondent is not sure whether AI is used. This process should
                              be flagged for follow-up instead of forcing a maturity score.
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-amber-900 mb-1">
                            Who could confirm current AI usage?
                          </label>
                          <input
                            className="w-full border border-amber-300 bg-white rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            placeholder="Name, role, or team"
                            value={form.validationContact}
                            onChange={(e) => updateField("validationContact", e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* ── Right column ── */}
        <div className="space-y-6">
          {/* Dark Classification Card */}
          <div className="bg-slate-900 rounded-2xl p-6">
            <h3 className="font-bold text-lg text-white">Recommended Classification</h3>
            <p className="text-xs text-blue-400 mt-1 leading-relaxed">
              Calculated from usage path plus governance, measurement, and technology indicators.
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={recommendedLevel}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cn("mt-4 rounded-xl p-4 flex items-start gap-4", pillClass)}
              >
                <div
                  className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold shrink-0",
                    pillIconClass
                  )}
                >
                  <Icon type={levelIcons[recommendedLevel] || "network"} />
                </div>
                <div>
                  <p className={cn("text-xs uppercase tracking-wide", pillLabelClass)}>
                    Maturity Level
                  </p>
                  <p className={cn("text-xl font-bold leading-snug mt-0.5", pillTitleClass)}>
                    {classificationTitle}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <p className="mt-4 text-sm text-blue-300 leading-relaxed">
              {levelDescriptions[recommendedLevel] || levelDescriptions.screening}
            </p>

            {form.maturityOverride && (
              <div className="mt-4 rounded-lg bg-amber-900/30 border border-amber-700/40 px-3 py-2 text-xs text-amber-400">
                Manual override applied — Level {form.maturityOverride}
              </div>
            )}
          </div>

          {/* Branching Logic Preview (levels 0–4 only) */}
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg text-slate-900 mb-4">
                Branching Logic Preview
              </h3>
              <div className="space-y-3">
                {branchingLevels.map(({ id, section, label, icon, desc }) => {
                  const active = currentSection === section;
                  return (
                    <div
                      key={id}
                      className={cn(
                        "rounded-xl border p-4 transition-all duration-200",
                        active ? "bg-blue-600 border-transparent" : "bg-white border-slate-200"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold",
                            active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                          )}
                        >
                          <Icon type={icon} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "font-semibold text-sm",
                              active ? "text-white" : "text-slate-900"
                            )}
                          >
                            {label}
                          </p>
                          <p
                            className={cn(
                              "text-xs mt-0.5 leading-relaxed",
                              active ? "text-blue-100" : "text-slate-500"
                            )}
                          >
                            {desc}
                          </p>
                        </div>
                        {active && (
                          <span className="text-white text-sm shrink-0 mt-0.5">✓</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

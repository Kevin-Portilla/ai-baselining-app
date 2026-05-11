import React, { useMemo, useState } from "react";
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
  "No AI is used",
  "AI is used informally by individuals",
  "AI is used in specific process steps",
  "AI is used across multiple workflow steps or systems",
  "AI is used in adaptive, agentic, or semi-autonomous workflows",
  "Not sure",
];

const usageToLevel = {
  "No AI is used": "0",
  "AI is used informally by individuals": "1",
  "AI is used in specific process steps": "2",
  "AI is used across multiple workflow steps or systems": "3",
  "AI is used in adaptive, agentic, or semi-autonomous workflows": "4",
  "Not sure": "needs-validation",
};

// Level 0 — barriers
const noAiBarriers = [
  "Lack of training",
  "Lack of approved tools",
  "Data quality",
  "Data access",
  "Security concerns",
  "Client restrictions",
  "Lack of governance",
  "Lack of technical support",
  "Unclear business value",
  "Resistance to change",
];

// Level 1 — individual AI activities
const individualActivityOptions = [
  "Writing / rewriting",
  "Summarization",
  "Brainstorming",
  "Basic analysis",
  "Code generation",
  "Documentation",
  "Reporting",
  "Ticket or case review",
  "Communication support",
  "Other",
];

// Level 1 — AI tools in use
const aiToolOptions = [
  "ChatGPT",
  "Microsoft Copilot",
  "GitHub Copilot",
  "Claude",
  "Gemini",
  "Power Platform AI Builder",
  "UiPath AI",
  "Internal AI tool",
  "Custom model / API",
  "Other",
];

// Level 2 / 3 — process steps
const processStepOptions = [
  "Intake",
  "Classification",
  "Prioritization",
  "Analysis",
  "Documentation",
  "Development",
  "Testing",
  "Quality review",
  "Reporting",
  "Monitoring",
  "Decision support",
  "Client communication",
  "Other",
];

// Level 2 / 3 / 4 — reusable assets or tech capabilities
const reusableAssetOptions = [
  "Prompt library",
  "Reusable templates",
  "Knowledge base",
  "Connectors",
  "Automation workflow",
  "System integration",
  "Agents",
  "APIs",
  "Monitoring dashboard",
];

// Level 4 — advanced governance controls
const advancedControlOptions = [
  "Human validation",
  "Approved tools only",
  "Sensitive data guidance",
  "Traceability / audit trail",
  "Risk documentation",
  "Escalation path",
  "Automated controls",
  "Continuous monitoring",
];

const humanValidationOptions = [
  "No validation — AI output used directly",
  "Informal — individuals verify as they see fit",
  "Formal and required",
  "Automated validation only",
];

const impactMeasuredOptions = [
  "No, impact is not measured",
  "Yes, informally tracked",
  "Yes, with defined metrics",
];

// ── Dimensions ───────────────────────────────────────────────────────────────

const dimensions = [
  {
    title: "AI Literacy & Readiness",
    icon: "brain",
    desc: "Knowledge, confidence, and readiness to use AI responsibly in daily work.",
  },
  {
    title: "Operational Process AI Integration",
    icon: "workflow",
    desc: "How AI is embedded into workflow steps, operating procedures, and execution.",
  },
  {
    title: "AI Governance",
    icon: "shield",
    desc: "Controls, risk management, validation, traceability, and responsible use.",
  },
  {
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

const ValidationDropdowns = ({ form, updateField }) => (
  <div className="grid md:grid-cols-2 gap-4">
    <FormSelect
      label="Is there human validation?"
      value={form.humanValidation}
      onChange={(v) => updateField("humanValidation", v)}
      options={humanValidationOptions}
      placeholder="Select..."
    />
    <FormSelect
      label="Is impact measured?"
      value={form.impactMeasured}
      onChange={(v) => updateField("impactMeasured", v)}
      options={impactMeasuredOptions}
      placeholder="Select..."
    />
  </div>
);

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
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [form]);

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
          {dimensions.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
            >
              <Card className="rounded-2xl h-full">
                <CardContent className="p-5">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 text-sm font-bold mb-3">
                    <Icon type={d.icon} />
                  </div>
                  <p className="font-bold text-sm text-slate-900 leading-snug">{d.title}</p>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{d.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
                    {/* ── Level 0: No AI Usage ── */}
                    {currentSection === "no-ai" && (
                      <>
                        <div className="rounded-2xl border border-slate-200 p-5 space-y-5">
                          <p className="text-base font-bold text-slate-900">
                            Path: {sectionLabels[currentSection]}
                          </p>
                          <ToggleGrid
                            label="What are the main barriers to AI adoption in this process?"
                            options={noAiBarriers}
                            value={form.barriers}
                            onChange={(v) => updateField("barriers", v)}
                          />
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Which part of the process could potentially benefit from AI?
                            </label>
                            <textarea
                              className="w-full border border-slate-200 rounded-xl p-3 text-sm min-h-[90px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Example: classification, documentation, reporting, QA review…"
                              value={form.aiBenefit}
                              onChange={(e) => updateField("aiBenefit", e.target.value)}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* ── Level 1: Individual AI Use ── */}
                    {currentSection === "individual" && (
                      <div className="rounded-2xl border border-slate-200 p-5 space-y-5">
                        <p className="text-base font-bold text-slate-900">
                          Path: {sectionLabels[currentSection]}
                        </p>
                        <ToggleGrid
                          label="What individual AI activities are being performed?"
                          options={individualActivityOptions}
                          value={form.individualActivities}
                          onChange={(v) => updateField("individualActivities", v)}
                          otherValue={form.individualActivitiesOther}
                          onOtherChange={(v) => updateField("individualActivitiesOther", v)}
                        />
                        <ToggleGrid
                          label="Which AI tools are being used?"
                          options={aiToolOptions}
                          value={form.tools}
                          onChange={(v) => updateField("tools", v)}
                          otherValue={form.toolsOther}
                          onOtherChange={(v) => updateField("toolsOther", v)}
                        />
                        <ValidationDropdowns form={form} updateField={updateField} />
                      </div>
                    )}

                    {/* ── Level 2: Connected Workflows ── */}
                    {currentSection === "connected" && (
                      <div className="rounded-2xl border border-slate-200 p-5 space-y-5">
                        <p className="text-base font-bold text-slate-900">
                          Path: {sectionLabels[currentSection]}
                        </p>
                        <ToggleGrid
                          label="Which process steps are supported by AI?"
                          options={processStepOptions}
                          value={form.processSteps}
                          onChange={(v) => updateField("processSteps", v)}
                          otherValue={form.processStepsOther}
                          onOtherChange={(v) => updateField("processStepsOther", v)}
                        />
                        <ToggleGrid
                          label="What reusable assets or tools exist?"
                          options={reusableAssetOptions}
                          value={form.techEnablement}
                          onChange={(v) => updateField("techEnablement", v)}
                        />
                        <ValidationDropdowns form={form} updateField={updateField} />
                      </div>
                    )}

                    {/* ── Level 3: Orchestrated Systems ── */}
                    {currentSection === "orchestrated" && (
                      <div className="rounded-2xl border border-slate-200 p-5 space-y-5">
                        <p className="text-base font-bold text-slate-900">
                          Path: {sectionLabels[currentSection]}
                        </p>
                        <ToggleGrid
                          label="Which process steps are connected to AI systems?"
                          options={processStepOptions}
                          value={form.processSteps}
                          onChange={(v) => updateField("processSteps", v)}
                          otherValue={form.processStepsOther}
                          onOtherChange={(v) => updateField("processStepsOther", v)}
                        />
                        <ToggleGrid
                          label="What reusable assets or tools exist?"
                          options={reusableAssetOptions}
                          value={form.techEnablement}
                          onChange={(v) => updateField("techEnablement", v)}
                        />
                        <ToggleGrid
                          label="What orchestration controls are in place?"
                          options={advancedControlOptions}
                          value={form.governanceControls}
                          onChange={(v) => updateField("governanceControls", v)}
                        />
                        <ValidationDropdowns form={form} updateField={updateField} />
                      </div>
                    )}

                    {/* ── Level 4: Adaptive / Autonomous ── */}
                    {currentSection === "adaptive" && (
                      <div className="rounded-2xl border border-slate-200 p-5 space-y-5">
                        <p className="text-base font-bold text-slate-900">
                          Path: {sectionLabels[currentSection]}
                        </p>
                        <ToggleGrid
                          label="What advanced controls are in place?"
                          options={advancedControlOptions}
                          value={form.governanceControls}
                          onChange={(v) => updateField("governanceControls", v)}
                        />
                        <ToggleGrid
                          label="Which advanced technology capabilities exist?"
                          options={reusableAssetOptions}
                          value={form.techEnablement}
                          onChange={(v) => updateField("techEnablement", v)}
                        />
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Describe the human oversight model
                          </label>
                          <textarea
                            className="w-full border border-slate-200 rounded-xl p-3 text-sm min-h-[90px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Where do humans approve, override, monitor, or handle exceptions?"
                            value={form.humanOversight}
                            onChange={(e) => updateField("humanOversight", e.target.value)}
                          />
                        </div>
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

// ── SurveyView.jsx — Survey form extracted from App.jsx ──────────────────────

import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

import {
  tribes,
  roleTypes,
  frequencies,
  criticalities,
  processTypeOptions,
  clientDataOptions,
  aiUsageOptions,
} from "@/data/formConfig";
import { SECTION_QUESTIONS } from "@/data/questions";
import { domains } from "@/data/levelConfig";
import { Settings } from "lucide-react";

import { FormSelect } from "@/components/FormSelect";
import { ToggleGrid } from "@/components/ToggleGrid";
import { DomainCards } from "@/components/DomainCards";
import { ClassificationCard } from "@/components/ClassificationCard";
import { BranchingPreview } from "@/components/BranchingPreview";
import { NeedsValidation } from "@/components/NeedsValidation";

export const SurveyView = ({ form, updateField, currentSection, recommendedLevel, domainActive }) => {
  const isActive = currentSection !== "screening";
  const isNeedsValidation = currentSection === "needs-validation";
  const questions = SECTION_QUESTIONS[currentSection] || null;

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pt-12 -mb-6">
        <h1 className="text-3xl font-black text-white tracking-tight">
          Roadmap for <span className="text-blue-400">Intelligent Era</span>
        </h1>
      </div>
      <DomainCards domainActive={domainActive} form={form} />
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

              {/* Row 1b: Process Type */}
              <FormSelect
                label="Process Type"
                value={form.processType}
                onChange={(v) => updateField("processType", v)}
                options={processTypeOptions}
                placeholder="Select..."
              />

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
                    {/* ── Level-Specific Questions (Grouped by Domain) ── */}
                    {questions && (
                      <div className="space-y-6">
                        {["clientCentric", "operatingModel", "people"].map((domainId) => {
                          const domainQuestions = questions.filter((q) => q.domain === domainId);
                          const domainInfo = domains.find((d) => d.id === domainId);
                          
                          if (domainQuestions.length === 0) return null;

                          return (
                            <div key={domainId} className="rounded-2xl border border-slate-200 p-6 space-y-6 bg-white shadow-sm">
                              <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                  <Settings size={18} />
                                </div>
                                <div>
                                  <h3 className="text-sm font-bold text-slate-900">{domainInfo?.title}</h3>
                                  <p className="text-xs text-slate-400">{domainInfo?.desc}</p>
                                </div>
                              </div>

                              <div className="space-y-8">
                                {domainQuestions.map((q) => {
                                  return (
                                    <div key={q.id} className="space-y-3">
                                      {q.type === "select" && (
                                        <FormSelect
                                          label={q.label}
                                          value={form[q.field] || ""}
                                          onChange={(v) => updateField(q.field, v)}
                                          options={q.options}
                                          placeholder="Select…"
                                          otherValue={q.otherField ? form[q.otherField] : undefined}
                                          onOtherChange={q.otherField ? (v) => updateField(q.otherField, v) : undefined}
                                        />
                                      )}
                                      
                                      {q.type === "toggle" && (
                                        <ToggleGrid
                                          label={q.label}
                                          options={q.options}
                                          value={form[q.field] || []}
                                          onChange={(v) => updateField(q.field, v)}
                                          otherValue={q.otherField ? form[q.otherField] : undefined}
                                          onOtherChange={q.otherField ? (v) => updateField(q.otherField, v) : undefined}
                                        />
                                      )}

                                      {q.type === "input" && (
                                        <div className="space-y-2">
                                          <label className="block text-sm font-medium text-slate-700">{q.label}</label>
                                          <input
                                            type="text"
                                            className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder={q.placeholder || ""}
                                            value={form[q.field] || ""}
                                            onChange={(e) => updateField(q.field, e.target.value)}
                                          />
                                        </div>
                                      )}

                                      {q.type === "textarea" && (
                                        <div className="space-y-2">
                                          <label className="block text-sm font-medium text-slate-700">{q.label}</label>
                                          <textarea
                                            className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 min-h-[90px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder={q.placeholder || ""}
                                            value={form[q.field] || ""}
                                            onChange={(e) => updateField(q.field, e.target.value)}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}


                    {/* ── Needs Validation ── */}
                    {isNeedsValidation && (
                      <NeedsValidation form={form} updateField={updateField} />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* ── Right column ── */}
        <div className="space-y-6">
          <ClassificationCard
            recommendedLevel={recommendedLevel}
            currentSection={currentSection}
          />
          <BranchingPreview currentSection={currentSection} />
        </div>
      </div>
    </>
  );
};

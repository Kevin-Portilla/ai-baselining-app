import { useState, useMemo, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

import {
  assessmentScopeOptions,
  roleTypes,
  frequencies,
  criticalities,
  processTypeOptions,
  clientDataOptions,
  aiUsageOptions,
} from "@/data/formConfig";
import { AI_BASELINE_TRIBES, getServicesProductsByTribe } from "@/data/aiBaselineCatalog";
import { SECTION_QUESTIONS } from "@/data/questions";
import { domains } from "@/data/levelConfig";
import { Settings, Save } from "lucide-react";

import { FormSelect } from "@/components/FormSelect";
import { ToggleGrid } from "@/components/ToggleGrid";
import { DomainCards } from "@/components/DomainCards";
import { ClassificationCard } from "@/components/ClassificationCard";
import { BranchingPreview } from "@/components/BranchingPreview";
import { NeedsValidation } from "@/components/NeedsValidation";
import { getAssessmentTarget } from "@/logic/assessmentTarget";

export const SurveyView = ({ form, updateField, currentSection, recommendedLevel, domainActive }) => {
  const [step, setStep] = useState(1);
  const isActive = currentSection !== "screening";
  const isNeedsValidation = currentSection === "needs-validation";
  const questions = SECTION_QUESTIONS[currentSection] || null;
  const assessmentTarget = getAssessmentTarget(form);
  const isTeamAssessment = assessmentTarget.isTeam;
  const serviceProductOptions = useMemo(
    () => getServicesProductsByTribe(form.tribe),
    [form.tribe]
  );

  const [questionLabels, setQuestionLabels] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem("surveyQuestionLabels")) || {};
    } catch {
      return {};
    }
  });
  const [activeQuestionEditId, setActiveQuestionEditId] = useState(null);
  const [editLabelValue, setEditLabelValue] = useState("");
  const activeEditRef = useRef(null);

  useEffect(() => {
    if (!activeQuestionEditId) return;

    const handleClickOutside = (event) => {
      if (activeEditRef.current && !activeEditRef.current.contains(event.target)) {
        cancelQuestionLabelEdit();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeQuestionEditId]);

  const getQuestionLabel = (q) => questionLabels[q.id] ?? q.label;
  const saveQuestionLabel = (qId, label) => {
    const next = { ...questionLabels, [qId]: label };
    setQuestionLabels(next);
    localStorage.setItem("surveyQuestionLabels", JSON.stringify(next));
  };
  const startQuestionLabelEdit = (q) => {
    setActiveQuestionEditId(q.id);
    setEditLabelValue(getQuestionLabel(q));
  };
  const cancelQuestionLabelEdit = () => setActiveQuestionEditId(null);
  const commitQuestionLabelEdit = (qId) => {
    if (!editLabelValue.trim()) {
      cancelQuestionLabelEdit();
      return;
    }
    saveQuestionLabel(qId, editLabelValue.trim());
    setActiveQuestionEditId(null);
  };

  // Clamp step to valid range when section changes (avoids out-of-range step)
  const effectiveStep = isActive ? step : 1;

  const availableDomains = useMemo(() => {
    if (!questions) return [];
    return ["clientCentric", "operatingModel", "people"].filter(
      dId => questions.some(q => q.domain === dId)
    );
  }, [questions]);

  const totalSteps = 1 + availableDomains.length + (isNeedsValidation ? 1 : 0);

  const nextStep = () => setStep(s => Math.min(totalSteps, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="max-w-7xl mx-auto px-6 pt-8 pb-20 flex flex-col lg:flex-row gap-8 items-start">
      
      {/* ── Main Content (Left Column) ── */}
      <div className="flex-1 min-w-0 space-y-8">
        
        {/* Domain cards matrix */}
        <DomainCards domainActive={domainActive} form={form} />

        {/* ── Form Card ── */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          
          {/* Step Indicator Header */}
          <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-4 flex items-center justify-between">
            <div className="flex gap-2">
              {[...Array(totalSteps)].map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i + 1 === effectiveStep ? "w-8 bg-blue-600" : i + 1 < effectiveStep ? "w-4 bg-blue-200" : "w-4 bg-slate-200"
                  )}
                />
              ))}
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Step {effectiveStep} of {totalSteps}
            </span>
          </div>

          <div className="p-8 space-y-8">
            <AnimatePresence mode="wait">
              {/* STEP 1: GENERAL INFO */}
              {effectiveStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Assessment Context</h2>
                      <p className="text-[10px] text-blue-600 mt-0.5 uppercase font-bold tracking-widest">Team-level diagnosis with optional process context</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <FormSelect label="Assessment scope" value={form.assessmentScope} onChange={(v) => updateField("assessmentScope", v)} options={assessmentScopeOptions} placeholder="Select..." highlight />
                    <FormSelect label="Tribe" value={form.tribe} onChange={(v) => updateField("tribe", v)} options={AI_BASELINE_TRIBES} placeholder="Select..." />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Team</label>
                      <input
                        className="w-full border border-slate-200 bg-slate-50/50 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all hover:bg-white"
                        placeholder="Example: Client Operations Enablement"
                        value={form.teamName}
                        onChange={(e) => updateField("teamName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Area</label>
                      <input
                        className="w-full border border-slate-200 bg-slate-50/50 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all hover:bg-white"
                        placeholder="Example: Managed Operations"
                        value={form.area}
                        onChange={(e) => updateField("area", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Director</label>
                      <input
                        className="w-full border border-slate-200 bg-slate-100/70 rounded-xl p-3 text-sm text-slate-700 focus:outline-none cursor-not-allowed"
                        placeholder="Auto-populated from Tribe"
                        value={form.director}
                        readOnly
                      />
                    </div>
                    <FormSelect
                      label="Service / Product"
                      value={form.serviceProduct}
                      onChange={(v) => updateField("serviceProduct", v)}
                      options={serviceProductOptions}
                      placeholder={form.tribe ? "Select..." : "Select a Tribe first"}
                      disabled={!form.tribe}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Squad</label>
                      <input
                        className="w-full border border-slate-200 bg-slate-50/50 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all hover:bg-white"
                        placeholder="Example: AI Enablement Squad"
                        value={form.squad}
                        onChange={(e) => updateField("squad", e.target.value)}
                      />
                    </div>
                    <FormSelect label="Role type" value={form.role} onChange={(v) => updateField("role", v)} options={roleTypes} placeholder="Select..." />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <FormSelect label="Process Type" value={form.processType} onChange={(v) => updateField("processType", v)} options={processTypeOptions} placeholder={isTeamAssessment ? "Optional..." : "Select..."} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Manager Name</label>
                      <input
                        className="w-full border border-slate-200 bg-slate-50/50 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all hover:bg-white"
                        placeholder="e.g. John Smith"
                        value={form.managerName}
                        onChange={(e) => updateField("managerName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">SME Name</label>
                      <input
                        className="w-full border border-slate-200 bg-slate-50/50 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all hover:bg-white"
                        placeholder="e.g. Jane Doe"
                        value={form.smeName}
                        onChange={(e) => updateField("smeName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">{isTeamAssessment ? "Supporting process name" : "Process name"}</label>
                      <input
                        className="w-full border border-slate-200 bg-slate-50/50 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all hover:bg-white"
                        placeholder={isTeamAssessment ? "Optional process context" : "Example: SecureNow report validation"}
                        value={form.processName}
                        onChange={(e) => updateField("processName", e.target.value)}
                      />
                    </div>
                    <FormSelect label="Execution frequency" value={form.frequency} onChange={(v) => updateField("frequency", v)} options={frequencies} placeholder="Select..." />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <FormSelect label="Sensitive Data Handling" value={form.clientData} onChange={(v) => updateField("clientData", v)} options={clientDataOptions} placeholder="Select..." />
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Main systems / platforms</label>
                      <input
                        className="w-full border border-slate-200 bg-slate-50/50 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all hover:bg-white"
                        placeholder="Example: Salesforce, Jira, Power BI"
                        value={form.mainSystems}
                        onChange={(e) => updateField("mainSystems", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">{isTeamAssessment ? "Team / process context" : "Brief process description"}</label>
                    <textarea
                      className="w-full border border-slate-200 bg-slate-50/50 rounded-xl p-3 text-sm text-slate-900 min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all hover:bg-white"
                      placeholder={isTeamAssessment ? "Describe how the team operates and any supporting process context..." : "Describe the operational workflow..."}
                      value={form.processDescription}
                      onChange={(e) => updateField("processDescription", e.target.value)}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <FormSelect label="Process criticality" value={form.criticality} onChange={(v) => updateField("criticality", v)} options={criticalities} placeholder="Select..." />
                    <FormSelect label="Current AI usage" value={form.aiUsage} onChange={(v) => updateField("aiUsage", v)} options={aiUsageOptions} placeholder="Select..." highlight />
                  </div>
                </motion.div>
              )}

              {/* DOMAIN STEPS */}
              {availableDomains.map((domainId, idx) => {
                const domainStep = idx + 2;
                if (effectiveStep !== domainStep) return null;

                const domainQuestions = questions.filter((q) => q.domain === domainId);
                const domainInfo = domains.find((d) => d.id === domainId);

                return (
                  <motion.div
                    key={domainId}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                      <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md">
                        <Settings size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">{domainInfo?.title}</h3>
                        <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Maturity Diagnostic</p>
                      </div>
                    </div>

                    <div className="space-y-8 py-4">
                      {domainQuestions.map((q) => {
                        const label = getQuestionLabel(q);
                        const isEditing = activeQuestionEditId === q.id;
                        const hasLabelChanged = editLabelValue.trim() !== label;

                        return (
                          <div key={q.id} className="space-y-2">
                            <div ref={isEditing ? activeEditRef : null} className="flex items-center justify-between gap-3">
                              {isEditing ? (
                                <input
                                  className="flex-1 min-w-0 max-w-[calc(100%-90px)] border border-blue-300 bg-blue-50 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                  value={editLabelValue}
                                  onChange={(e) => setEditLabelValue(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      commitQuestionLabelEdit(q.id);
                                    }
                                    if (e.key === "Escape") {
                                      cancelQuestionLabelEdit();
                                    }
                                  }}
                                  autoFocus
                                />
                              ) : (
                                <p
                                  className="flex-1 min-w-0 cursor-text text-[10px] font-black uppercase tracking-widest text-slate-500"
                                  onDoubleClick={() => startQuestionLabelEdit(q)}
                                >
                                  {label}
                                </p>
                              )}

                              <div className="flex items-center gap-2">
                                {isEditing ? (
                                  <>
                                    {hasLabelChanged && (
                                      <button
                                        type="button"
                                        onClick={() => commitQuestionLabelEdit(q.id)}
                                        className="rounded-full border border-blue-200 bg-blue-50 p-2 text-blue-700 hover:bg-blue-100"
                                        aria-label="Save question label"
                                      >
                                        <Save size={14} />
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => cancelQuestionLabelEdit()}
                                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-100"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : null}
                              </div>
                            </div>

                            {q.type === "select" && (
                              <FormSelect
                                label=""
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
                                label=""
                                options={q.options}
                                value={form[q.field] || []}
                                onChange={(v) => updateField(q.field, v)}
                                otherValue={q.otherField ? form[q.otherField] : undefined}
                                onOtherChange={q.otherField ? (v) => updateField(q.otherField, v) : undefined}
                              />
                            )}
                            {q.type === "input" && (
                              <div className="space-y-1.5">
                                <input
                                  className="w-full border border-slate-200 bg-white rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
                                  value={form[q.field] || ""}
                                  onChange={(e) => updateField(q.field, e.target.value)}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}

              {/* VALIDATION STEP */}
              {isNeedsValidation && effectiveStep === totalSteps && (
                <motion.div
                  key="validation"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <NeedsValidation form={form} updateField={updateField} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-100">
              <button
                onClick={prevStep}
                disabled={effectiveStep === 1}
                className={cn(
                  "px-6 py-2.5 rounded-xl font-bold text-sm transition-all",
                  effectiveStep === 1 ? "opacity-0 pointer-events-none" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                Back
              </button>

              {effectiveStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  disabled={effectiveStep === 1 && !form.aiUsage}
                  className={cn(
                    "px-8 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg",
                    effectiveStep === 1 && !form.aiUsage
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none" 
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 shadow-blue-500/20"
                  )}
                >
                  Next Step
                </button>
              ) : (
                <div className="px-6 py-2.5 bg-green-50 text-green-700 border border-green-100 rounded-xl font-black text-xs uppercase tracking-widest">
                  Assessment Complete
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sidebar (Right Column) ── */}
      <div className="w-full lg:w-[320px] shrink-0 space-y-6 lg:sticky lg:top-8">
        <ClassificationCard
          recommendedLevel={recommendedLevel}
          currentSection={currentSection}
          assessmentTarget={assessmentTarget}
        />
        <BranchingPreview currentSection={currentSection} />
      </div>

    </div>
  );
};

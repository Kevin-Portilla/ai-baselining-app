// ── NeedsValidation.jsx — amber needs-validation section ─────────────────────

import { FormSelect } from "@/components/FormSelect";
import { NEEDS_VALIDATION_QUESTIONS } from "@/data/questions";

export const NeedsValidation = ({ form, updateField }) => (
  <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-8 space-y-8 relative overflow-hidden shadow-inner">
    <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400" />
    
    <div className="flex items-start gap-5">
      <div className="w-12 h-12 rounded-2xl bg-white border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm shrink-0">
        <span className="font-black text-2xl">!</span>
      </div>
      <div>
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Path: Needs Validation</h3>
        <p className="text-[12px] text-amber-700 mt-1 leading-relaxed font-medium">
          The respondent is not sure whether AI is used. Please provide additional context to help route this assessment correctly.
        </p>
      </div>
    </div>

    <div className="space-y-10">
      {NEEDS_VALIDATION_QUESTIONS.map((q) => {
        if (q.type === "select") {
          return (
            <FormSelect
              key={q.id}
              label={q.label}
              value={form[q.field] || ""}
              onChange={(v) => updateField(q.field, v)}
              options={q.options}
              placeholder="Select..."
              otherValue={q.otherField ? form[q.otherField] : undefined}
              onOtherChange={q.otherField ? (v) => updateField(q.otherField, v) : undefined}
            />
          );
        }
        if (q.type === "input") {
          return (
            <div key={q.id} className="space-y-2">
              <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500">{q.label}</label>
              <input
                className="w-full border border-slate-200 bg-white rounded-2xl p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all hover:border-slate-300"
                placeholder={q.placeholder || ""}
                value={form[q.field] || ""}
                onChange={(e) => updateField(q.field, e.target.value)}
              />
            </div>
          );
        }
        if (q.type === "textarea") {
          return (
            <div key={q.id} className="space-y-2">
              <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500">{q.label}</label>
              <textarea
                className="w-full border border-slate-200 bg-white rounded-2xl p-4 text-sm text-slate-900 placeholder:text-slate-400 min-h-[120px] resize-y focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all hover:border-slate-300"
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

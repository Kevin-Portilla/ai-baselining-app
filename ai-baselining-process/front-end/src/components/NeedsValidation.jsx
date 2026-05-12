// ── NeedsValidation.jsx — amber needs-validation section ─────────────────────

import { FormSelect } from "@/components/FormSelect";
import { NEEDS_VALIDATION_QUESTIONS } from "@/data/questions";

export const NeedsValidation = ({ form, updateField }) => (
  <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-5 space-y-4">
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">!</div>
      <div>
        <p className="text-base font-bold text-amber-900">Path: Needs Validation</p>
        <p className="text-sm text-amber-800 mt-1 leading-relaxed">
          The respondent is not sure whether AI is used. Please answer the following to help route this assessment correctly.
        </p>
      </div>
    </div>

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
          <div key={q.id}>
            <label className="block text-sm font-medium text-amber-900 mb-1">{q.label}</label>
            <input
              className="w-full border border-amber-300 bg-white rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder={q.placeholder || ""}
              value={form[q.field] || ""}
              onChange={(e) => updateField(q.field, e.target.value)}
            />
          </div>
        );
      }
      if (q.type === "textarea") {
        return (
          <div key={q.id}>
            <label className="block text-sm font-medium text-amber-900 mb-1">{q.label}</label>
            <textarea
              className="w-full border border-amber-300 bg-white rounded-xl p-3 text-sm min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-amber-400"
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
);

// ── ToggleGrid.jsx — multi-select toggle button grid ─────────────────────────

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const ToggleGrid = ({ label, options, value, onChange, otherValue, onOtherChange }) => {
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

// ── ToggleGrid.jsx — multi-select toggle button grid ─────────────────────────

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const ToggleGrid = ({ label, options, value, onChange, otherValue, onOtherChange }) => {
  const toggle = (opt) =>
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);

  const hasOther = options.includes("Other");
  const otherSelected = value.includes("Other");

  return (
    <div className="space-y-3">
      {label && <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const isSelected = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={cn(
                "group relative p-3 rounded-xl text-sm text-left border transition-all duration-300",
                isSelected
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10"
                  : "bg-slate-50/50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white hover:shadow-sm"
              )}
            >
              <div className="flex items-center gap-2.5">
                <div className={cn(
                  "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all",
                  isSelected 
                    ? "bg-white border-white" 
                    : "bg-white border-slate-300 group-hover:border-blue-400"
                )}>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </div>
                <span className="font-semibold text-[13px]">{opt}</span>
              </div>
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {hasOther && otherSelected && onOtherChange && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <input
              autoFocus
              className="w-full border border-blue-200 bg-blue-50/30 rounded-xl p-3 text-sm text-slate-900 placeholder:text-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/10 mt-1.5"
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

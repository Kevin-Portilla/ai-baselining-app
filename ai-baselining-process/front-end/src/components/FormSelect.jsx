// ── FormSelect.jsx — labelled select field with optional Other input ──────────

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FormSelect = ({ label, value, onChange, options, placeholder, highlight, otherValue, onOtherChange }) => (
  <div className="space-y-1.5">
    <label
      className={cn(
        "block text-[10px] font-black uppercase tracking-widest transition-colors",
        highlight ? "text-blue-600" : "text-slate-500"
      )}
    >
      {label}
    </label>
    <div className="relative group">
      <select
        className="w-full border border-slate-200 bg-slate-50/50 rounded-xl p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 appearance-none cursor-pointer transition-all hover:bg-white hover:border-slate-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '0.85rem' }}
      >
        <option value="" className="bg-white text-slate-400">{placeholder || "Select…"}</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-white text-slate-900">{o}</option>
        ))}
      </select>
    </div>

    <AnimatePresence>
      {value === "Other" && onOtherChange && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
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

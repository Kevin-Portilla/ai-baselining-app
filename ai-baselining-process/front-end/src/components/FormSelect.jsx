// ── FormSelect.jsx — labelled select field with optional Other input ──────────

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FormSelect = ({ label, value, onChange, options, placeholder, highlight, otherValue, onOtherChange }) => (
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

    <AnimatePresence>
      {value === "Other" && onOtherChange && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 8 }}
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

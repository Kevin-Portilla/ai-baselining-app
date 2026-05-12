// ── Header.jsx — dark header with title, subtitle, and completion widget ──────

import { motion } from "framer-motion";

export const Header = ({ completion }) => (
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
);

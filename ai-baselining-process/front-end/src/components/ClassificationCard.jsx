// ── ClassificationCard.jsx — right sidebar dark card with recommended level ───

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  levelPillClass,
  levelIcons,
  levelShortLabels,
  levelDescriptions,
} from "@/data/levelConfig";
import { Icon } from "@/components/Icon";

export const ClassificationCard = ({ recommendedLevel, currentSection, assessmentTarget }) => {
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
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden group">
      {/* Decorative accent */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full" />
      
      <h3 className="font-bold text-lg text-white relative z-10">Recommended Classification</h3>
      <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed relative z-10">
        Based on governance, technology, and execution indicators.
      </p>
      {assessmentTarget && (
        <p className="text-[11px] text-blue-200 mt-2 leading-relaxed relative z-10">
          Evaluating {assessmentTarget.scope.toLowerCase()}: <span className="font-bold text-white">{assessmentTarget.label}</span>
        </p>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={recommendedLevel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={cn("mt-5 rounded-xl p-4 flex items-center gap-4 relative z-10", pillClass)}
        >
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg shrink-0",
              pillIconClass
            )}
          >
            <Icon type={levelIcons[recommendedLevel] || "network"} />
          </div>
          <div>
            <p className={cn("text-[10px] uppercase font-black tracking-widest opacity-80", pillLabelClass)}>
              Current Maturity
            </p>
            <p className={cn("text-lg font-black leading-tight mt-0.5", pillTitleClass)}>
              {classificationTitle}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-5 pt-5 border-t border-slate-800/50 relative z-10">
        <p className="text-xs text-slate-400 leading-relaxed italic">
          "{levelDescriptions[recommendedLevel] || levelDescriptions.screening}"
        </p>
      </div>
    </div>
  );
};

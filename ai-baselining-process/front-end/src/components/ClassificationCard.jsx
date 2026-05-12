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

export const ClassificationCard = ({ recommendedLevel, currentSection }) => {
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
    <div className="bg-slate-900 rounded-2xl p-6">
      <h3 className="font-bold text-lg text-white">Recommended Classification</h3>
      <p className="text-xs text-blue-400 mt-1 leading-relaxed">
        Calculated from usage path plus governance, measurement, and technology indicators.
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={recommendedLevel}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn("mt-4 rounded-xl p-4 flex items-start gap-4", pillClass)}
        >
          <div
            className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold shrink-0",
              pillIconClass
            )}
          >
            <Icon type={levelIcons[recommendedLevel] || "network"} />
          </div>
          <div>
            <p className={cn("text-xs uppercase tracking-wide", pillLabelClass)}>
              Maturity Level
            </p>
            <p className={cn("text-xl font-bold leading-snug mt-0.5", pillTitleClass)}>
              {classificationTitle}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 text-sm text-blue-300 leading-relaxed">
        {levelDescriptions[recommendedLevel] || levelDescriptions.screening}
      </p>
    </div>
  );
};

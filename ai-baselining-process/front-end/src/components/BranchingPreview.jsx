// ── BranchingPreview.jsx — branching logic preview card (right sidebar) ──────

import { cn } from "@/lib/utils";
import { branchingLevels } from "@/data/levelConfig";
import { Icon } from "@/components/Icon";

export const BranchingPreview = ({ currentSection }) => (
  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
    <h3 className="font-bold text-lg text-white mb-4">
      Branching Logic Preview
    </h3>
    <div className="space-y-3">
      {branchingLevels.map(({ id, section, label, icon, desc }) => {
        const active = currentSection === section;
        return (
          <div
            key={id}
            className={cn(
              "rounded-xl border p-3 transition-all duration-300",
              active 
                ? "bg-blue-600/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]" 
                : "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-colors",
                  active ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-400"
                )}
              >
                <Icon type={icon} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "font-bold text-[13px] transition-colors leading-tight",
                    active ? "text-white" : "text-slate-300"
                  )}
                >
                  {label}
                </p>
                <p
                  className={cn(
                    "text-[10px] mt-0.5 leading-relaxed transition-colors",
                    active ? "text-blue-100/80" : "text-slate-500"
                  )}
                >
                  {desc}
                </p>
              </div>
              {active && (
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 text-white text-[8px] shrink-0 mt-0.5">
                  ✓
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

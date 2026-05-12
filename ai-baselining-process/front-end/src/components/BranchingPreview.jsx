// ── BranchingPreview.jsx — branching logic preview card (right sidebar) ──────

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { branchingLevels } from "@/data/levelConfig";
import { Icon } from "@/components/Icon";

export const BranchingPreview = ({ currentSection }) => (
  <Card className="rounded-2xl">
    <CardContent className="p-6">
      <h3 className="font-bold text-lg text-slate-900 mb-4">
        Branching Logic Preview
      </h3>
      <div className="space-y-3">
        {branchingLevels.map(({ id, section, label, icon, desc }) => {
          const active = currentSection === section;
          return (
            <div
              key={id}
              className={cn(
                "rounded-xl border p-4 transition-all duration-200",
                active ? "bg-blue-600 border-transparent" : "bg-white border-slate-200"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold",
                    active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  )}
                >
                  <Icon type={icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "font-semibold text-sm",
                      active ? "text-white" : "text-slate-900"
                    )}
                  >
                    {label}
                  </p>
                  <p
                    className={cn(
                      "text-xs mt-0.5 leading-relaxed",
                      active ? "text-blue-100" : "text-slate-500"
                    )}
                  >
                    {desc}
                  </p>
                </div>
                {active && (
                  <span className="text-white text-sm shrink-0 mt-0.5">✓</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

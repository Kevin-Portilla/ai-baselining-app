// ── DomainCards.jsx — Refined, Aesthetic Roadmap Matrix ─────────────────────

import { domains, strategicStages } from "@/data/levelConfig";
import { 
  CheckCircle2, 
  ArrowRight
} from "lucide-react";

export const DomainCards = ({ domainActive, form }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-10 pb-12 overflow-x-auto select-none">
      <div className="min-w-[1000px] bg-white/80 backdrop-blur-md rounded-[32px] border border-slate-100 p-8 shadow-2xl shadow-blue-900/5">
        
        {/* ── Top Headers (Strategic Stages) ── */}
        <div className="grid grid-cols-[200px_1fr_1fr_1fr_1fr] gap-3 mb-6">
          <div /> {/* Corner spacer */}
          {strategicStages.map((stage, idx) => (
            <div 
              key={stage.id} 
              className="relative flex items-center justify-center h-11 bg-[#0052CC] text-white font-bold text-[11px] px-6 tracking-[0.05em] uppercase rounded-sm"
              style={{
                clipPath: idx === 0 
                  ? "polygon(0% 0%, 96% 0%, 100% 50%, 96% 100%, 0% 100%)"
                  : idx === strategicStages.length - 1
                  ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 4% 50%)"
                  : "polygon(0% 0%, 96% 0%, 100% 50%, 96% 100%, 0% 100%, 4% 50%)",
                marginLeft: idx > 0 ? "-12px" : "0"
              }}
            >
              {stage.title}
            </div>
          ))}
        </div>

        {/* ── Rows (Domains) ── */}
        <div className="space-y-4">
          {domains.map((domain) => {
            const isActive = domainActive[domain.id];
            
            return (
              <div key={domain.id} className="grid grid-cols-[200px_1fr_1fr_1fr_1fr] gap-4 items-stretch">
                
                {/* Left Header (Domain) */}
                <div 
                  className="flex flex-col justify-center bg-[#0F172A] text-white p-5 pr-8 relative shadow-sm transition-all duration-500 rounded-l-2xl"
                  style={{
                    clipPath: "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%)"
                  }}
                >
                  <h3 className="text-[13px] font-bold leading-tight tracking-tight">{domain.title}</h3>
                  <p className="text-[10px] text-blue-400 mt-1 font-medium italic opacity-70 leading-none">{domain.subTitle}</p>
                </div>

                {/* Stage Cells */}
                {strategicStages.map((stage) => {
                  const stageData = domain.stages[stage.id];

                  if (!stageData) {
                    return (
                      <div
                        key={stage.id}
                        className="p-5 rounded-2xl border border-dashed border-slate-100 bg-slate-50/20 opacity-30"
                      />
                    );
                  }

                  return (
                    <div
                      key={stage.id}
                      className={`p-5 rounded-2xl border transition-all duration-500 ${
                        isActive
                          ? "bg-white border-blue-100 shadow-sm"
                          : "bg-slate-50/40 border-slate-50 opacity-60 grayscale-[0.2]"
                      }`}
                    >
                      {/* Category Header */}
                      <h4 className="text-[11px] font-extrabold text-[#EA580C] uppercase tracking-wider mb-4 min-h-[24px] leading-tight flex items-center">
                        {stageData.category}
                      </h4>

                      {/* Subcategory List */}
                      <div className="space-y-2.5">
                        {stageData.subcategories.map((sub, sIdx) => {
                          const isSubActive = sub.fields?.some(f => {
                            const val = form[f];
                            return Array.isArray(val) ? val.length > 0 : !!val;
                          }) ?? false;

                          return (
                            <div key={sIdx} className="flex items-start gap-2.5 group">
                              <div className="mt-0.5 shrink-0 opacity-40">
                                <ArrowRight size={12} className={isSubActive ? "text-blue-500 opacity-100" : "text-slate-300"} strokeWidth={3} />
                              </div>

                              <div className="flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <span className={`text-[11px] font-semibold leading-relaxed transition-colors duration-300 ${isSubActive ? "text-slate-900" : "text-slate-400"}`}>
                                    {sub.name}
                                  </span>
                                  {isSubActive && (
                                    <div className="bg-emerald-500 p-0.5 rounded-full ring-4 ring-emerald-50 shrink-0">
                                      <CheckCircle2 size={10} className="text-white" strokeWidth={4} />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

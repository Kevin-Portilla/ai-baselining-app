// ── DomainCards.jsx — Dark Roadmap for Intelligent Era Matrix ────────────────

import { domains, strategicStages } from "@/data/levelConfig";
import { cn } from "@/lib/utils";
import {
  Target, Rocket, Sparkles,
  Users, Settings, User,
  FileCheck, Cpu, GraduationCap,
  Globe, ShieldCheck, Star,
  TrendingUp, Diamond,
} from "lucide-react";

const STAGE_CFG = {
  sbp: { bg: "linear-gradient(145deg,#112254 0%,#1A3464 60%,#112254 100%)", icon: Target,   accent: "#38BDF8" },
  sd:  { bg: "linear-gradient(145deg,#1E1060 0%,#2D1F80 60%,#1E1060 100%)", icon: Rocket,   accent: "#A78BFA" },
  dh:  { bg: "linear-gradient(145deg,#3B0E52 0%,#5A2070 60%,#3B0E52 100%)", icon: Sparkles, accent: "#F472B6" },
};

const DOMAIN_CFG = {
  clientCentric:  { icon: Users,    accent: "#38BDF8" },
  operatingModel: { icon: Settings, accent: "#34D399" },
  people:         { icon: User,     accent: "#A78BFA" },
};

const CAT_ICON = {
  sbp: { clientCentric: Target,      operatingModel: FileCheck,    people: TrendingUp    },
  sd:  { clientCentric: Users,       operatingModel: Cpu,          people: GraduationCap },
  dh:  { clientCentric: Globe,       operatingModel: ShieldCheck,  people: Star          },
};

export const DomainCards = ({ domainActive, form }) => (
  <div
    className="rounded-2xl overflow-hidden shadow-2xl border border-slate-800/60 h-full"
    style={{ background: "linear-gradient(160deg,#07091A 0%,#0D1226 100%)" }}
  >
      {/* ── Header row ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-[180px_1fr_1fr_1fr]">

        {/* Top-left title */}
        <div className="px-5 py-4 flex flex-col justify-end border-b border-slate-700/40">
          <h2 className="text-[16px] font-black text-white leading-snug tracking-tight">
            Roadmap for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400">
              Intelligent Era
            </span>
          </h2>
          <p className="text-[9px] text-slate-500 mt-1 leading-relaxed">
            Building the foundation for an AI-powered future of delivery.
          </p>
        </div>

        {/* Stage headers */}
        {strategicStages.map((stage) => {
          const cfg = STAGE_CFG[stage.id];
          const StageIcon = cfg.icon;
          return (
            <div
              key={stage.id}
              className="px-4 py-4 border-l border-b border-slate-700/40 flex flex-col justify-between"
              style={{ background: cfg.bg }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <StageIcon size={13} className="text-white" />
                </div>
                <span className="text-[28px] font-black leading-none" style={{ color: "rgba(255,255,255,0.12)" }}>
                  {stage.number}
                </span>
              </div>
              <div>
                <p className="text-[9px] font-black text-white uppercase tracking-[0.1em] leading-snug">
                  {stage.title}
                </p>
                <p className="text-[8px] text-white/40 mt-0.5 italic">{stage.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Domain rows ──────────────────────────────────────────────────── */}
      {domains.map((domain) => {
        const isActive = domainActive[domain.id];
        const dcfg = DOMAIN_CFG[domain.id];
        const DomainIcon = dcfg.icon;

        return (
          <div
            key={domain.id}
            className="grid grid-cols-[180px_1fr_1fr_1fr] border-t border-slate-700/40"
          >
            {/* Domain label */}
            <div
              className="px-5 py-4 flex flex-col justify-center relative"
              style={{ background: "linear-gradient(160deg,#07091A 0%,#0D1226 100%)" }}
            >
              <div
                className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full"
                style={{ background: dcfg.accent }}
              />
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                style={{ background: `${dcfg.accent}22` }}
              >
                <DomainIcon size={15} style={{ color: dcfg.accent }} />
              </div>
              <h3 className="text-[11px] font-bold text-white leading-tight">{domain.title}</h3>
              <p className="text-[9px] mt-0.5 font-medium" style={{ color: dcfg.accent }}>
                {domain.subTitle?.replace(/[()]/g, "")}
              </p>
            </div>

            {/* Stage cells */}
            {strategicStages.map((stage) => {
              const stageData = domain.stages[stage.id];
              const scfg = STAGE_CFG[stage.id];
              const CatIcon = CAT_ICON[stage.id]?.[domain.id];
              const catColor = scfg.accent;

              if (!stageData) {
                return (
                  <div
                    key={stage.id}
                    className="border-l border-slate-700/40 opacity-10"
                    style={{ background: "#0D1226" }}
                  />
                );
              }

              return (
                <div
                  key={stage.id}
                  className={cn(
                    "px-4 py-4 border-l border-slate-700/40 transition-all duration-500",
                    isActive ? "opacity-100" : "opacity-30"
                  )}
                  style={{ background: "linear-gradient(160deg,#0D1226 0%,#111830 100%)" }}
                >
                  {/* Category header */}
                  <div className="flex items-start justify-between gap-1.5 mb-2.5">
                    <h4
                      className="text-[8.5px] font-black uppercase tracking-[0.08em] leading-tight flex-1"
                      style={{ color: catColor }}
                    >
                      {stageData.category}
                    </h4>
                    {CatIcon && (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${catColor}20` }}
                      >
                        <CatIcon size={11} style={{ color: catColor }} />
                      </div>
                    )}
                  </div>

                  {/* Subcategories */}
                  <div className="space-y-1">
                    {stageData.subcategories.map((sub, sIdx) => {
                      const isSubActive = sub.fields?.some((f) => {
                        const val = form[f];
                        return Array.isArray(val) ? val.length > 0 : !!val;
                      }) ?? false;

                      return (
                        <div key={sIdx} className="flex items-start gap-1.5">
                          <span
                            className="text-[10px] font-bold shrink-0 leading-none mt-px"
                            style={{ color: isSubActive ? catColor : "#1F2937" }}
                          >
                            ✓
                          </span>
                          <span
                            className="text-[9px] leading-relaxed transition-colors duration-300"
                            style={{ color: isSubActive ? "#CBD5E1" : "#1F2937" }}
                          >
                            {sub.name}
                          </span>
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

      {/* ── North Star footer ─────────────────────────────────────────────── */}
      <div
        className="border-t border-slate-700/40 px-5 py-2.5 flex items-center gap-2.5"
        style={{ background: "#07091A" }}
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500 flex items-center justify-center shrink-0">
          <Diamond size={10} className="text-white" />
        </div>
        <span className="text-[9px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 uppercase tracking-widest">
          Our North Star:
        </span>
        <span className="text-[9px] text-slate-500">
          Intelligent delivery. Exponential impact. Human at the center.
        </span>
      </div>
    </div>
);

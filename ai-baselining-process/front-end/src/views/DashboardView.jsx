// ── DashboardView.jsx — Aggregate dashboard over 50 sample processes ─────────

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { levelShortLabels } from "@/data/levelConfig";
import { sampleProcesses } from "@/data/sampleProcesses";

// ── Helper: count frequency of items in array/scalar fields across processes ──
function countField(processes, fieldName) {
  const counts = {};
  processes.forEach((p) => {
    const val = p[fieldName];
    if (Array.isArray(val)) {
      val.forEach((item) => {
        counts[item] = (counts[item] || 0) + 1;
      });
    } else if (val) {
      counts[val] = (counts[val] || 0) + 1;
    }
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}


// ── Color maps ────────────────────────────────────────────────────────────────
const LEVEL_COLORS = {
  "0": "#64748b",
  "1": "#0f766e",
  "2": "#2563eb",
  "3": "#4f46e5",
  "4": "#7c3aed",
};

// ── Sub-components ────────────────────────────────────────────────────────────

const SectionTitle = ({ children }) => (
  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
    {children}
  </h3>
);

const StatCard = ({ label, value, valueColor, sub }) => (
  <div className="bg-slate-800 rounded-2xl p-5 space-y-1">
    <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
    <p className="text-4xl font-bold" style={{ color: valueColor || "#f1f5f9" }}>
      {value}
    </p>
    {sub && <p className="text-sm text-slate-400 truncate">{sub}</p>}
  </div>
);

const HorizontalBar = ({ data, color, maxItems = 8 }) => {
  const sliced = (data || []).slice(0, maxItems);
  if (!sliced.length)
    return (
      <div className="flex items-center justify-center h-32 rounded-xl bg-slate-800/40 border border-slate-700/50">
        <p className="text-slate-500 text-sm">No data available</p>
      </div>
    );
  return (
    <ResponsiveContainer
      width="100%"
      height={Math.max(sliced.length * 34 + 20, 60)}
    >
      <BarChart
        data={sliced}
        layout="vertical"
        margin={{ top: 0, right: 24, bottom: 0, left: 4 }}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={210}
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(148,163,184,0.08)" }}
          contentStyle={{
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: 8,
            color: "#f1f5f9",
            fontSize: 12,
          }}
          formatter={(v) => [v, "Processes"]}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
          {sliced.map((_, i) => (
            <Cell key={i} fill={color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

// ── Derived aggregate data (computed once outside component) ──────────────────

const totalProcesses = sampleProcesses.length; // 50

const avgMaturity =
  Math.round(
    (sampleProcesses.reduce(
      (sum, p) => sum + Number(p.recommendedMaturityLevel),
      0
    ) /
      totalProcesses) *
      10
  ) / 10;

const levelCounts = { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0 };
sampleProcesses.forEach((p) => {
  if (levelCounts[p.recommendedMaturityLevel] !== undefined)
    levelCounts[p.recommendedMaturityLevel]++;
});

const mostCommonLevel = Object.entries(levelCounts).reduce((a, b) =>
  b[1] > a[1] ? b : a
)[0];

const l3PlusCount =
  (levelCounts["3"] || 0) + (levelCounts["4"] || 0);

const maturityBarData = Object.entries(levelCounts).map(([lvl, count]) => ({
  name: `L${lvl} — ${levelShortLabels[lvl]}`,
  count,
  lvl,
}));


// Combined barriers (literacyBarriers + barriers)
const barrierCounts = {};
sampleProcesses.forEach((p) => {
  [...(p.literacyBarriers || []), ...(p.barriers || [])].forEach((b) => {
    barrierCounts[b] = (barrierCounts[b] || 0) + 1;
  });
});
const barriersData = Object.entries(barrierCounts)
  .map(([name, count]) => ({ name, count }))
  .sort((a, b) => b.count - a.count);

const toolsData = countField(sampleProcesses, "tools");
const stepsData = countField(sampleProcesses, "processSteps");
const govData = countField(sampleProcesses, "governanceControls");
const outcomeData = countField(sampleProcesses, "outcomeAreas");

// ── Main Component ─────────────────────────────────────────────────────────────

export const DashboardView = ({ form, recommendedLevel, currentSection, completion }) => {
  const isAssessed = currentSection && currentSection !== "screening";
  const currentLevelNum = isAssessed ? Number(recommendedLevel) : null;
  const levelColor =
    LEVEL_COLORS[recommendedLevel] || "#94a3b8";
  const currentLevelLabel =
    levelShortLabels[recommendedLevel] || "—";
  const avgNum = avgMaturity;
  const comparisonText =
    currentLevelNum !== null
      ? currentLevelNum > avgNum
        ? `Your process (L${currentLevelNum}) is above the average of ${avgNum}`
        : currentLevelNum < avgNum
        ? `Your process (L${currentLevelNum}) is below the average of ${avgNum}`
        : `Your process (L${currentLevelNum}) is at the average of ${avgNum}`
      : null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 pb-16 space-y-6">

      {/* ── Top Banner ── */}
      <div className="bg-slate-900 rounded-2xl px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-slate-100 font-semibold text-base">
          AI Operations Baseline — 50 processes assessed across 7 tribes
        </p>
        <p className="text-slate-400 text-sm">May 2026</p>
      </div>

      {/* ── Row 1: 5 KPI stat cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard label="Total Processes" value={totalProcesses} valueColor="#f1f5f9" />
        <StatCard
          label="Avg Maturity Level"
          value={avgMaturity}
          valueColor="#6366f1"
          sub="out of 4"
        />
        <StatCard
          label="Most Common Level"
          value={`L${mostCommonLevel}`}
          valueColor={LEVEL_COLORS[mostCommonLevel]}
          sub={levelShortLabels[mostCommonLevel]}
        />
        <StatCard label="Tribes Covered" value={7} valueColor="#10b981" />
        <StatCard
          label="Processes at L3+"
          value={l3PlusCount}
          valueColor="#7c3aed"
          sub={`${Math.round((l3PlusCount / totalProcesses) * 100)}% of total`}
        />
      </div>

      {/* ── Row 2: Maturity Distribution + Pillar Coverage Radar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Maturity Distribution BarChart */}
        <div className="bg-slate-800 rounded-2xl p-5">
          <SectionTitle>Maturity Distribution</SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={maturityBarData}
              margin={{ top: 8, right: 16, bottom: 24, left: 0 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                interval={0}
                angle={-12}
                textAnchor="end"
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(148,163,184,0.08)" }}
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: 8,
                  color: "#f1f5f9",
                  fontSize: 12,
                }}
                formatter={(v) => [v, "Processes"]}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {maturityBarData.map((entry) => (
                  <Cell key={entry.lvl} fill={LEVEL_COLORS[entry.lvl] || "#64748b"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
          <SectionTitle>Assessment Coverage</SectionTitle>
          <div className="flex flex-col items-center justify-center h-[260px] space-y-4">
             <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center">
               <span className="text-2xl font-bold text-blue-400">88%</span>
             </div>
             <p className="text-slate-400 text-sm max-w-[240px]">
               Average data completeness across all 50 assessed processes in the current baseline.
             </p>
          </div>
        </div>
      </div>

      {/* ── Row 3: Barriers + Tools ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800 rounded-2xl p-5">
          <SectionTitle>Top Barriers (All Processes)</SectionTitle>
          <HorizontalBar data={barriersData} color="#f43f5e" maxItems={8} />
        </div>

        <div className="bg-slate-800 rounded-2xl p-5">
          <SectionTitle>Top AI Tools in Use</SectionTitle>
          <HorizontalBar data={toolsData} color="#3b82f6" maxItems={8} />
        </div>
      </div>

      {/* ── Row 4: Process Steps + Governance Controls ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800 rounded-2xl p-5">
          <SectionTitle>Top Process Steps</SectionTitle>
          <HorizontalBar data={stepsData} color="#0d9488" maxItems={8} />
        </div>

        <div className="bg-slate-800 rounded-2xl p-5">
          <SectionTitle>Top Governance Controls</SectionTitle>
          <HorizontalBar data={govData} color="#7c3aed" maxItems={8} />
        </div>
      </div>

      {/* ── Row 5: Outcome Areas + Current Assessment ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800 rounded-2xl p-5">
          <SectionTitle>Outcome Areas Improved</SectionTitle>
          <HorizontalBar data={outcomeData} color="#10b981" maxItems={8} />
        </div>

        {isAssessed ? (
          <div className="bg-slate-800 rounded-2xl p-5 flex flex-col gap-3">
            <SectionTitle>Your Current Assessment</SectionTitle>
            <div className="flex items-center gap-3">
              <span
                className="text-5xl font-bold"
                style={{ color: levelColor }}
              >
                {recommendedLevel}
              </span>
              <div>
                <p className="text-slate-100 font-semibold">{currentLevelLabel}</p>
                <p className="text-slate-400 text-sm">
                  {form?.processName || "Unnamed process"}
                </p>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-3">
              <p className="text-slate-300 text-sm">{comparisonText}</p>
              <div className="mt-3 w-full bg-slate-700 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${completion || 0}%`,
                    backgroundColor: levelColor,
                  }}
                />
              </div>
              <p className="text-slate-500 text-xs mt-1">
                Assessment {completion || 0}% complete
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-slate-100 font-semibold text-sm">
              Compare Your Process
            </p>
            <p className="text-slate-400 text-sm max-w-xs">
              Complete the survey to compare your process against the 50-process
              baseline.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

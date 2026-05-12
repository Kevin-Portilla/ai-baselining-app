// ── ViewNav.jsx — Two-tab navigation: Survey | Dashboard ─────────────────────

export const ViewNav = ({ activeView, onViewChange }) => (
  <div className="max-w-7xl mx-auto px-6 pb-4">
    <div className="flex gap-2 bg-slate-800/60 rounded-2xl p-1.5 w-fit">
      <button
        onClick={() => onViewChange("survey")}
        className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          activeView === "survey"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-400 hover:text-slate-200"
        }`}
      >
        <span>☑</span>
        Survey
      </button>

      <button
        onClick={() => onViewChange("dashboard")}
        className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          activeView === "dashboard"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-400 hover:text-slate-200"
        }`}
      >
        <span>▣</span>
        Dashboard
      </button>
    </div>
  </div>
);

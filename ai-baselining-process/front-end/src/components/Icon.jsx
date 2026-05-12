// ── Icon.jsx — icon sprite component ─────────────────────────────────────────

import { cn } from "@/lib/utils";

export const Icon = ({ type, className = "" }) => {
  const icons = {
    brain: "AI",
    workflow: "⚙",
    shield: "✓",
    database: "▣",
    clipboard: "☑",
    route: "◇",
    layers: "▱",
    rocket: "↗",
    user: "○",
    ban: "⊘",
    network: "⌘",
    check: "✓",
    warning: "!",
    arrow: "→",
    download: "↓",
    reset: "↻",
  };
  return (
    <span className={cn("inline-flex items-center justify-center font-bold", className)}>
      {icons[type] || "•"}
    </span>
  );
};

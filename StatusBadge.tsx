import type { ReactNode } from "react";

export default function StatusBadge({ children, tone = "neutral" }: { children: ReactNode; tone?: "good" | "warning" | "danger" | "neutral" }) {
  return <span className={`status-badge ${tone}`}>{children}</span>;
}
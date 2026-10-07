import type { ReactNode } from "react";
export default function MetricCard({ title, value, unit, icon, note }: { title: string; value: string; unit?: string; icon: ReactNode; note?: string }) {
  return <div className="metric-card">
    <div className="metric-icon">{icon}</div>
    <div className="metric-content"><span>{title}</span><strong>{value} <small>{unit}</small></strong>{note && <em>{note}</em>}</div>
  </div>;
}
import { Activity, Syringe, Thermometer } from "lucide-react";
import type { DeviceSnapshot, GlucoseReading, InsulinEvent } from "./types";
import StatusBadge from "./StatusBadge";

export default function History({ glucose, insulin, device }: { glucose: GlucoseReading[]; insulin: InsulinEvent[]; device: DeviceSnapshot | null }) {
  const rows = [
    ...glucose.map(x => ({ time:x.timestamp, icon:<Activity/>, title:"Glucose reading", detail:`${x.value} mg/dL · ${x.status}` })),
    ...insulin.map(x => ({ time:x.timestamp, icon:<Syringe/>, title:"Insulin delivery event", detail:`${x.status} · ${x.amount ? `${x.amount} units` : "Amount unavailable"}` })),
    ...(device ? [{ time:device.syncedAt, icon:<Thermometer/>, title:"Device sync", detail:`Temperature ${device.temperature}°C · Battery ${device.battery}%` }] : [])
  ].sort((a,b)=>b.time.localeCompare(a.time));
  return <div className="page"><div className="page-head"><div><p className="eyebrow">Records</p><h1>History</h1><p className="muted">Chronological prototype events.</p></div><select className="filter"><option>Today</option><option>7 Days</option><option>30 Days</option><option>Custom</option></select></div>
    <div className="history-grid"><div className="history-stat"><Activity/><strong>{glucose.length}</strong><span>Glucose readings</span></div><div className="history-stat"><Syringe/><strong>{insulin.length}</strong><span>Insulin events</span></div><div className="history-stat"><Thermometer/><strong>{device?.temperature ?? "--"}°C</strong><span>Latest temperature</span></div></div>
    <section className="card"><div className="card-head"><div><h2>Activity timeline</h2><p>Data is stored locally for the demo.</p></div></div><div className="history-list">{rows.map(r=><div className="history-row" key={`${r.time}-${r.title}`}><div className="history-icon">{r.icon}</div><div><strong>{r.title}</strong><p>{r.detail}</p></div><time>{new Date(r.time).toLocaleString([], {dateStyle:"short",timeStyle:"short"})}</time></div>)}{!rows.length&&<div className="empty">No history yet. Start Demo Mode.</div>}</div></section>
  </div>;
}
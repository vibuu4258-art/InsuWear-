import { useState } from "react";
import { Plus, Activity } from "lucide-react";
import type { GlucoseReading } from "../types";
import GlucoseChart from "../components/GlucoseChart";
import StatusBadge from "../components/StatusBadge";
import { glucoseStatus, makeDemoGlucose } from "../services/demo";

export default function Glucose({ data, add }: { data: GlucoseReading[]; add: (r: GlucoseReading) => void }) {
  const [value, setValue] = useState("");
  const latest = data[data.length - 1];
  const submit = () => { const n = Number(value); if (n > 0) { add(makeDemoGlucose(n)); setValue(""); } };
  const tone = latest?.status === "Normal" ? "good" : latest?.status === "Critical" || latest?.status === "Low" ? "danger" : "warning";
  return <div className="page">
    <div className="page-head"><div><p className="eyebrow">Glucose monitoring</p><h1>Glucose</h1><p className="muted">View prototype sensor readings and trends.</p></div></div>
    <div className="glucose-hero card"><div className="glucose-number">{latest?.value ?? "--"} <small>mg/dL</small></div>{latest && <StatusBadge tone={tone}>{latest.status}</StatusBadge>}<p>Last reading: {latest ? new Date(latest.timestamp).toLocaleString() : "No readings yet"}</p></div>
    <section className="card"><div className="card-head"><div><h2>6–12 hour trend</h2><p>Prototype data visualization</p></div></div><GlucoseChart data={data}/></section>
    <section className="card"><div className="card-head"><div><h2>Add reading</h2><p>For demo/testing only</p></div></div><div className="inline-form"><input type="number" placeholder="e.g. 112" value={value} onChange={e => setValue(e.target.value)} /><button className="primary" onClick={submit}><Plus size={17}/> Add reading</button></div></section>
    <section className="card"><h2>Alert bands</h2><div className="alert-bands"><div><b>Low</b><span>&lt; 70 mg/dL</span></div><div><b>Normal</b><span>70–140 mg/dL</span></div><div><b>High</b><span>141–250 mg/dL</span></div><div><b>Critical</b><span>&gt; 250 mg/dL</span></div></div></section>
  </div>;
}
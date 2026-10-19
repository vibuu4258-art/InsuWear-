import { Activity, Battery, Bluetooth, Droplets, Syringe, Thermometer, Wifi, Zap } from "lucide-react";
import type { DeviceSnapshot, GlucoseReading, InsulinEvent, Reminder } from "./types";
import StatusBadge from "./StatusBadge";
import MetricCard from "./MetricCard";
import GlucoseChart from "./GlucoseChart";

export default function Home({ glucose, insulin, device, reminders, onDemo, onConnect, onPage }: {
  glucose: GlucoseReading[]; insulin: InsulinEvent[]; device: DeviceSnapshot | null; reminders: Reminder[];
  onDemo: () => void; onConnect: () => void; onPage: (p: string) => void;
}) {
  const latest = glucose.length ? glucose[glucose.length - 1] : null;
  const upcoming = reminders.find((r) => r.status !== "Completed");
  const today = new Date().toDateString();
  const todayInsulin = insulin.filter((i) => new Date(i.timestamp).toDateString() === today).length;
  const tone = latest?.status === "Normal" ? "good" : latest?.status === "Critical" || latest?.status === "Low" ? "danger" : "warning";

  return <div className="page">
    <div className="page-head">
      <div><p className="eyebrow">Wednesday, 07 October 2026</p><h1>Good Morning, Alex</h1><p className="muted">Here is your InsuWear system overview.</p></div>
      <button className="primary" onClick={onDemo}><Zap size={17}/> {device?.bluetooth === "Connected" ? "Generate Demo Reading" : "Start Demo Mode"}</button>
    </div>

    <div className="grid-4">
      <MetricCard title="Blood Glucose" value={latest ? String(latest.value) : "--"} unit="mg/dL" icon={<Droplets />} note={latest ? latest.status : "No reading"} />
      <MetricCard title="Last Delivery" value={insulin.length ? new Date(insulin[insulin.length - 1].timestamp).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"}) : "--"} icon={<Syringe />} note="Recorded event" />
      <MetricCard title="Today's Deliveries" value={String(todayInsulin)} icon={<Activity />} note="Prototype log" />
      <MetricCard title="Pod Temperature" value={device ? String(device.temperature) : "--"} unit="°C" icon={<Thermometer />} note={device && device.temperature >= 20 && device.temperature <= 28 ? "Normal" : "Warning"} />
    </div>

    <div className="grid-main">
      <section className="card">
        <div className="card-head"><div><h2>Glucose trend</h2><p>Recent readings from the prototype</p></div>{latest && <StatusBadge tone={tone}>{latest.status}</StatusBadge>}</div>
        <GlucoseChart data={glucose} />
      </section>
      <section className="card">
        <div className="card-head"><div><h2>InsuWear device</h2><p>Live prototype status</p></div><StatusBadge tone={device?.bluetooth === "Connected" ? "good" : "warning"}>{device?.bluetooth ?? "Disconnected"}</StatusBadge></div>
        <div className="device-visual"><div className="shorts-shape"><div className="pod-dot"><Syringe size={20}/></div></div></div>
        <div className="status-list">
          <div><span><Bluetooth/> Bluetooth</span><b>{device?.bluetooth ?? "Disconnected"}</b></div>
          <div><span><Wifi/> Glucose sensor</span><b>{device?.sensorActive ? "Active" : "Offline"}</b></div>
          <div><span><Battery/> Battery</span><b>{device?.battery ?? "--"}%</b></div>
          <div><span><Thermometer/> Temperature</span><b>{device ? `${device.temperature}°C` : "--"}</b></div>
        </div>
        <button className="secondary full" onClick={device?.bluetooth === "Connected" ? () => onPage("device") : onConnect}>{device?.bluetooth === "Connected" ? "View Device Details" : "Connect Device"}</button>
      </section>
    </div>

    <div className="grid-2">
      <section className="card">
        <div className="card-head"><div><h2>Insulin status</h2><p>Tracking only — no automatic dosing</p></div></div>
        <div className="insulin-summary">
          <div><span>Last delivery</span><strong>{insulin.length ? new Date(insulin[insulin.length - 1].timestamp).toLocaleString([], {dateStyle:"short", timeStyle:"short"}) : "None recorded"}</strong></div>
          <div><span>Next reminder</span><strong>{upcoming ? `${upcoming.date} at ${upcoming.time}` : "No reminder"}</strong></div>
        </div>
      </section>
      <section className="card emergency-card">
        <div><div className="emergency-symbol">!</div></div>
        <div><h2>Emergency assistance</h2><p>If a critical condition is detected, use the emergency workflow to request help and share location after permission.</p></div>
        <button className="danger-btn" onClick={() => onPage("emergency")}>Open Emergency</button>
      </section>
    </div>
    <div className="prototype-banner">InsuWear is a prototype concept and is not a substitute for professional medical advice or an approved insulin-delivery device.</div>
  </div>;
}
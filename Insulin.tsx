import { useState } from "react";
import { Bell, Check, Plus, Trash2 } from "lucide-react";
import type { InsulinEvent, Reminder } from "../types";

export default function Insulin({ events, reminders, addEvent, setReminders }: { events: InsulinEvent[]; reminders: Reminder[]; addEvent: (e: InsulinEvent) => void; setReminders: (r: Reminder[]) => void }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [time, setTime] = useState("20:30");
  const [name, setName] = useState("Insulin reminder");
  const addReminder = () => {
    setReminders([...reminders, { id: crypto.randomUUID(), date, time, name, status: "Pending" }]);
  };
  const complete = (id: string) => setReminders(reminders.map(r => r.id === id ? {...r, status:"Completed"} : r));
  const remove = (id: string) => setReminders(reminders.filter(r => r.id !== id));
  return <div className="page">
    <div className="page-head"><div><p className="eyebrow">Insulin tracking</p><h1>Insulin</h1><p className="muted">Record events and schedule reminders. No dose is calculated here.</p></div><button className="primary" onClick={() => addEvent({id:crypto.randomUUID(), timestamp:new Date().toISOString(), status:"Recorded", source:"User"})}><Plus size={17}/> Record event</button></div>
    <div className="grid-2">
      <section className="card"><div className="card-head"><div><h2>Delivery timeline</h2><p>Today and recent prototype events</p></div></div>
        <div className="timeline">{events.slice().reverse().map(e => <div className="timeline-item" key={e.id}><div className="timeline-dot">💉</div><div><strong>{new Date(e.timestamp).toLocaleDateString()} · {new Date(e.timestamp).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</strong><p>{e.status} · {e.amount ? `${e.amount} units` : "Amount not available"}</p></div></div>)}{!events.length && <div className="empty">No insulin events recorded.</div>}</div>
      </section>
      <section className="card"><div className="card-head"><div><h2>Insulin reminder</h2><p>Reminder only — always verify your routine.</p></div><Bell/></div>
        <div className="form-grid"><label>Date<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label><label>Time<input type="time" value={time} onChange={e=>setTime(e.target.value)}/></label><label className="span-2">Reminder name<input value={name} onChange={e=>setName(e.target.value)}/></label></div>
        <button className="primary full" onClick={addReminder}><Plus size={17}/> Add reminder</button>
      </section>
    </div>
    <section className="card"><div className="card-head"><div><h2>Scheduled reminders</h2><p>Completion status is stored locally in this prototype.</p></div></div>
      <div className="reminder-list">{reminders.map(r => <div className="reminder-row" key={r.id}><Bell size={18}/><div><strong>{r.name}</strong><span>{r.date} · {r.time}</span></div><StatusBadge tone={r.status==="Completed"?"good":"neutral"}>{r.status}</StatusBadge><button className="icon-btn" onClick={()=>complete(r.id)} disabled={r.status==="Completed"}><Check/></button><button className="icon-btn danger-icon" onClick={()=>remove(r.id)}><Trash2/></button></div>)}{!reminders.length && <div className="empty">No reminders yet.</div>}</div>
    </section>
  </div>;
}
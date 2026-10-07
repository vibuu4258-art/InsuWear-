import { useState } from "react";
import { AlertTriangle, MapPin, Phone, Navigation, Plus, Trash2, ShieldAlert } from "lucide-react";
import type { EmergencyContact, EmergencyEvent } from "../types";
import { demoHospitals, requestLocation } from "../services/location";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";

export default function Emergency({ contacts, setContacts, events, setEvents }: { contacts: EmergencyContact[]; setContacts: (x: EmergencyContact[])=>void; events: EmergencyEvent[]; setEvents: (x: EmergencyEvent[])=>void }) {
  const [confirm, setConfirm] = useState(false);
  const [location, setLocation] = useState<string>("");
  const [locError, setLocError] = useState("");
  const [form, setForm] = useState({name:"", relationship:"", phone:""});
  const activate = async () => {
    setConfirm(false);
    try {
      const loc = await requestLocation();
      setLocation(`${loc.latitude.toFixed(5)}, ${loc.longitude.toFixed(5)}`);
      setLocError("");
      setEvents([{id:crypto.randomUUID(), timestamp:new Date().toISOString(), type:"Manual emergency alert", location:`${loc.latitude},${loc.longitude}`, status:"Active"}, ...events]);
    } catch {
      setLocError("Location permission was not granted. The alert can still be recorded, but location was not shared.");
      setEvents([{id:crypto.randomUUID(), timestamp:new Date().toISOString(), type:"Manual emergency alert", status:"Active"}, ...events]);
    }
  };
  const add = () => { if(form.name&&form.phone){setContacts([...contacts,{id:crypto.randomUUID(),...form}]);setForm({name:"",relationship:"",phone:""});} };
  const remove=(id:string)=>setContacts(contacts.filter(c=>c.id!==id));
  return <div className="page"><div className="page-head"><div><p className="eyebrow">Safety center</p><h1>Emergency</h1><p className="muted">Alerts require user action and location permission.</p></div><button className="danger-btn large" onClick={()=>setConfirm(true)}><ShieldAlert/> EMERGENCY</button></div>
    <div className="critical-info"><AlertTriangle/><div><strong>Prototype emergency detection</strong><p>Critical glucose, abnormal temperature, sensor failure or communication interruption can be represented as alert conditions. This prototype does not administer insulin automatically.</p></div></div>
    <div className="grid-2">
      <section className="card"><div className="card-head"><div><h2>Location</h2><p>Only requested after emergency activation.</p></div><MapPin/></div>{location?<div className="location-box"><MapPin/><div><strong>Location shared</strong><span>{location}</span></div></div>:<div className="empty">No location shared.</div>}{locError&&<p className="warning-text">{locError}</p>}<button className="secondary full" onClick={async()=>{try{const x=await requestLocation();setLocation(`${x.latitude.toFixed(5)}, ${x.longitude.toFixed(5)}`);setLocError("")}catch{setLocError("Location unavailable.")}}}><MapPin/> Request location</button></section>
      <section className="card"><div className="card-head"><div><h2>Nearby hospitals</h2><p>Demo data until a live places API is connected.</p></div></div>{demoHospitals.map(h=><div className="hospital" key={h.name}><div><strong>{h.name}</strong><span>{h.distance}</span></div><div className="button-row"><a className="icon-btn" href={`tel:${h.phone}`}><Phone/></a><a className="icon-btn" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name)}`}><Navigation/></a></div></div>)}</section>
    </div>
    <section className="card"><div className="card-head"><div><h2>Emergency contacts</h2><p>Prototype contact list.</p></div></div><div className="form-grid"><input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input placeholder="Relationship" value={form.relationship} onChange={e=>setForm({...form,relationship:e.target.value})}/><input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/><button className="primary" onClick={add}><Plus/> Add contact</button></div><div className="contact-list">{contacts.map(c=><div className="contact-row" key={c.id}><div><strong>{c.name}</strong><span>{c.relationship} · {c.phone}</span></div><button className="icon-btn danger-icon" onClick={()=>remove(c.id)}><Trash2/></button></div>)}</div></section>
    <section className="card"><div className="card-head"><div><h2>Alert history</h2><p>Recorded emergency events</p></div></div>{events.map(e=><div className="history-row" key={e.id}><div className="history-icon"><AlertTriangle/></div><div><strong>{e.type}</strong><p>{e.location ? `Location: ${e.location}` : "Location not shared"}</p></div><StatusBadge tone={e.status==="Active"?"danger":"good"}>{e.status}</StatusBadge></div>)}</section>
    {confirm&&<Modal title="Emergency Alert" onClose={()=>setConfirm(false)}><p>Are you sure you want to activate emergency assistance? The app will request location permission.</p><div className="button-row end"><button className="secondary" onClick={()=>setConfirm(false)}>Cancel</button><button className="danger-btn" onClick={activate}>Activate Emergency</button></div></Modal>}
  </div>;
}
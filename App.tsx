import { useEffect, useRef, useState } from "react";
import { Activity, BellRing } from "lucide-react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Home from "./Home";
import Glucose from "./Glucose";
import Insulin from "./Insulin";
import History from "./History";
import Device from "./Device";
import Emergency from "./Emergency";
import Profile from "./Profile";
import type {
  DeviceSnapshot,
  EmergencyContact,
  EmergencyEvent,
  GlucoseReading,
  InsulinEvent,
  Reminder,
} from "./types";
import { storage } from "./storage";
import {
  connectInsuWearDemo,
  disconnectInsuWear,
} from "./bluetooth";
import {
  makeDemoGlucose,
  makeDemoInsulin,
  nextDemoDevice,
} from "./demo";

const seedGlucose: GlucoseReading[] = Array.from({length: 8}, (_, i) => {
  const now = Date.now() - (7-i)*60*60*1000;
  const value = [108,112,118,105,126,116,121,112][i];
  return {id:`seed-${i}`,value,timestamp:new Date(now).toISOString(),status:value<70?"Low":value<=140?"Normal":value<=250?"High":"Critical"};
});

export default function App() {
  const [page,setPage]=useState("home");
  const [sidebar,setSidebar]=useState(false);
  const [glucose,setGlucose]=useState<GlucoseReading[]>(() => storage.glucose().length ? storage.glucose() : seedGlucose);
  const [insulin,setInsulin]=useState<InsulinEvent[]>(() => storage.insulin());
  const [device,setDevice]=useState<DeviceSnapshot|null>(() => storage.device());
  const [reminders,setReminders]=useState<Reminder[]>(() => storage.reminders());
  const [contacts,setContacts]=useState<EmergencyContact[]>(() => storage.contacts());
  const [emergencies,setEmergencies]=useState<EmergencyEvent[]>(() => storage.emergencies());
  const [toast,setToast]=useState("");
  const intervalRef=useRef<number|null>(null);

  useEffect(()=>storage.saveGlucose(glucose),[glucose]);
  useEffect(()=>storage.saveInsulin(insulin),[insulin]);
  useEffect(() => {
  if (device) {
    storage.saveDevice(device);
  }
}, [device]);
  useEffect(()=>storage.saveReminders(reminders),[reminders]);
  useEffect(()=>storage.saveContacts(contacts),[contacts]);
  useEffect(()=>storage.saveEmergencies(emergencies),[emergencies]);
  useEffect(()=>()=>{if(intervalRef.current) window.clearInterval(intervalRef.current)},[]);

  const notify=(msg:string)=>{setToast(msg);window.setTimeout(()=>setToast(""),3000)};
  const connect=async()=>{const d=await connectInsuWearDemo();setDevice(d);notify("InsuWear demo device connected.");};
  const disconnect=async()=>{setDevice(await disconnectInsuWear());notify("Device disconnected.");};
  const sync=()=>{if(device){setDevice(nextDemoDevice(device));notify("Device synchronized.");}};
  const addGlucose=(r:GlucoseReading)=>{setGlucose(x=>[...x,r]);notify(`Glucose reading ${r.value} mg/dL recorded.`)};
  const addInsulin=(e:InsulinEvent)=>{setInsulin(x=>[...x,e]);notify("Insulin event recorded. No dose was calculated.");};
  const startDemo=async()=>{
    if(!device || device.bluetooth!=="Connected") await connect();
    addGlucose(makeDemoGlucose());
    setDevice(d=>nextDemoDevice(d));
    if(Math.random()>0.55) addInsulin(makeDemoInsulin());
  };

  const content = page==="home" ? <Home glucose={glucose} insulin={insulin} device={device} reminders={reminders} onDemo={startDemo} onConnect={connect} onPage={setPage}/> :
    page==="glucose" ? <Glucose data={glucose} add={addGlucose}/> :
    page==="insulin" ? <Insulin events={insulin} reminders={reminders} addEvent={addInsulin} setReminders={setReminders}/> :
    page==="history" ? <History glucose={glucose} insulin={insulin} device={device}/> :
    page==="device" ? <Device device={device} connect={connect} disconnect={disconnect} sync={sync}/> :
    page==="emergency" ? <Emergency contacts={contacts} setContacts={setContacts} events={emergencies} setEvents={setEmergencies}/> :
    <Profile/>;

  return <div className="app-shell">
    <Sidebar page={page} setPage={setPage} open={sidebar} close={()=>setSidebar(false)}/>
    <main className="main"><Topbar onMenu={()=>setSidebar(true)} onEmergency={()=>setPage("emergency")}/>{content}</main>
    {toast&&<div className="toast"><BellRing size={18}/>{toast}</div>}
    <div className="demo-pill"><Activity size={14}/> Prototype / Demo Mode</div>
  </div>;
}
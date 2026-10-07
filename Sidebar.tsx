import { Activity, AlertTriangle, Bell, CircleUserRound, Clock3, Droplets, Home, LogOut, Smartphone, Syringe, Thermometer, X } from "lucide-react";

const items = [
  ["home", "Home", Home],
  ["glucose", "Glucose", Activity],
  ["insulin", "Insulin", Syringe],
  ["history", "History", Clock3],
  ["device", "Device", Smartphone],
  ["emergency", "Emergency", AlertTriangle],
  ["profile", "Profile", CircleUserRound],
] as const;

export default function Sidebar({ page, setPage, open, close }: { page: string; setPage: (p: string) => void; open: boolean; close: () => void }) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand">
        <div className="brand-mark"><Droplets size={22} /></div>
        <div><strong>InsuWear</strong><small>Smart wearable care</small></div>
        <button className="icon-btn mobile-only" onClick={close}><X size={20} /></button>
      </div>
      <nav>
        {items.map(([id, label, Icon]) => (
          <button key={id} className={`nav-item ${page === id ? "active" : ""}`} onClick={() => { setPage(id); close(); }}>
            <Icon size={19} /><span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-note">
        <Bell size={16} />
        <span>Prototype mode<br /><small>Not a medical device</small></span>
      </div>
      <div className="sidebar-footer"><LogOut size={15} /> Demo account</div>
    </aside>
  );
}
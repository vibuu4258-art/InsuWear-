import { Bell, Menu } from "lucide-react";

export default function Topbar({ onMenu, onEmergency }: { onMenu: () => void; onEmergency: () => void }) {
  return (
    <header className="topbar">
      <button className="icon-btn mobile-only" onClick={onMenu}><Menu /></button>
      <div className="topbar-title">InsuWear <span>Prototype</span></div>
      <div className="topbar-actions">
        <button className="emergency-mini" onClick={onEmergency}>Emergency</button>
        <button className="icon-btn"><Bell size={19} /></button>
        <div className="avatar">A</div>
      </div>
    </header>
  );
}
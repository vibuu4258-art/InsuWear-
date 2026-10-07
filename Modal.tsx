import type { ReactNode } from "react";
import { X } from "lucide-react";
export default function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return <div className="modal-backdrop" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-head"><h3>{title}</h3><button className="icon-btn" onClick={onClose}><X /></button></div>
      {children}
    </div>
  </div>;
}
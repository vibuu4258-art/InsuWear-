export type GlucoseStatus = "Low" | "Normal" | "High" | "Critical";
export type ConnectionStatus = "Connected" | "Disconnected";

export interface GlucoseReading {
  id: string;
  value: number;
  timestamp: string;
  status: GlucoseStatus;
}

export interface InsulinEvent {
  id: string;
  timestamp: string;
  status: "Recorded" | "Completed" | "Missed";
  amount?: number;
  source: "Prototype" | "User";
}

export interface DeviceSnapshot {
  temperature: number;
  battery: number;
  sensorActive: boolean;
  podActive: boolean;
  bluetooth: ConnectionStatus;
  syncedAt: string;
}

export interface Reminder {
  id: string;
  date: string;
  time: string;
  name: string;
  notes?: string;
  status: "Pending" | "Completed" | "Snoozed";
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

export interface EmergencyEvent {
  id: string;
  timestamp: string;
  type: string;
  location?: string;
  status: "Active" | "Resolved";
}
import type { DeviceSnapshot, GlucoseReading, InsulinEvent } from "../types";

export function glucoseStatus(value: number): GlucoseReading["status"] {
  if (value < 70) return "Low";
  if (value <= 140) return "Normal";
  if (value <= 250) return "High";
  return "Critical";
}

export function makeDemoGlucose(value?: number): GlucoseReading {
  const v = value ?? Math.round(95 + Math.random() * 50);
  return {
    id: crypto.randomUUID(),
    value: v,
    timestamp: new Date().toISOString(),
    status: glucoseStatus(v),
  };
}

export function makeDemoInsulin(): InsulinEvent {
  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    status: "Recorded",
    source: "Prototype",
  };
}

export function nextDemoDevice(previous?: DeviceSnapshot | null): DeviceSnapshot {
  const battery = Math.max(5, (previous?.battery ?? 82) - (Math.random() > 0.7 ? 1 : 0));
  return {
    temperature: Number((23.5 + Math.random() * 1.8).toFixed(1)),
    battery,
    sensorActive: true,
    podActive: true,
    bluetooth: "Connected",
    syncedAt: new Date().toISOString(),
  };
}
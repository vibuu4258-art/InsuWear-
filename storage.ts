import type { DeviceSnapshot, EmergencyContact, EmergencyEvent, GlucoseReading, InsulinEvent, Reminder } from "./types";

const keys = {
  glucose: "insuwear_glucose",
  insulin: "insuwear_insulin",
  device: "insuwear_device",
  reminders: "insuwear_reminders",
  contacts: "insuwear_contacts",
  emergencies: "insuwear_emergencies",
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  glucose: () => read<GlucoseReading[]>(keys.glucose, []),
  saveGlucose: (v: GlucoseReading[]) => write(keys.glucose, v),
  insulin: () => read<InsulinEvent[]>(keys.insulin, []),
  saveInsulin: (v: InsulinEvent[]) => write(keys.insulin, v),
  device: () => read<DeviceSnapshot | null>(keys.device, null),
  saveDevice: (v: DeviceSnapshot) => write(keys.device, v),
  reminders: () => read<Reminder[]>(keys.reminders, []),
  saveReminders: (v: Reminder[]) => write(keys.reminders, v),
  contacts: () => read<EmergencyContact[]>(keys.contacts, []),
  saveContacts: (v: EmergencyContact[]) => write(keys.contacts, v),
  emergencies: () => read<EmergencyEvent[]>(keys.emergencies, []),
  saveEmergencies: (v: EmergencyEvent[]) => write(keys.emergencies, v),
};
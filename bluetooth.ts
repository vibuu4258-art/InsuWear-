import type { DeviceSnapshot } from "../types";

/**
 * Prototype BLE boundary.
 * Demo mode uses simulated data. A production build should implement
 * Web Bluetooth here after defining the device GATT service/characteristics.
 */
export async function connectInsuWearDemo(): Promise<DeviceSnapshot> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    temperature: 24,
    battery: 82,
    sensorActive: true,
    podActive: true,
    bluetooth: "Connected",
    syncedAt: new Date().toISOString(),
  };
}

export async function disconnectInsuWear(): Promise<DeviceSnapshot> {
  return {
    temperature: 24,
    battery: 82,
    sensorActive: true,
    podActive: true,
    bluetooth: "Disconnected",
    syncedAt: new Date().toISOString(),
  };
}
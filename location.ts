export interface LocationResult {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export async function requestLocation(): Promise<LocationResult> {
  if (!navigator.geolocation) {
    throw new Error("Location is not supported by this browser.");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        }),
      () => reject(new Error("Location permission was denied or unavailable.")),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}

export const demoHospitals = [
  { name: "Nearby General Hospital", distance: "2.4 km", phone: "+91 00000 00000" },
  { name: "City Emergency Centre", distance: "4.1 km", phone: "+91 00000 00001" },
  { name: "Community Medical Centre", distance: "5.8 km", phone: "+91 00000 00002" },
];
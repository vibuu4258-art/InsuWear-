# InsuWear

A hackathon prototype for a smart insulin-delivery shorts monitoring system.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

## Prototype architecture

- React + TypeScript + Vite
- Recharts for graphs
- localStorage for prototype persistence
- Demo Mode for simulated glucose/device/insulin data
- `src/services/bluetooth.ts` is the boundary for future Web Bluetooth/BLE integration
- `src/services/location.ts` is the boundary for future map/hospital APIs

## Safety

This is a prototype/demo and is not a clinically approved medical device. It does not calculate, prescribe, or autonomously administer insulin. Dose/amount fields are only displayed when supplied by the prototype/user data.

## GitHub

After creating a GitHub repository:

```bash
git init
git add .
git commit -m "Initial InsuWear prototype"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

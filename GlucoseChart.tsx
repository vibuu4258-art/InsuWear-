import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { GlucoseReading } from "./types";

export default function GlucoseChart({ data }: { data: GlucoseReading[] }) {
  const chartData = [...data]
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
    .slice(-12)
    .map((r) => ({
      time: new Date(r.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      glucose: r.value,
    }));

  return (
    <div className="chart-wrap">
      {chartData.length === 0 ? (
        <div className="empty-chart">Start Demo Mode to generate glucose readings.</div>
      ) : (
        <ResponsiveContainer width="100%" height={230}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line type="monotone" dataKey="glucose" stroke="#0f766e" strokeWidth={3} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
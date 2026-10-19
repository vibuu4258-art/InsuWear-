import { useState } from "react";
import type { GlucoseReading } from "./types";
import { makeDemoGlucose } from "./demo";

type GlucoseProps = {
  data: GlucoseReading[];
  add: (reading: GlucoseReading) => void;
};

export default function Glucose({ data, add }: GlucoseProps) {
  const [value, setValue] = useState("");

  const latest = data.length > 0 ? data[data.length - 1] : undefined;

  const submit = () => {
    const n = Number(value);

    if (value.trim() === "" || !Number.isFinite(n) || n <= 0) {
      return;
    }

    add(makeDemoGlucose(n));
    setValue("");
  };

  const status =
    latest?.value == null
      ? "No reading"
      : latest.value < 70
        ? "Low"
        : latest.value > 250
          ? "High"
          : "Normal";

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Glucose monitoring</p>
          <h1>Glucose</h1>
          <p className="muted">
            View readings and monitor glucose levels.
          </p>
        </div>
      </div>

      <section className="card">
        <div className="card-head">
          <h2>Latest glucose reading</h2>
        </div>

        <div className="glucose-hero">
          <div className="glucose-number">
            {latest?.value ?? "--"}
            <small> mg/dL</small>
          </div>
          <p>
            Status: <strong>{status}</strong>
          </p>
          {latest?.timestamp && (
            <p className="muted">
              Recorded: {new Date(latest.timestamp).toLocaleString()}
            </p>
          )}
        </div>
      </section>

      <section className="card">
        <div className="card-head">
          <h2>Add glucose reading</h2>
        </div>

        <div className="form-row">
          <input
            type="number"
            min="1"
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter glucose in mg/dL"
          />

          <button type="button" onClick={submit}>
            Add reading
          </button>
        </div>
      </section>

      <section className="card">
        <div className="card-head">
          <h2>Reading history</h2>
          <span>{data.length} readings</span>
        </div>

        {data.length === 0 ? (
          <p className="muted">No readings available yet.</p>
        ) : (
          <div className="reading-list">
            {[...data].reverse().map((reading, index) => (
              <div
                className="reading-item"
                key={reading.id ?? `${reading.timestamp}-${index}`}
              >
                <div>
                  <strong>{reading.value} mg/dL</strong>
                  <p className="muted">
                    {new Date(reading.timestamp).toLocaleString()}
                  </p>
                </div>
                <span>
                  {reading.value < 70
                    ? "Low"
                    : reading.value > 250
                      ? "High"
                      : "Normal"}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
import React, { useState } from "react";
import { predictRisk } from "../services/api";

const Prediction = () => {
  const [disasterType, setDisasterType] = useState("Flood");
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const data = await predictRisk({
        disaster_type: disasterType,
        location,
        severity_level: Number(severity),
      });
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    if (risk === "LOW") return "bg-green-500";
    if (risk === "MEDIUM") return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Disaster Risk Prediction
      </h1>

      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Enter basic information about a potential disaster scenario and get an
        estimated risk level with clear guidance. This does not store data in
        the system; it provides a quick simulation to support planning.
      </p>

      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Disaster Type
            </label>
            <select
              className="w-full p-2 border rounded-lg"
              value={disasterType}
              onChange={(e) => setDisasterType(e.target.value)}
            >
              <option value="Flood">Flood</option>
              <option value="Earthquake">Earthquake</option>
              <option value="Landslide">Landslide</option>
              <option value="Fire">Fire</option>
              <option value="Cyclone">Cyclone</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Location (optional)
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="e.g., Central City, coastal area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Severity Level (1 - 10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 (Low)</span>
              <span>Current: {severity}</span>
              <span>10 (High)</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Calculating..." : "Predict Risk"}
          </button>

          {error && (
            <p className="text-sm text-red-600 mt-2 text-center">{error}</p>
          )}
        </form>

        <div className="space-y-4">
          {result ? (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-2">
                Prediction Result
              </h2>
              <p className="text-gray-700 mb-2">
                <b>Type:</b> {result.disaster_type}
              </p>
              <p className="text-gray-700 mb-2">
                <b>Location:</b> {result.location}
              </p>
              <p className="text-gray-700 mb-2">
                <b>Severity Level:</b> {result.severity_level}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span
                  className={`w-3 h-3 rounded-full ${getRiskColor(
                    result.risk_level
                  )}`}
                ></span>
                <span className="font-bold">{result.risk_level} RISK</span>
              </div>
              <p className="text-gray-700 mt-4">{result.advice}</p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold mb-2">
                How this prediction works
              </h2>
              <p className="text-gray-700 mb-2">
                The system estimates risk based on a 1–10 severity scale,
                consistent with how recorded disasters are stored in the
                database.
              </p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>1–3 → Low risk: monitor the situation.</li>
                <li>4–6 → Medium risk: prepare and review safety plans.</li>
                <li>7–10 → High risk: be ready for immediate action.</li>
              </ul>
              <p className="text-gray-500 text-xs mt-3">
                This tool is for educational and planning purposes and does not
                replace official alerts from government agencies.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prediction;

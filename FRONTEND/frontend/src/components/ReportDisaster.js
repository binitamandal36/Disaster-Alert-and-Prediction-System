import React, { useState } from "react";
import { createDisaster } from "../services/api";

const ReportDisaster = () => {
  const [title, setTitle] = useState("");
  const [disasterType, setDisasterType] = useState("Flood");
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState(5);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim() || !location.trim() || !description.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      await createDisaster({
        title: title.trim(),
        disaster_type: disasterType,
        location: location.trim(),
        severity_level: Number(severity),
        description: description.trim(),
      });

      setSuccess(
        "Disaster reported successfully. Alerts will be generated based on severity."
      );
      setTitle("");
      setLocation("");
      setDescription("");
      setSeverity(5);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Report a Disaster
      </h1>

      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Use this form to log a new disaster event into the system. Based on the
        severity level you select, the backend will automatically create alerts
        and, for very high severity, trigger a high risk notification.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="e.g., Severe Flood in Riverside Area"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
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
              <option value="Tsunami">Tsunami</option>
              <option value="Drought">Drought</option>
              <option value="Storm">Storm</option>
              <option value="Avalanche">Avalanche</option>
              <option value="Volcano">Volcano</option>
              <option value="Heatwave">Heatwave</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="e.g., Hillview District, Riverbank Zone"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Severity Level (1 - 10) <span className="text-red-500">*</span>
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

        <div>
          <label className="block text-sm font-medium mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full p-2 border rounded-lg min-h-[100px]"
            placeholder="Provide details about the situation, impact, and any important notes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Report"}
        </button>

        {error && (
          <p className="text-sm text-red-600 mt-2 text-center">{error}</p>
        )}
        {success && (
          <p className="text-sm text-green-600 mt-2 text-center">{success}</p>
        )}
      </form>
    </div>
  );
};

export default ReportDisaster;


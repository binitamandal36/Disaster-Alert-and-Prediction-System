import React, { useEffect, useState } from "react";
import { getAlerts } from "../services/api";
import AlertCard from "./AlertCard";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState("");

 useEffect(() => {
  const fetchAlerts = async () => {
    try {
      const data = await getAlerts();
      setAlerts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchAlerts();

  // WebSocket connection
  const socket = new WebSocket("ws://127.0.0.1:8000/ws/alerts/");

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("New alert received:", data);

    setAlerts((prevAlerts) => [
      {
        id: Date.now(),
        disaster: {
          title: data.alert.title,
          location: data.alert.location,
        },
        alert_level: data.alert.severity,
        message: data.alert.message,
      },
      ...prevAlerts,
    ]);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return () => socket.close();
}, []);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-red-400 flex items-center justify-center px-4">
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-sm text-slate-300">Loading alerts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Current disaster alerts
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Alerts are generated automatically from the latest disasters recorded
              in the control centre.
            </p>
          </div>
          <div className="w-full md:w-64">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Highlight alerts near this location
            </label>
            <input
              type="text"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              placeholder="e.g. Kathmandu"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {alerts.length === 0 ? (
          <p className="text-center text-slate-400 mt-10">
            No alerts have been generated yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} userLocation={userLocation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;

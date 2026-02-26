import React, { useEffect, useState } from "react";
import { getAlerts } from "../services/api";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

  const getColor = (level) => {
    if (level === "LOW") return "bg-green-100 text-green-700";
    if (level === "MEDIUM") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  if (error) {
    return <p className="text-red-600 text-center mt-6">{error}</p>;
  }

  if (loading) {
    return <p className="text-center mt-6">Loading alerts...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Disaster Alerts
      </h1>

      <div className="space-y-4 max-w-3xl mx-auto">
        {alerts.length === 0 && (
          <p className="text-center text-gray-500">
            No alerts have been generated yet.
          </p>
        )}

        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg shadow ${getColor(alert.level)}`}
          >
            <h2 className="text-xl font-semibold">{alert.title}</h2>
            <p>{alert.message}</p>
            <p className="text-sm mt-2">
              Level: <b>{alert.level}</b>
            </p>
            {alert.created_at && (
              <p className="text-xs text-gray-700 mt-1">
                Reported at: {new Date(alert.created_at).toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;

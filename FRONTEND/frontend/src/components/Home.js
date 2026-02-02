import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAlerts } from "../services/api";
import AlertBanner from "./AlertBanner";

const Home = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAlerts()
      .then((data) => setAlerts(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 text-white">

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="text-5xl font-bold mb-6">
          Disaster Alert & Prediction System
        </h1>

        {/* 🔴 ALERT SECTION */}
        <div className="w-full max-w-3xl mb-6">
          {error && (
            <p className="text-red-300 mb-4">
              Error loading alerts
            </p>
          )}

          {alerts.length > 0 &&
            alerts.map((alert) => (
              <AlertBanner key={alert.id} alert={alert} />
            ))}
        </div>

        <p className="text-lg max-w-2xl mb-10 text-gray-200">
          A real-time disaster monitoring system that helps users stay informed
          about floods, earthquakes, landslides, fires, and other natural hazards.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            to="/disasters"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition"
          >
            View Disaster Alerts
          </Link>

          <a
            href="http://127.0.0.1:8000/admin/"
            target="_blank"
            rel="noreferrer"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Admin Panel
          </a>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white text-gray-800 py-16 px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div className="p-6 shadow rounded-lg">
            <h3 className="text-xl font-bold mb-2">Live Monitoring</h3>
            <p>
              Access real-time disaster information collected and managed
              through the backend system.
            </p>
          </div>

          <div className="p-6 shadow rounded-lg">
            <h3 className="text-xl font-bold mb-2">Risk Alerts</h3>
            <p>
              Severity-based alerts help users quickly understand disaster risk
              levels.
            </p>
          </div>

          <div className="p-6 shadow rounded-lg">
            <h3 className="text-xl font-bold mb-2">User Friendly</h3>
            <p>
              Clean and simple interface built with React and Tailwind CSS.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;

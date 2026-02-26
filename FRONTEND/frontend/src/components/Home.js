import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertBanner from "./AlertBanner";

const Home = () => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
          Disaster Alert System
        </h1>
        {showAlert && <AlertBanner />}

        <p className="text-lg max-w-2xl mb-10 text-gray-200">
          A real-time disaster monitoring portal that helps the public stay
          informed about floods, earthquakes, landslides, fires, and other
          natural hazards recorded by emergency operators.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            to="/disasters"
            className="bg-red-500 hover:bg-red-600 hover:scale-105 shadow-lg hover:shadow-red-500/50
             text-white px-8 py-4 rounded-full text-lg font-semibold transition duration-300"
          >
            View Disaster Dashboard
          </Link>
          <Link
            to="/alerts"
            className="bg-emerald-500 hover:bg-emerald-600 hover:scale-105 shadow-lg hover:shadow-emerald-500/50
             text-white px-8 py-4 rounded-full text-lg font-semibold transition duration-300"
          >
            View Latest Alerts
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white text-gray-800 py-16 px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div className="p-6 shadow rounded-lg hover:shadow-xl hover:-translate-y-2 transition bg-white">
            <h3 className="text-xl font-bold mb-2">Live Monitoring</h3>
            <p>
              Access real-time disaster information collected and managed
              through the backend system.
            </p>
          </div>

          <div className="p-6 shadow rounded-lg hover:shadow-xl hover:-translate-y-2 transition bg-white">
            <h3 className="text-xl font-bold mb-2">Risk Alerts</h3>
            <p>
              Severity-based alerts help users quickly understand disaster risk
              levels.
            </p>
          </div>

          <div className="p-6 shadow rounded-lg hover:shadow-xl hover:-translate-y-2 transition bg-white">
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

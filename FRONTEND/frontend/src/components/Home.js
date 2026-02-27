import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertBanner from "./AlertBanner";
import NotificationSubscribe from "./NotificationSubscribe";

const Home = () => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen text-white">

      {/* Hero Section - home-hero.jpg as background */}
      <div
        className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/home-hero.jpg')" }}
      >
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-slate-900/70" aria-hidden="true" />
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
            Disaster Alert System
          </h1>
          {showAlert && <AlertBanner />}

          <p className="text-lg max-w-2xl mb-10 text-gray-100 mx-auto">
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
      </div>

      {/* Info Section - fixed card image dimensions */}
      <div className="bg-white text-gray-800 py-16 px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition overflow-hidden">
            <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src="/images/card-monitoring.jpg"
                alt="Monitoring network"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Live Monitoring</h3>
              <p className="text-sm text-gray-600 flex-1">
                Access real-time disaster information collected and managed
                through the backend system.
              </p>
            </div>
          </div>

          <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition overflow-hidden">
            <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src="/images/card-control-centre.jpg"
                alt="Control centre"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Risk Alerts</h3>
              <p className="text-sm text-gray-600 flex-1">
                Severity-based alerts help users quickly understand disaster risk
                levels.
              </p>
            </div>
          </div>

          <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition overflow-hidden">
            <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src="/images/card-public-warning.jpg"
                alt="Public warning"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2">User Friendly</h3>
              <p className="text-sm text-gray-600 flex-1">
                Clean and simple interface built with React and Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why build a system – two columns: text + image (use /images/solution.jpg or your Telegrafia reference) */}
      <div className="bg-white text-gray-800 py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why build a system to warn of natural hazards
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Nature is becoming increasingly unpredictable. Disaster scenarios occur daily.
              Early warning and notification systems—including acoustic warnings, electronic
              sirens, and monitoring systems with sensors—help minimize loss of human lives
              and support coordinated response.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium mb-6"
            >
              <span className="inline-block w-6 h-6 bg-red-100 rounded flex items-center justify-center text-red-600 text-xs font-bold">PDF</span>
              Early warning of tsunamis, tornadoes, and other natural disasters
            </a>
            <Link
              to="/contact"
              className="inline-block bg-amber-800 hover:bg-amber-900 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Contact us
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="/images/solution.jpg"
              alt="Disaster warning and monitoring system"
              className="w-full h-full object-cover min-h-[280px]"
            />
          </div>
        </div>
      </div>

      {/* Advantages of the solution – simple points, contained image */}
      <div className="bg-[#2C3E50] text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 p-8 md:p-12 items-center">
          <div className="md:flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Advantages of the solution
            </h2>
            <ul className="space-y-2.5 text-sm md:text-base leading-relaxed text-gray-200">
              <li>• <strong>Wide coverage</strong> – Alerts reach many people at once, even in noisy or open areas.</li>
              <li>• <strong>Simple setup</strong> – Sensors and sirens connect directly, without extra equipment.</li>
              <li>• <strong>Uses weather data</strong> – Automatically uses data from weather stations to assess risk.</li>
              <li>• <strong>Can control other systems</strong> – e.g. turn off gas or power when needed for safety.</li>
              <li>• <strong>Alerts start automatically</strong> – No need to press a button; the system reacts to danger.</li>
              <li>• <strong>Clear evacuation messages</strong> – Live or pre-recorded voice messages so people know what to do.</li>
              <li>• <strong>Works when power fails</strong> – Backup (e.g. solar) keeps the system running.</li>
            </ul>
          </div>
          <div className="md:w-72 flex-shrink-0 flex justify-center">
            <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-xl border border-white/10">
              <img
                src="/images/solution.jpg"
                alt="Coverage and monitoring"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
        <div className="h-14 bg-red-600 flex items-center justify-center">
          <Link to="/alerts" className="text-white font-semibold hover:underline">
            Our solutions
          </Link>
        </div>
      </div>

      <NotificationSubscribe />

    </div>
  );
};

export default Home;

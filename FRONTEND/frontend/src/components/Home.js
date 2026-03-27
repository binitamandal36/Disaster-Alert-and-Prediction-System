import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertBanner from "./AlertBanner";
import NotificationSubscribe from "./NotificationSubscribe";
import DisasterMap from "./DisasterMap";
import { getLiveSituation } from "../services/api";

const Home = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [metrics, setMetrics] = useState({
    active_disasters: "...",
    high_alerts: "...",
    subscribers: "...",
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getLiveSituation();
        setMetrics(data);
      } catch (err) {
        console.error("Failed to fetch live situation metrics", err);
      }
    };
    fetchMetrics();
    
    // Poll every 30 seconds for live updates
    const interval = setInterval(fetchMetrics, 30000);

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundImage: "url('/images/home-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[1px]" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 lg:py-32 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-400/40 mb-4">
              Real-time Early Warning Portal
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              Early Warning &{" "}
              <span className="text-amber-300">Disaster Alert System</span>
            </h1>
            <p className="text-base md:text-lg text-slate-100/90 mb-6 max-w-xl">
              One place where emergency operators record incidents and the public
              instantly sees verified alerts for floods, earthquakes, landslides,
              fires, and more.
            </p>

            {showAlert && <AlertBanner />}

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/alerts"
                className="bg-red-600 hover:bg-red-700 px-7 py-3 rounded-full text-sm md:text-base font-semibold shadow-lg shadow-red-600/30 transition-transform hover:-translate-y-0.5"
              >
                View Live Alerts
              </Link>
              <Link
                to="/disasters"
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-7 py-3 rounded-full text-sm md:text-base font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Open Disaster Dashboard
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-slate-900/70 border border-slate-700 rounded-3xl p-5 shadow-2xl backdrop-blur">
              <h3 className="text-sm font-semibold text-slate-200 mb-3">
                Live situation overview
              </h3>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-800/80 rounded-2xl p-3">
                  <p className="text-slate-400">Active disasters</p>
                  <p className="text-2xl font-bold text-amber-300">{metrics.active_disasters}</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Across all regions
                  </p>
                </div>
                <div className="bg-slate-800/80 rounded-2xl p-3">
                  <p className="text-slate-400">High alerts</p>
                  <p className="text-2xl font-bold text-red-400">{metrics.high_alerts}</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Immediate attention
                  </p>
                </div>
                <div className="bg-slate-800/80 rounded-2xl p-3">
                  <p className="text-slate-400">Subscribers</p>
                  <p className="text-2xl font-bold text-emerald-400">{metrics.subscribers}</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Email & SMS
                  </p>
                </div>
              </div>
              <div className="mt-4 text-[11px] text-slate-400">
                Live data synced directly from the Django backend.
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Live Disaster Map */}
<section className="bg-slate-900 py-16 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-8">
      Live Disaster Map
    </h2>

    <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
      <DisasterMap />
    </div>
  </div>
</section>

      {/* Key benefits */}
      <section className="bg-white text-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition overflow-hidden">
              <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src="/images/card-monitoring.jpg"
                  alt="Monitoring network"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-1">Live monitoring</h3>
                <p className="text-sm text-gray-600 flex-1">
                  Disasters are recorded in a central dashboard built with Django REST
                  and React, updated in real time for operators.
                </p>
              </div>
            </div>

            <div className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition overflow-hidden">
              <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src="/images/card-control-centre.jpg"
                  alt="Control centre"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-1">Risk-based alerts</h3>
                <p className="text-sm text-gray-600 flex-1">
                  Each incident automatically generates LOW, MEDIUM, or HIGH alerts
                  so the public immediately understands the risk level.
                </p>
              </div>
            </div>

            <div className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition overflow-hidden">
              <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src="/images/card-public-warning.jpg"
                  alt="Public warning"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-1">Email & SMS reach</h3>
                <p className="text-sm text-gray-600 flex-1">
                  Citizens can subscribe with their email or phone number to receive
                  alerts as soon as they are published.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why build a system */}
      <section className="bg-gray-50 text-gray-900 py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why build a system to warn of natural hazards?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Disasters such as floods, earthquakes, and industrial accidents can
              escalate within minutes. Without a central early warning system,
              valuable time is lost and people do not know how to react.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              This project demonstrates how modern control-centre software and
              multi-channel notifications can quickly inform the public and reduce
              the impact of emergencies.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Contact control centre
            </Link>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img
              src="/images/solution.jpg"
              alt="Disaster warning and monitoring system"
              className="w-full h-full object-cover min-h-[260px]"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#1E293B] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            How the Disaster Alert System works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold mb-3">
                1
              </span>
              <h3 className="font-semibold mb-2">Disaster is recorded</h3>
              <p className="text-sm text-slate-200">
                An authorized operator logs a new disaster in the admin dashboard,
                including type, location, severity, and description.
              </p>
            </div>
            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-amber-400 text-xs font-bold mb-3">
                2
              </span>
              <h3 className="font-semibold mb-2">Alert is generated</h3>
              <p className="text-sm text-slate-200">
                The Django backend automatically creates an alert with LOW, MEDIUM,
                or HIGH level based on the severity value.
              </p>
            </div>
            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-red-500 text-xs font-bold mb-3">
                3
              </span>
              <h3 className="font-semibold mb-2">Public is notified</h3>
              <p className="text-sm text-slate-200">
                New alerts appear on the Alerts page and are sent via Email and SMS
                to all active subscribers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notification subscribe section (already implemented component) */}
      <NotificationSubscribe />

      {/* Final call to action */}
      <section className="bg-red-600 text-white py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              Ready to see the system in action?
            </h2>
            <p className="text-sm text-red-50">
              Subscribe for alerts and open the admin dashboard to simulate real
              disasters during your viva.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link
              to="/alerts"
              className="bg-white text-red-700 font-semibold px-5 py-2 rounded-full text-sm hover:bg-red-50 transition"
            >
              View public alerts
            </Link>
            <Link
              to="/admin/login"
              className="border border-white/80 text-white font-semibold px-5 py-2 rounded-full text-sm hover:bg-red-700/40 transition"
            >
              Go to admin panel
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

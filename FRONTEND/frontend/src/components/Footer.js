import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-slate-400 border-t border-slate-800 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">

        {/* Logo */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            Disaster Alert System
          </h3>

          <p className="text-sm">
            A disaster monitoring and early warning platform built using
            Django REST API and React. Designed to demonstrate real-time
            disaster awareness systems.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-semibold mb-4">Navigation</h4>

          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/alerts" className="hover:text-white">Alerts</Link></li>
            <li><Link to="/disasters" className="hover:text-white">Disasters</Link></li>
            <li><Link to="/map" className="hover:text-white">Live Map</Link></li>
          </ul>
        </div>

        {/* Project */}
        <div>
          <h4 className="text-white font-semibold mb-4">Project</h4>

          <p className="text-sm">
            BCA Final Year Project demonstrating modern disaster monitoring
            architecture with alerts, mapping and notifications.
          </p>
        </div>

      </div>

      <div className="text-center text-xs text-slate-600 pb-6">
        © {new Date().getFullYear()} Disaster Alert System
      </div>

    </footer>
  );
};

export default Footer;
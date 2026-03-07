import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* Project Info */}
        <div className="flex items-start gap-3">
          <img
            src="/images/footer-logo.png"
            alt="Disaster Alert System"
            className="w-10 h-10 rounded-full object-cover hidden sm:block"
          />
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Disaster Alert System
            </h3>
            <p className="text-sm text-slate-400">
              A real-time disaster monitoring and alert portal built with Django
              REST Framework and React as a BCA 6th semester project.
            </p>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-amber-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/disasters" className="hover:text-amber-300">
                Disaster dashboard
              </Link>
            </li>
            <li>
              <Link to="/alerts" className="hover:text-amber-300">
                Active alerts
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-amber-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-amber-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Credits */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Project details
          </h3>
          <p className="text-sm text-slate-400">
            Disaster Alert &amp; Early Warning demo{" "}
            <br className="hidden sm:block" />
            BCA 6th Semester &middot;{" "}
            <span className="text-slate-300">
              © {new Date().getFullYear()}
            </span>
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 pb-6">
        Built for academic and awareness purposes – inspired by real natural
        disaster warning systems.
      </div>
    </footer>
  );
};

export default Footer;

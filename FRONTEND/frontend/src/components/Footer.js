import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
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
            <p className="text-sm">
              A real-time disaster monitoring and alert system built using
              Django REST Framework and React for BCA 6th Semester.
            </p>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/disasters" className="hover:text-white">
                Disaster Dashboard
              </Link>
            </li>
            <li>
              <Link to="/alerts" className="hover:text-white">
                Active Alerts
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Credits */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Developed By
          </h3>
          <p className="text-sm">
            BCA 6th Semester Project <br />
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        Built for academic and awareness purposes
      </div>
    </footer>
  );
};

export default Footer;

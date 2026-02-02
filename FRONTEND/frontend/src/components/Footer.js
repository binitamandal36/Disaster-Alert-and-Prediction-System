import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {/* Project Info */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            Disaster Alert System
          </h3>
          <p className="text-sm">
            A real-time disaster monitoring and alert system built using
            Django REST Framework and React.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Disaster Alerts</li>
            <li className="hover:text-white cursor-pointer">Admin Panel</li>
          </ul>
        </div>

        {/* Credits */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Developed By</h3>
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

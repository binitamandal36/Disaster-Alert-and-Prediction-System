import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-16">
      <div className="max-w-5xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src="/images/about-team.jpg"
            alt="Project team"
            className="w-full md:w-1/2 h-56 object-cover rounded-xl shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold mb-3">
              About Disaster Alert System
            </h1>
            <p className="text-gray-700 text-sm">
              This project is a simplified model of real-world disaster early
              warning systems, built as a BCA 6th semester project. It
              demonstrates how a control centre can log disasters and how alerts
              can be delivered to the public through a modern web interface.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">System Features</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Admin dashboard for adding, editing, and deleting disasters.</li>
              <li>Automatic alert generation based on disaster severity.</li>
              <li>Public pages for viewing current disasters and active alerts.</li>
              <li>Expiry logic so outdated alerts no longer show to users.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Technology Stack</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Backend: Django & Django REST Framework.</li>
              <li>Frontend: React with Tailwind CSS.</li>
              <li>Database: SQLite for development/demo.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

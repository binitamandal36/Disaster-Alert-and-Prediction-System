import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-20">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6">
          About Disaster Alert & Prediction System
        </h1>

        <p className="text-gray-700 mb-4">
          This system is designed to monitor, manage, and display disaster-related
          information such as floods, earthquakes, landslides, and fires.
        </p>

        <p className="text-gray-700 mb-4">
          Administrators manage disaster data through a secure backend, while
          users receive alerts and risk-level information through a responsive
          frontend interface.
        </p>

        <p className="text-gray-700">
          The goal is to improve awareness, preparedness, and early response
          to natural hazards.
        </p>

      </div>
    </div>
  );
};

export default About;

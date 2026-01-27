import React, { useEffect, useState } from "react";
import { getDisasters } from "../services/api";

const DisasterList = () => {
  const [disasters, setDisasters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDisasters()
      .then(data => setDisasters(data))
      .catch(err => setError(err.message));
  }, []);

  const getRiskColor = (severity) => {
    if (severity <= 3) return "bg-green-500";
    if (severity <= 6) return "bg-orange-500";
    return "bg-red-500";
  };

  const getRiskText = (severity) => {
    if (severity <= 3) return "LOW";
    if (severity <= 6) return "MEDIUM";
    return "HIGH";
  };

  if (error) {
    return <p className="text-red-600 text-center mt-10">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Disaster Alert Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {disasters.map(disaster => (
          <div
            key={disaster.id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {disaster.title}
            </h2>

            <p className="text-gray-600"><b>Type:</b> {disaster.disaster_type}</p>
            <p className="text-gray-600"><b>Location:</b> {disaster.location}</p>
            <p className="text-gray-600"><b>Severity:</b> {disaster.severity_level}</p>

            <div className="mt-4 flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${getRiskColor(disaster.severity_level)}`}></span>
              <span className="font-semibold">
                {getRiskText(disaster.severity_level)} RISK
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisasterList;

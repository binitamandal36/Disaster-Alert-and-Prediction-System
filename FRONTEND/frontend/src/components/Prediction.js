import React from "react";

const Prediction = () => {
  const predictions = [
    {
      type: "Flood",
      condition: "Heavy rainfall for 3+ days",
      risk: "HIGH",
      color: "bg-red-500",
    },
    {
      type: "Landslide",
      condition: "Continuous rain in hilly areas",
      risk: "HIGH",
      color: "bg-red-500",
    },
    {
      type: "Earthquake",
      condition: "Seismic activity detected",
      risk: "MEDIUM",
      color: "bg-orange-500",
    },
    {
      type: "Fire",
      condition: "High temperature + dry season",
      risk: "LOW",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Disaster Prediction & Alerts
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {predictions.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {item.type}
            </h2>

            <p className="text-gray-600 mb-3">
              <b>Condition:</b> {item.condition}
            </p>

            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
              <span className="font-bold">{item.risk} RISK</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-500 mt-10">
        * Predictions are based on historical patterns and environmental indicators.
      </p>
    </div>
  );
};

export default Prediction;

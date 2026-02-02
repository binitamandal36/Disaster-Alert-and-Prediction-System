import React from "react";

const AlertBanner = ({ alert }) => {
  const getColor = (level) => {
    if (level === "HIGH") return "bg-red-600";
    if (level === "MEDIUM") return "bg-orange-500";
    return "bg-green-500";
  };

  return (
    <div
      className={`text-white p-4 rounded-xl shadow-md mb-4 ${getColor(
        alert.alert_level
      )}`}
    >
      <h2 className="text-lg font-bold">
        🚨 {alert.alert_level} RISK ALERT
      </h2>
      <p className="mt-1">{alert.message}</p>
    </div>
  );
};

export default AlertBanner;

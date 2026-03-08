import React from "react";

const severityColors = {
  LOW: "bg-green-500",
  MEDIUM: "bg-amber-500",
  HIGH: "bg-red-600",
};

const AlertCard = ({ alert, userLocation }) => {

  // Support both API and WebSocket formats
  const title = alert.title || alert.disaster?.title;
  const location = alert.location || alert.disaster?.location;
  const level = alert.level || alert.alert_level;

  const isMatch =
    userLocation &&
    location?.toLowerCase().includes(userLocation.toLowerCase());

  return (
    <div
      className={`p-5 rounded-xl shadow-lg transition border-l-8
      ${severityColors[level] || "bg-slate-600"}
      ${isMatch ? "scale-105 ring-4 ring-red-400" : "opacity-90 hover:opacity-100"}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg text-white">
          {title || "Unknown Alert"}
        </h3>

        <span className="text-xs bg-black/30 px-3 py-1 rounded-full text-white">
          {level || "INFO"}
        </span>
      </div>

      <p className="text-white text-sm mb-2">
        {alert.message || "No description available"}
      </p>

      <p className="text-xs text-white/80">
        📍 Location: <b>{location || "Unknown"}</b>
      </p>
    </div>
  );
};

export default AlertCard;
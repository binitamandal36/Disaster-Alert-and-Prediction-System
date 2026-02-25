import React from "react";

const severityColors = {
  LOW: "bg-green-500",
  MEDIUM: "bg-amber-500",
  HIGH: "bg-red-600",
};

const AlertCard = ({ alert, userLocation }) => {
  const isMatch =
    userLocation &&
    alert.location
      ?.toLowerCase()
      .includes(userLocation.toLowerCase());

  return (
    <div
      className={`p-5 rounded-xl shadow-lg transition border-l-8
      ${severityColors[alert.level]}
      ${isMatch ? "scale-105 ring-4 ring-red-400" : "opacity-80"}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg text-white">
          {alert.title}
        </h3>
        <span className="text-xs bg-black/30 px-3 py-1 rounded-full text-white">
          {alert.level}
        </span>
      </div>

      <p className="text-white text-sm mb-2">{alert.message}</p>

      <p className="text-xs text-white/80">
        📍 Location: <b>{alert.location}</b>
      </p>
    </div>
  );
};

export default AlertCard;

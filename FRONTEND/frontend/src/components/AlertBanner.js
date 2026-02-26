import React, { useEffect, useState } from "react";
import { getAlerts } from "../services/api";

const AlertBanner = () => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const data = await getAlerts();
        if (data.length > 0) {
          setAlert(data[0]); // latest alert
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlert();
  }, []);


  if (!alert) return null;

  return (
    <div className="mb-6 px-6 py-4 rounded-xl bg-red-500 text-white shadow-lg animate-pulse">
      <p className="font-bold text-lg">{alert.level} RISK ALERT</p>
      <p className="text-sm">
        {alert.title} – {alert.message}
      </p>
      <p className="text-xs mt-1">
        📍 {alert.location}{" "}
        {alert.created_at && (
          <span className="ml-2">
            • {new Date(alert.created_at).toLocaleString()}
          </span>
        )}
      </p>
    </div>
  );
};

export default AlertBanner;

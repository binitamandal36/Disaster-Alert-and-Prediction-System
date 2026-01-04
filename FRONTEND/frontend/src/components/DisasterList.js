import { useEffect, useState } from "react";
import { getDisasters } from "../services/api";

function DisasterList() {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    getDisasters().then(data => setDisasters(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Disaster Alerts</h1>

      <div className="grid gap-4">
        {disasters.map(disaster => (
          <div
            key={disaster.id}
            className="border rounded-lg p-4 shadow"
          >
            <h2 className="text-xl font-semibold">{disaster.title}</h2>
            <p><strong>Type:</strong> {disaster.disaster_type}</p>
            <p><strong>Location:</strong> {disaster.location}</p>
            <p><strong>Severity:</strong> {disaster.severity_level}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisasterList;

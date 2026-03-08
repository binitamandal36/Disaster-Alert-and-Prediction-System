import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getDisasters } from "../services/api";

const DisasterMap = () => {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDisasters();
      setDisasters(data);
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[28.3949, 84.124]} // Nepal center
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {disasters.map((d) => {
          if (!d.latitude || !d.longitude) return null;

          return (
            <Marker key={d.id} position={[d.latitude, d.longitude]}>
              <Popup>
                <strong>{d.title}</strong>
                <br />
                Type: {d.disaster_type}
                <br />
                Location: {d.location}
                <br />
                Severity: {d.severity_level}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default DisasterMap;
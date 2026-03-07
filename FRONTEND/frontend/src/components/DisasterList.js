import React, { useEffect, useState } from "react";
import { getDisasters } from "../services/api";

const DisasterList = () => {
  const [disasters, setDisasters] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const data = await getDisasters();
        setDisasters(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDisasters();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-sm text-slate-300">Loading disasters...</p>
      </div>
    );
  }

  const getRiskBadge = (severity) => {
    if (severity <= 3) {
      return "bg-green-100 text-green-700";
    } else if (severity <= 6) {
      return "bg-orange-100 text-orange-700";
    } else {
      return "bg-red-100 text-red-700";
    }
  };

  const getRiskText = (severity) => {
    if (severity <= 3) return "LOW";
    if (severity <= 6) return "MEDIUM";
    return "HIGH";
  };

  
  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-red-400 flex items-center justify-center px-4">
        <p>Error: {error}</p>
      </div>
    );
  }

  const filteredDisasters = disasters.filter(d => {
    const matchesSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      typeFilter === "" || d.disaster_type === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-2">
        Disaster dashboard
      </h1>
      <p className="text-center text-slate-300 mb-8 text-sm">
        Overview of all disasters recorded by the control centre.
      </p>
      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search by title or location..."
          className="w-full p-3 border border-slate-700 bg-slate-900 rounded-lg text-sm text-white placeholder:text-slate-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="flex-1 p-3 rounded-lg border border-slate-700 bg-slate-900 text-sm"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Earthquake">Earthquake</option>
          <option value="Flood">Flood</option>
          <option value="Landslide">Landslide</option>
          <option value="Fire">Fire</option>
          <option value="Cyclone">Cyclone</option>
          <option value="Tsunami">Tsunami</option>
          <option value="Drought">Drought</option>
          <option value="Storm">Storm</option>
          <option value="Avalanche">Avalanche</option>
          <option value="Volcano">Volcano</option>
          <option value="Heatwave">Heatwave</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDisasters.length === 0 && (
          <p className="text-center text-slate-400 col-span-full">
            No disasters found.
          </p>
        )}

        {filteredDisasters.map(disaster => (
          <div
            key={disaster.id}
            className="bg-slate-900 p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition border border-slate-700"
          >

                        {/*Title */}
            <h2 className="text-xl font-semibold mb-2 text-white">
              {disaster.title}
            </h2>

            <p className="text-slate-200"><b>Type:</b> {disaster.disaster_type}</p>
            <p className="text-slate-200"><b>Location:</b> {disaster.location}</p>
            <p className="text-slate-200"><b>Severity:</b> {disaster.severity_level}</p>

            <div className="mt-4 flex items-center gap-2">
                                {/*Risk Badge */}
              <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${getRiskBadge(
                disaster.severity_level
              )}`}
            >
              {getRiskText(disaster.severity_level)} RISK
            </span>

                            {/*Info */}
            <p className="text-slate-200 text-sm">
              <b>Type:</b> {disaster.disaster_type}
            </p>
            <p className="text-slate-200 text-sm">
              <b>Location:</b> {disaster.location}
            </p>

                          {/*Description */}
            <p className="text-slate-300 mt-3 text-sm line-clamp-3">
              {disaster.description}
            </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisasterList;

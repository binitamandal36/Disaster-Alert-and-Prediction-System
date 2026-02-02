import React, { useEffect, useState } from "react";
import { getDisasters } from "../services/api";

const DisasterList = () => {
  const [disasters, setDisasters] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    getDisasters()
      .then(data => setDisasters(data))
      .catch(err => setError(err.message));
      setLoading(false);
  }, []);

  if (loading) {
  return <p className="text-center mt-10">Loading...</p>;
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
    return <p className="text-red-600 text-center mt-10">Error: {error}</p>;
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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-10">
        Disaster Alert Dashboard
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search by title or location..."
          className="w-full p-3 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="flex-1 p-3 rounded-lg border border-gray-300"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Earthquake">Earthquake</option>
          <option value="Flood">Flood</option>
          <option value="Hurricane">Hurricane</option>
          <option value="Fire">Fire</option>
          <option value="Rainfall">Rainfall</option>
          <option value="Landslide">Landslide</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDisasters.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
          No disasters found.
          </p>
      )}

        {filteredDisasters.map(disaster => (
          <div
            key={disaster.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition"
          >

                        {/*Title */}
            <h2 className="text-xl font-semibold mb-2">
              {disaster.title}
            </h2>

            <p className="text-gray-600"><b>Type:</b> {disaster.disaster_type}</p>
            <p className="text-gray-600"><b>Location:</b> {disaster.location}</p>
            <p className="text-gray-600"><b>Severity:</b> {disaster.severity_level}</p>

            <div className="mt-4 flex items-center gap-2">
                                {/*Risk Badge */}
              <span
              className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-3 ${getRiskBadge(
                disaster.severity_level
              )}`}
            >
              {getRiskText(disaster.severity_level)} RISK
            </span>

                            {/*Info */}
            <p className="text-gray-700">
              <b>Type:</b> {disaster.disaster_type}
            </p>
            <p className="text-gray-700">
              <b>Location:</b> {disaster.location}
            </p>

                          {/*Description */}
            <p className="text-gray-600 mt-3 line-clamp-3">
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

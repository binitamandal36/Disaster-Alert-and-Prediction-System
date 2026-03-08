import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import {
  getCurrentAdmin,
  getAdminDisasters,
  getAdminAlerts,
  getAdminSubscriptions,
  createAdminDisaster,
  updateAdminDisaster,
  deleteAdminDisaster,
  logoutAdmin,
} from "../services/api";
import { useNavigate } from "react-router-dom";

const MapClickHandler = ({ setForm }) => {
  useMapEvents({
    click(e) {
      setForm((prev) => ({
        ...prev,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      }));
    },
  });
  return null;
};

const emptyForm = {
  title: "",
  disaster_type: "Flood",
  location: "",
  latitude: "",
  longitude: "",
  severity_level: 5,
  description: "",
  valid_until: "",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [disasters, setDisasters] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const me = await getCurrentAdmin();
        if (!me.isAuthenticated) {
          navigate("/admin/login");
          return;
        }
        await Promise.all([loadDisasters(), loadAlerts(), loadSubscriptions()]);
      } catch (err) {
        navigate("/admin/login");
      } finally {
        setCheckingAuth(false);
      }
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDisasters = async () => {
    const data = await getAdminDisasters();
    setDisasters(data);
  };

  const loadAlerts = async () => {
    const data = await getAdminAlerts();
    setAlerts(data);
  };

  const loadSubscriptions = async () => {
    const data = await getAdminSubscriptions();
    setSubscriptions(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "severity_level"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = { ...form };
      if (!payload.valid_until) {
        delete payload.valid_until;
      }
      if (payload.latitude === "") {
        payload.latitude = null;
      } else {
        payload.latitude = parseFloat(payload.latitude);
      }
      if (payload.longitude === "") {
        payload.longitude = null;
      } else {
        payload.longitude = parseFloat(payload.longitude);
      }

      if (editingId) {
        await updateAdminDisaster(editingId, payload);
        setSuccessMessage("Disaster updated successfully!");
      } else {
        await createAdminDisaster(payload);
        setSuccessMessage("Disaster created! SMS, Email, and Push Notifications have been dispatched to subscribers.");
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadDisasters();
      setTimeout(() => setSuccessMessage(null), 6000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (disaster) => {
    setEditingId(disaster.id);
    setForm({
      title: disaster.title,
      disaster_type: disaster.disaster_type,
      location: disaster.location,
      latitude: disaster.latitude || "",
      longitude: disaster.longitude || "",
      severity_level: disaster.severity_level,
      description: disaster.description,
       valid_until: disaster.valid_until || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this disaster?")) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await deleteAdminDisaster(id);
      await loadDisasters();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
    } finally {
      navigate("/admin/login");
    }
  };

  if (checkingAuth) {
    return <p className="text-center mt-10">Loading admin session...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-900 text-white">
          <div>
            <h1 className="text-xl font-semibold">Admin Control Centre</h1>
            <p className="text-xs text-slate-200">
              Manage recorded disasters and see generated alerts.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Left: Disasters form and list */}
          <div className="border-r px-6 py-4 space-y-4">
            <h2 className="text-lg font-semibold mb-2">
              {editingId ? "Edit Disaster" : "Add New Disaster"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full border rounded-lg px-3 py-2"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., Severe Flood in Riverside Area"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Disaster Type
                  </label>
                  <select
                    name="disaster_type"
                    className="w-full border rounded-lg px-3 py-2"
                    value={form.disaster_type}
                    onChange={handleChange}
                  >
                    <option value="Flood">Flood</option>
                    <option value="Earthquake">Earthquake</option>
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

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Severity (1–10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    name="severity_level"
                    value={form.severity_level}
                    onChange={handleChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 (Low)</span>
                    <span>Current: {form.severity_level}</span>
                    <span>10 (High)</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  className="w-full border rounded-lg px-3 py-2"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g., Sudurpachim, coastal region"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    className="w-full border rounded-lg px-3 py-2"
                    value={form.latitude}
                    onChange={handleChange}
                    placeholder="e.g. 28.39"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    className="w-full border rounded-lg px-3 py-2"
                    value={form.longitude}
                    onChange={handleChange}
                    placeholder="e.g. 84.12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Pick Location from Map (Click on Map)
                </label>
                <div className="z-0 border rounded-lg overflow-hidden" style={{ height: "250px", width: "100%" }}>
                  <MapContainer
                    center={[28.3949, 84.1240]} // Nepal center
                    zoom={6}
                    style={{ height: "100%", width: "100%", zIndex: 1 }}
                  >
                    <TileLayer
                      attribution="&copy; OpenStreetMap"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler setForm={setForm} />
                    {form.latitude && form.longitude && (
                      <Marker position={[form.latitude, form.longitude]} />
                    )}
                  </MapContainer>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Valid until (optional)
                </label>
                <input
                  type="date"
                  name="valid_until"
                  className="w-full border rounded-lg px-3 py-2"
                  value={form.valid_until}
                  onChange={handleChange}
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  After this date, the alert will automatically stop showing on
                  the public alerts list and home banner.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Short summary of situation and impact..."
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60"
                >
                  {editingId
                    ? loading
                      ? "Saving..."
                      : "Save Changes"
                    : loading
                    ? "Adding..."
                    : "Add Disaster"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setForm(emptyForm);
                    }}
                    className="px-4 py-2 rounded-lg border text-sm font-semibold"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {error && (
                <p className="text-xs text-red-600 mt-1">{error}</p>
              )}
              {successMessage && (
                <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm relative">
                  <span className="block sm:inline">{successMessage}</span>
                </div>
              )}
            </form>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Recent Disasters</h2>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                {disasters.map((d) => (
                  <div
                    key={d.id}
                    className="border rounded-lg px-3 py-2 flex justify-between items-start bg-slate-50"
                  >
                    <div>
                      <p className="font-semibold">{d.title}</p>
                      <p className="text-xs text-gray-600">
                        {d.disaster_type} • {d.location}
                      </p>
                      <p className="text-xs text-gray-600">
                        Severity: {d.severity_level}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleEdit(d)}
                        className="text-xs px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {disasters.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No disasters recorded yet.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right: Alerts overview */}
          <div className="px-6 py-4 bg-slate-50">
            <h2 className="text-lg font-semibold mb-2">System Alerts</h2>
            <p className="text-xs text-gray-600 mb-3">
              These alerts are automatically generated from recorded disasters.
            </p>
            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-2">
              {alerts.map((a) => (
                <div
                  key={a.id}
                  className="border rounded-lg px-3 py-2 bg-white shadow-sm"
                >
                  <p className="text-xs font-semibold text-red-600">
                    {a.level} RISK
                  </p>
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-gray-700">{a.message}</p>
                  <p className="text-[10px] text-gray-500 mt-1">
                    {a.location} •{" "}
                    {a.created_at &&
                      new Date(a.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
              {alerts.length === 0 && (
                <p className="text-sm text-gray-500">
                  No alerts have been generated yet.
                </p>
              )}
            </div>

            <div className="mt-6 border-t pt-4">
              <h2 className="text-lg font-semibold mb-2">Active Subscribers</h2>
              <p className="text-xs text-gray-600 mb-3">
                People receiving automatic notifications when disasters occur.
              </p>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {subscriptions.map((s) => (
                  <div key={s.id} className="border rounded-lg px-3 py-2 bg-white shadow-sm flex flex-col gap-1">
                    {s.email && <p className="text-sm">📧 {s.email}</p>}
                    {s.phone && <p className="text-sm">📱 {s.phone}</p>}
                    {s.push_subscription && <p className="text-sm">🌐 Web Push Subscribed</p>}
                    <p className="text-[10px] text-gray-500 font-semibold mt-1">
                      Min Level: {s.min_level} | Active: {s.is_active ? "Yes" : "No"} | Created: {new Date(s.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                {subscriptions.length === 0 && (
                  <p className="text-sm text-gray-500">No active subscribers found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


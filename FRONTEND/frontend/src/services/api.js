const API_BASE_URL = "http://127.0.0.1:8000/api";

export const getDisasters = async () => {
  const response = await fetch(`${API_BASE_URL}/disasters/`);

  if (!response.ok) {
    throw new Error("Failed to fetch disasters");
  }

  return response.json();
};

export const getAlerts = async () => {
  const response = await fetch(`${API_BASE_URL}/alerts/`);

  if (!response.ok) {
    throw new Error("Failed to fetch alerts");
  }

  return response.json();
};
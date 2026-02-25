const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

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

export const predictRisk = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/predict/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const fallbackMessage = "Failed to get prediction. Please try again.";
    let detail = fallbackMessage;

    try {
      const errorBody = await response.json();
      if (errorBody && errorBody.detail) {
        detail = errorBody.detail;
      }
    } catch {
      // ignore JSON parsing errors and use fallback
    }

    throw new Error(detail);
  }

  return response.json();
};
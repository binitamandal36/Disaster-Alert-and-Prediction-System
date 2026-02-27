const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";
  
export const getDisasters = async () => {
  const response = await fetch(`${API_BASE_URL}/disasters/`);

  if (!response.ok) {
    throw new Error("Failed to fetch disasters");
  }

  return response.json();
};

export const createDisaster = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/disasters/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const fallbackMessage = "Failed to report disaster. Please check your input.";
    let detail = fallbackMessage;

    try {
      const errorBody = await response.json();
      if (typeof errorBody === "object") {
        if (errorBody.detail) {
          detail = errorBody.detail;
        } else {
          const firstKey = Object.keys(errorBody)[0];
          if (firstKey && Array.isArray(errorBody[firstKey])) {
            detail = errorBody[firstKey][0];
          }
        }
      }
    } catch {
      // ignore JSON parsing errors and use fallback
    }

    throw new Error(detail);
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

// Admin authentication helpers (Django session-based)
export const loginAdmin = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/admin/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    let message = "Failed to log in as admin.";
    try {
      const body = await response.json();
      if (body && body.detail) {
        message = body.detail;
      }
    } catch {
      // ignore parse error
    }
    throw new Error(message);
  }

  return response.json();
};

export const logoutAdmin = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/logout/`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to log out admin.");
  }

  return response.json();
};

export const getCurrentAdmin = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/me/`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to check admin session.");
  }

  return response.json();
};

// Admin-only disaster management APIs
export const getAdminDisasters = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/disasters/`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load disasters for admin.");
  }

  return response.json();
};

export const createAdminDisaster = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/admin/disasters/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create disaster.");
  }

  return response.json();
};

export const updateAdminDisaster = async (id, payload) => {
  const response = await fetch(`${API_BASE_URL}/admin/disasters/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update disaster.");
  }

  return response.json();
};

export const deleteAdminDisaster = async (id) => {
  const response = await fetch(`${API_BASE_URL}/admin/disasters/${id}/`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete disaster.");
  }

  return true;
};

export const getAdminAlerts = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/alerts/`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load alerts for admin.");
  }

  return response.json();
};
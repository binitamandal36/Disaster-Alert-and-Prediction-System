const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function getDisasters() {
  const response = await fetch(`${API_BASE_URL}/disasters/`);
  return response.json();
}

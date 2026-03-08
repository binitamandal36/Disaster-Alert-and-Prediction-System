import requests

def get_coordinates(location_name: str):
    """
    Uses OpenStreetMap's Nominatim API to geocode a location name
    into latitude and longitude floats.
    
    Returns:
        (latitude, longitude) or (None, None) if not found/failed
    """
    if not location_name:
        return None, None

    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": location_name,
        "format": "json",
        "limit": 1
    }
    headers = {
        "User-Agent": "DisasterAlertSystem/1.0"
    }

    try:
        response = requests.get(url, params=params, headers=headers, timeout=5)
        response.raise_for_status()
        data = response.json()
        if data:
            best_match = data[0]
            return float(best_match["lat"]), float(best_match["lon"])
    except Exception as e:
        print(f"[GEOCODING ERROR] Failed to geocode '{location_name}': {e}")
    
    return None, None

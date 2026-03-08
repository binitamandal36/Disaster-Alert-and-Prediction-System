def calculate_risk(disaster):
    """
    Simple risk prediction algorithm
    """

    severity_weight = {
        "LOW": 1,
        "MEDIUM": 2,
        "HIGH": 3,
        "CRITICAL": 4
    }

    base_score = severity_weight.get(disaster.severity_level, 1) * 20

    # Example: location risk boost
    if "Kathmandu" in disaster.location:
        base_score += 10

    if "Terai" in disaster.location:
        base_score += 15

    return min(base_score, 100)
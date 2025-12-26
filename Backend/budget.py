import requests
from config import OPENROUTE_API_KEY

def destination_cost_factor(start, destination):
    url = "https://api.openrouteservice.org/v2/directions/driving-car"
    headers = {"Authorization": OPENROUTE_API_KEY}
    params = {
        "start": start,
        "end": destination
    }

    res = requests.get(url, headers=headers, params=params).json()
    distance_km = res["features"][0]["properties"]["segments"][0]["distance"] / 1000

    if distance_km < 500:
        return 1.0
    elif distance_km < 2000:
        return 1.8
    else:
        return 3.5

def estimate_budget(days, people, budget, start, destination):
    base_cost = {
        "low": 1500,
        "mid": 3000,
        "high": 6000,
        "luxury": 12000
    }

    factor = destination_cost_factor(start, destination)
    daily = base_cost[budget] * factor

    return {
        "distance_factor": factor,
        "daily_cost": round(daily),
        "total_cost": round(daily * days * people)
    }

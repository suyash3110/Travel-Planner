import json
import math
import os
from geopy.geocoders import Nominatim

# 1. MATH FUNCTION
def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c

# 2. FIND AIRPORT FUNCTION
def find_nearest_airport(dest_lat, dest_lon):
    current_folder = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(current_folder, 'airports.json')
    
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            airports_data = json.load(f)
    except FileNotFoundError:
        return None

    nearest = None
    shortest_distance = float('inf')
    for code, info in airports_data.items():
        if 'lat' in info and 'lon' in info:
            dist = calculate_distance(dest_lat, dest_lon, float(info['lat']), float(info['lon']))
            if dist < shortest_distance:
                shortest_distance = dist
                nearest = {"name": info['name'], "iata": code, "distance": round(dist, 2)}
    return nearest

# 3. BUDGET LOGIC
def calculate_budget(distance):
    if distance < 100:
        return "Taxi", round(distance * 20, 2)
    elif distance <= 300:
        return "Private Cab/Bus", round(distance * 10, 2)
    else:
        return "Train/Public Bus", round(distance * 2, 2)

# 4. THE MAIN ENGINE (The part that actually runs)
def run_app():
    print("\n--- TRAVEL BUDGET CALCULATOR ---")
    dest_name = input("Enter Destination (e.g. Manali): ")
    
    print(f"Searching for {dest_name}...")
    geolocator = Nominatim(user_agent="travel_app")
    location = geolocator.geocode(dest_name)
    
    if location:
        print(f"Coordinates found: {location.latitude}, {location.longitude}")
        airport = find_nearest_airport(location.latitude, location.longitude)
        
        if airport:
            transport, cost = calculate_budget(airport['distance'])
            print("\n" + "="*30)
            print(f"Nearest Airport: {airport['name']}")
            print(f"Distance: {airport['distance']} km")
            print(f"Recommended: {transport}")
            print(f"Estimated Cost: Rs. {cost}")
            print("="*30)
        else:
            print("Error: Could not find airport in database.")
    else:
        print("Error: Location not found. Check your internet/spelling.")

# THE TRIGGER - DO NOT REMOVE THIS
if __name__ == "__main__":
    run_app()
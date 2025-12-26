from budget import estimate_budget
from weather import get_weather
from packing import packing_suggestions
from hotels import hotel_suggestions
from itinerary import generate_itinerary
from language import language_info
from emergency import emergency_contacts

def travel_planner(data):
    weather_data = get_weather(data["destination"])

    return {
        "budget": estimate_budget(
            data["days"],
            data["people"],
            data["budget"],
            data["start"],
            data["destination"]
        ),
        "weather": weather_data,
        "packing": packing_suggestions(
            weather_data["condition"],
            weather_data["temperature"]
        ),
        "hotels": hotel_suggestions(data["destination"], data["budget"]),
        "itinerary": generate_itinerary(
            data["days"], data["pace"], data["destination"]
        ),
        "languages": language_info(data["country"]),
        "emergency": emergency_contacts(data["country"])
    }

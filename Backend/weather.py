import requests
from config import OPENWEATHER_API_KEY

def get_weather(city):
    url = "https://api.openweathermap.org/data/2.5/forecast"
    params = {
        "q": city,
        "appid": OPENWEATHER_API_KEY,
        "units": "metric"
    }

    data = requests.get(url, params=params).json()
    weather = data["list"][0]["weather"][0]["main"].lower()
    temp = data["list"][0]["main"]["temp"]

    return {
        "condition": weather,
        "temperature": temp
    }

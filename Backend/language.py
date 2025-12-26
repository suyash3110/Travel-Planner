import requests

def language_info(country):
    url = f"https://restcountries.com/v3.1/name/{country}"
    data = requests.get(url).json()[0]

    languages = list(data["languages"].values())
    return languages

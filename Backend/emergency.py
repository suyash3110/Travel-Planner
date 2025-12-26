def emergency_contacts(country):
    country = country.lower()

    india = {
        "police": 112,
        "ambulance": 108,
        "fire": 101
    }

    global_numbers = {
        "usa": 911,
        "uk": 999,
        "canada": 911,
        "australia": 000,
        "japan": 110
    }

    if country == "india":
        return india
    return {"emergency": global_numbers.get(country, "Check local authority")}

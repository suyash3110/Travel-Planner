def packing_suggestions(weather, temp):
    items = []

    if temp < 10:
        items += ["Heavy Jacket", "Thermals", "Gloves"]
    elif temp < 20:
        items += ["Light Jacket", "Full Sleeves"]
    else:
        items += ["Cotton Clothes", "Sunglasses"]

    if "rain" in weather:
        items += ["Umbrella", "Raincoat"]

    return list(set(items))

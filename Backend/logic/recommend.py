def recommend_destination(budget, days, people, place_type):
    if place_type == "beach":
        return "Goa"
    elif place_type == "mountain":
        return "Manali"
    else:
        return "Jaipur"

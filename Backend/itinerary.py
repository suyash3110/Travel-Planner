def generate_itinerary(days, pace, destination):
    itinerary = []

    for d in range(1, days + 1):
        if pace == "slow":
            plan = f"Day {d}: Explore local attractions of {destination}"
        elif pace == "fast":
            plan = f"Day {d}: Visit major landmarks and activities in {destination}"
        else:
            plan = f"Day {d}: Balanced sightseeing and leisure in {destination}"

        itinerary.append(plan)

    return itinerary

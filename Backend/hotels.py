def hotel_suggestions(destination, budget):
    hotels = {
        "low": ["Zostel", "OYO", "Hostelworld"],
        "mid": ["Treebo", "FabHotels", "Ibis"],
        "high": ["Taj", "Marriott", "Hyatt"],
        "luxury": ["Oberoi", "JW Marriott", "St Regis"]
    }

    booking_links = {
        "Booking": f"https://www.booking.com/searchresults.html?ss={destination}",
        "MakeMyTrip": f"https://www.makemytrip.com/hotels/{destination}-hotels.html",
        "Airbnb": f"https://www.airbnb.com/s/{destination}"
    }

    return {
        "recommended_hotels": hotels[budget],
        "booking_links": booking_links
    }

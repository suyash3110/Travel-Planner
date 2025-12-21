class TripInput(BaseModel):
    budget: int
    days: int
    people: int
    trip_type: str
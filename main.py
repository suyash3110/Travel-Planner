from pydantic import BaseModel
class TripInput(BaseModel):
    budget: int
    days: int
    people: int
    trip_type: str

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Swayam API is working!"}
@app.post("/test")
def test_post():
    return {"message": "POST API is working"}

@app.post("/plan-trip")
def plan_trip(data: TripInput):
    return {
        "budget": data.budget,
        "days": data.days,
        "people": data.people,
        "type": data.trip_type
    }



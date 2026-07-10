import os
import json
import uuid
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import boto3
from botocore.exceptions import ClientError

load_dotenv()

app = FastAPI(title="TravelAI API")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AWS Bedrock client
try:
    bedrock_client = boto3.client(
        service_name="bedrock-runtime",
        region_name=os.getenv("AWS_DEFAULT_REGION", "us-east-1")
    )
except Exception as e:
    print(f"Failed to initialize AWS Bedrock client: {e}")
    bedrock_client = None

# Pydantic models for request and response
class TripRequest(BaseModel):
    startingCity: str
    destination: str
    days: int
    budget: str
    travelStyle: str
    startDate: str

class DayItinerary(BaseModel):
    day: int
    activities: List[str]
    weather_guess: str
    packing_suggestions: str

class TripResponse(BaseModel):
    id: str
    itinerary: List[DayItinerary]
    estimatedBudget: str

class InspireRequest(BaseModel):
    vibe: str
    budget: str

class DestinationSuggestion(BaseModel):
    name: str
    description: str
    highlights: List[str]
    estimated_cost: str

class InspireResponse(BaseModel):
    suggestions: List[DestinationSuggestion]

@app.get("/")
def read_root():
    return {"message": "Welcome to TravelAI API"}

@app.post("/api/generate-trip", response_model=TripResponse)
async def generate_trip(request: TripRequest):
    if not bedrock_client:
        # Mock response for development if Bedrock isn't configured
        return TripResponse(
            id=str(uuid.uuid4()),
            itinerary=[
                DayItinerary(
                    day=1,
                    activities=["Check-in Hotel", "Beach Visit", "Sunset Point", "Dinner Cruise"],
                    weather_guess="28°C • Sunny",
                    packing_suggestions="sunglasses, sunscreen and flip-flops"
                )
            ],
            estimatedBudget="₹18,500"
        )

    # Prompt Engineering for Claude 3
    system_prompt = """
    You are an expert AI travel planner. Your task is to generate a detailed day-by-day itinerary based on the user's travel preferences.
    You MUST return the output EXACTLY as a valid JSON object. Do not include any other text, markdown formatting, or preamble.
    
    The JSON should have this exact structure:
    {
      "itinerary": [
        {
          "day": 1,
          "activities": ["Activity 1", "Activity 2"],
          "weather_guess": "e.g., 28°C • Sunny",
          "packing_suggestions": "e.g., sunglasses, sunscreen"
        }
      ],
      "estimatedBudget": "Overall estimated budget in the requested currency"
    }
    """

    user_prompt = f"""
    Please generate a trip plan with the following details:
    Starting City: {request.startingCity}
    Destination: {request.destination}
    Duration: {request.days} days
    Budget: {request.budget}
    Travel Style: {request.travelStyle}
    Start Date: {request.startDate}
    """

    try:
        response = bedrock_client.invoke_model(
            modelId="anthropic.claude-3-haiku-20240307-v1:0",
            body=json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 2000,
                "system": system_prompt,
                "messages": [
                    {"role": "user", "content": user_prompt}
                ],
                "temperature": 0.7
            })
        )
        
        response_body = json.loads(response.get('body').read())
        content = response_body.get('content')[0].get('text')
        
        # Parse the JSON from the LLM
        # Sometimes LLMs wrap JSON in markdown blocks even when told not to.
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
             content = content.split("```")[1].split("```")[0].strip()
             
        parsed_data = json.loads(content)
        
        # Optional: Save to S3 logic would go here
        
        return TripResponse(
            id=str(uuid.uuid4()),
            itinerary=parsed_data.get("itinerary", []),
            estimatedBudget=parsed_data.get("estimatedBudget", request.budget)
        )
        
    except ClientError as e:
        print(f"AWS Bedrock ClientError: {e}")
        raise HTTPException(status_code=500, detail="Error generating AI itinerary.")
    except json.JSONDecodeError as e:
        print(f"Failed to parse LLM response as JSON: {content}")
        raise HTTPException(status_code=500, detail="Failed to parse AI response.")
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/inspire", response_model=InspireResponse)
async def inspire(request: InspireRequest):
    if not bedrock_client:
        return InspireResponse(
            suggestions=[
                DestinationSuggestion(
                    name="Bali, Indonesia",
                    description="A tropical paradise perfect for a relaxing beach vacation with rich culture.",
                    highlights=["Uluwatu Temple", "Seminyak Beach", "Ubud Rice Terraces"],
                    estimated_cost="₹45,000"
                ),
                DestinationSuggestion(
                    name="Phuket, Thailand",
                    description="Beautiful beaches, vibrant nightlife, and amazing street food.",
                    highlights=["Phi Phi Islands", "Patong Beach", "Big Buddha"],
                    estimated_cost="₹40,000"
                ),
                DestinationSuggestion(
                    name="Maldives",
                    description="The ultimate luxury beach destination with crystal clear waters.",
                    highlights=["Snorkeling", "Overwater Bungalows", "Private Beaches"],
                    estimated_cost="₹90,000"
                )
            ]
        )

    system_prompt = """
    You are an expert AI travel agent. The user will provide a 'vibe' (e.g. relaxing beach, adventure, history) and a budget.
    You must suggest 3 amazing destinations that fit their criteria.
    You MUST return the output EXACTLY as a valid JSON object. Do not include any other text, markdown formatting, or preamble.
    
    The JSON should have this exact structure:
    {
      "suggestions": [
        {
          "name": "Destination Name (e.g. Bali, Indonesia)",
          "description": "A 1-2 sentence description of why it fits.",
          "highlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
          "estimated_cost": "Estimated cost for a trip here in the requested currency"
        }
      ]
    }
    """

    user_prompt = f"""
    Vibe: {request.vibe}
    Budget: {request.budget}
    """

    try:
        response = bedrock_client.invoke_model(
            modelId="anthropic.claude-3-haiku-20240307-v1:0",
            body=json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 1500,
                "system": system_prompt,
                "messages": [
                    {"role": "user", "content": user_prompt}
                ],
                "temperature": 0.8
            })
        )
        
        response_body = json.loads(response.get('body').read())
        content = response_body.get('content')[0].get('text')
        
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
             content = content.split("```")[1].split("```")[0].strip()
             
        parsed_data = json.loads(content)
        
        return InspireResponse(
            suggestions=parsed_data.get("suggestions", [])
        )
        
    except ClientError as e:
        print(f"AWS Bedrock ClientError: {e}")
        raise HTTPException(status_code=500, detail="Error generating AI inspiration.")
    except json.JSONDecodeError as e:
        print(f"Failed to parse LLM response as JSON: {content}")
        raise HTTPException(status_code=500, detail="Failed to parse AI response.")
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
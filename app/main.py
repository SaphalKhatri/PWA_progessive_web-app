import os
from dotenv import load_dotenv
from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

load_dotenv()

MONGO_URL= os.getenv("MONGODB_URL")
FRONTEND_URL=os.getenv("FRONTEND_URL")

app= FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

#connection to mongodb
client= MongoClient(MONGO_URL)
db= client["PWA"]
messages_collection= db["messages"]

@app.get("/hello")
def get_hello():
    doc= messages_collection.find_one({},{"_id":0})

    if doc and "message" in doc:
        return {"message":doc["message"]}
    
    return{"message":"hello from fastapi"}
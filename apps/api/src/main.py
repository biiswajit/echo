import os
from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv() # load environment variables from .env

app = FastAPI()

@app.get("/greet/{name}")
async def greet(name):
    print(os.environ.get("API_KEY"))
    return {"message": f"hello, {name}"}

@app.get("/")
async def main():
    print(os.environ.get("API_KEY"))
    return "Hello, there!"

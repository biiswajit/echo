import os
from fastapi import FastAPI
from dotenv import load_dotenv
from .lib.models import Gemini
from typing import Dict

load_dotenv() # load environment variables from .env

"""
API Endpoints:
GET /discussion/all(limit&offset)
UPDATE /discussion/rename??discussionId=
DELETE /discussion/delete??discussionId=
POST /discussion/new
GET /chat/all??discussionId=
POST /chat/init
POST /chat/new
"""

app = FastAPI()

@app.get("/greet/{name}")
async def greet(name):
    print(os.environ.get("API_KEY"))
    return {"message": f"hello, {name}"}

@app.get("/prompt/{prompt}")
async def main(prompt: str) -> Dict[str, bool | str]:
    gemini = Gemini()
    res = gemini.generate_title(prompt)
    if res:
        return {"success": True, "title": res}
    else:
        return {"success": False, "title": ""}
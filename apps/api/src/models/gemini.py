from src.models.base import Model
from google import genai
from google.genai import types
from dotenv import load_dotenv
from typing import Optional, Dict, Any
from src.prompts.title import TITLE_SYSTEM_PROMPT
import os

load_dotenv() # load the environment variables from the .env file

class Gemini(Model):
    __instance = None
    def __init__(self):
        if Gemini.__instance is not None:
            raise Exception("This is a singleton class!")
        else:
            key = os.environ.get("GEMINI_API_KEY")
            self.client = genai.Client(api_key=key)
            Gemini.__instance = self

    def generate_title(
        self,
        prompt: str,
        model_params: Optional[Dict[str, Any]] = None
    ) -> str:
        try:
            response = self.client.models.generate_content(
                model="gemini-2.0-flash",
                config=types.GenerateContentConfig(system_instruction=TITLE_SYSTEM_PROMPT),
                contents=[prompt]
            )
            return response.text
        except Exception as e:
            print(f"an error raised while generating title (model - gemini). here is more info. {str(e)}")
            return ""

    def generate_response(self, prompt, conversation_history=None, model_params=None):
        return ""

    def reply_to_selection(self, selected_text, additional_prompt=None, conversation_history=None, model_params=None):
        return ""

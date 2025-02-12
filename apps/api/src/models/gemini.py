from src.models.base import Model
from google import genai
from google.genai import types
from dotenv import load_dotenv
from typing import Optional, Dict, Generator, Any, List
from src.prompts.title import TITLE_SYSTEM_PROMPT
import os
from src.prompts.response import RESPONSE_SYSTEM_PROMPT
from src.functions.history_formatter import format_history
from src.functions.inline_editor import inline_editor

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
        model_params: Optional[List[Dict[str, Any]]] = None
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

    def generate_response(
        self, 
        prompt: str, 
        conversation_history: Optional[List[Dict[str, str]]]=None, 
        model_params: Optional[List[Dict[str, Any]]] = None
    ) -> Generator[str, None, str]:
        if conversation_history:
            prompt = format_history(conversation_history) + prompt
        try:
            response = self.client.models.generate_content_stream(
                model="gemini-2.0-flash",
                config=types.GenerateContentConfig(system_instruction=RESPONSE_SYSTEM_PROMPT),
                content=[prompt]
            )
            full_response = ""
            for chunk in response:
                full_response += chunk.text
                yield chunk.text
            return full_response
        except Exception as e:
            print(f"an error raised while generating response (model - gemini). here is more info. {str(e)}")
            return ""

    def reply_to_selection(
        self, 
        selected_text: str, 
        additional_prompt: Optional[str] = None,
        conversation_history: Optional[List[Dict[str, str]]] = None, 
        model_params: Optional[List[Dict[str, Any]]] = None
    ) -> Generator[str, None, str]:
        prompt = ""
        if conversation_history:
            prompt = format_history(conversation_history) + inline_editor(selected_text, additional_prompt)
        else:
            prompt = inline_editor(selected_text, additional_prompt)
        try:
            response = self.client.models.generate_content_stream(
                model="gemini-2.0-flash",
                config=types.GenerateContentConfig(system_instruction=RESPONSE_SYSTEM_PROMPT),
                content=[prompt]
            )
            full_response = ""
            for chunk in response:
                full_response += chunk.text
                yield chunk.text
            return full_response
        except Exception as e:
            print(f"an error raised while generating response (model - gemini). here is more info. {str(e)}")
            return ""
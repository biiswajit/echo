from abc import ABC, abstractmethod
from typing import Optional, Dict, Generator, Any, List

class Model(ABC):
    @abstractmethod
    def __init__(self):
        pass

    @abstractmethod
    def generate_title(
        self,
        prompt: str,
        model_params: Optional[List[Dict[str, Any]]] = None
    ) -> str:
        """
        Based on the first prompt get the title for the new discussion.

        Parameters:
        - prompt (str): The user input for which a discussion title is required.
        - model_params (Optional[Dict[str, Any]]): A dictionary of parameters to configure the model (e.g., temperature, max tokens).

        Returns:
        - str: the title
        """
        pass

    @abstractmethod
    def generate_response(
        self,
        prompt: str,
        conversation_history: Optional[List[Dict[str, str]]] = None,
        model_params: Optional[List[Dict[str, Any]]] = None
    ) -> Generator[str, None, str]:
        """
        Generate a new response for the given prompt.

        Parameters:
        - prompt (str): The user input for which a new response is required.
        - conversation_history (Optional[list]): A list containing previous interactions, useful for maintaining context.
        - model_params (Optional[Dict[str, Any]]): A dictionary of parameters to configure the model (e.g., temperature, max tokens).

        Returns:
        - str: The regenerated response from the model.
        """
        pass

    @abstractmethod
    def reply_to_selection(
        self,
        selected_text: str,
        additional_prompt: Optional[str] = None,
        conversation_history: Optional[List[Dict[str, str]]] = None,
        model_params: Optional[List[Dict[str, Any]]] = None
    ) -> str:
        """
        Generates a response explaining or expanding on the selected text from a previous response.

        Parameters:
        - selected_text (str): The specific part of the response the user wants explained or elaborated on.
        - additional_prompt (Optional[str]): Any extra instructions or context the user provides.
        - conversation_history (Optional[list]): Previous messages in the conversation to maintain context.
        - model_params (Optional[Dict[str, Any]]): Custom model parameters like temperature, max tokens, etc.

        Returns:
        - str: The model's response explaining or elaborating on the selected text.
        """
        pass

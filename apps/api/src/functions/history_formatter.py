def format_history(history: dict) -> str:
    if history is None:
        return ""
    formatted_history: str = "Here's a conversation history: \n"
    for role, message in history:
        formatted_history += f"{role}: {message}\n"
    formatted_history += "Based on the above conversation, answer the following question: \n"
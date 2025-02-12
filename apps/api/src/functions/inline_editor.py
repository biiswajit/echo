from typing import Optional

def inline_editor(
    selected_text: str,
    additional_prompt: Optional[str] = None,
) -> str:
    return f"""
    You are assisting the user in refining or expanding a specific part of a previous response.
    The user has selected the following text:
    <user_selected_text>
    {selected_text}
    </user_selected_text>
    They have provided the following additional instructions:
    <additional_instructions>
    {additional_prompt}
    </additional_instructions>
    Modify, expand, or clarify the selected text while ensuring it remains contextually consistent with the original response. 
    Keep the response concise and relevant to the user's instructions.
    """    
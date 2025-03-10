export function inlineEditor(selectedText: string, prompt: string): string {
  return `
    You are assisting the user in refining or expanding a specific part of a previous response.
    The user has selected the following text:
    <user_selected_text>
    ${selectedText}
    </user_selected_text>
    They have provided the following additional instructions:
    <additional_instructions>
    ${prompt}
    </additional_instructions>
    Modify, expand, or clarify the selected text while ensuring it remains contextually consistent with the original response. 
    Keep the response concise and relevant to the user's instructions.
    `;
}

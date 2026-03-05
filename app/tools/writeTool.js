import fs from 'fs';

// JSON schema definition for the Write tool call (used for LLM tool calling)
const writeToolSchema =
{
    "type": "function",
    "function": {
        "name": "Write",
        "description": "Write content to a file",
        "parameters": {
            "type": "object",
            "required": ["file_path", "content"],
            "properties": {
                "file_path": {
                    "type": "string",
                    "description": "The path of the file to write to"
                },
                "content": {
                    "type": "string",
                    "description": "The content to write to the file"
                }
            }
        }
    }
}

/**
 * Executes the write tool and returns a tool response message.
 * @param {string} toolCallId - ID of the tool call issued by the model
 * @param {string} filePath - Path to file to write
 * @param {string} fileContent - Content of the file
 * @returns {{ role: string, tool_call_id: string, content: string }}
 */
function executeWriteTool(toolCallId, filePath, fileContent) {
    fs.writeFileSync(filePath, fileContent, 'utf8')

    return {
        "role": "tool",
        "tool_call_id": toolCallId,
        "content": "File created/written successfully"
    }
}

export {
    writeToolSchema,
    executeWriteTool
}
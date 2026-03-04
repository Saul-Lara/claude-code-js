import fs from 'fs';

// JSON schema definition for the Read tool call (used for LLM tool calling)
const readToolSchema =
{
    "type": "function",
    "function": {
        "name": "Read",
        "description": "Read and return the contents of a file",
        "parameters": {
            "type": "object",
            "properties": {
                "file_path": {
                    "type": "string",
                    "description": "The path to the file to read"
                }
            },
            "required": ["file_path"]
        }
    }
}

/**
 * Executes the read tool and returns a tool response message.
 * @param {string} toolCallId - ID of the tool call issued by the model
 * @param {string} filePath - Path to file requested
 * @returns {{ role: string, tool_call_id: string, content: string }}
 */
function executeReadTool(toolCallId, filePath) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found at: ${filePath}`);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');

    return {
        "role": "tool",
        "tool_call_id": toolCallId,
        "content": fileContent
    }
}

export {
    readToolSchema,
    executeReadTool
}
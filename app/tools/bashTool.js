import { promisify } from 'util';
import { exec } from 'child_process';

// JSON schema definition for the Bash tool call (used for LLM tool calling)
const bashToolSchema =
{
    "type": "function",
    "function": {
        "name": "Bash",
        "description": "Execute a shell command",
        "parameters": {
            "type": "object",
            "required": ["command"],
            "properties": {
                "command": {
                    "type": "string",
                    "description": "The command to execute"
                },
            }
        }
    }
}

/**
 * Executes the bash tool and returns a tool response message.
 * @param {string} toolCallId - ID of the tool call issued by the model
 * @param {string} commandRequest - The command to run
 * @returns {{ role: string, tool_call_id: string, content: string }}
 */
async function executeBashTool(toolCallId, commandRequest) {
    const promisifiedExec = promisify(exec);
    let { stdout, stderr } = await promisifiedExec(commandRequest);
    let commandOutput = stdout || stderr || "Command executed";

    return {
        "role": "tool",
        "tool_call_id": toolCallId,
        "content": commandOutput
    }
}

export {
    bashToolSchema,
    executeBashTool
}
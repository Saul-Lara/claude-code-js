import dotenv from "dotenv";
import OpenAI from "openai";
import fs from 'fs';

dotenv.config({ quiet: true });

async function main() {
  const [, , flag, prompt] = process.argv;
  const apiKey = process.env.OPENROUTER_API_KEY;
  const baseURL =
    process.env.OPENROUTER_BASE_URL?.trim() || "https://openrouter.ai/api/v1";

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  if (flag !== "-p" || !prompt) {
    throw new Error("error: -p flag is required");
  }

  const client = new OpenAI({
    apiKey: apiKey,
    baseURL: baseURL,
  });

  const response = await client.chat.completions.create({
    model: process.env.MODEL_NAME?.trim() || "anthropic/claude-haiku-4.5",
    messages: [{ role: "user", content: prompt }],
    tools: [
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
    ]
  });

  if (!response.choices || response.choices.length === 0) {
    throw new Error("no choices in response");
  }

  // You can use print statements as follows for debugging, they'll be visible when running tests.
  console.error("Logs from your program will appear here!");

  // Check if the message contains tool_calls
  let toolCalls = response.choices?.[0]?.message?.tool_calls;

  if (Array.isArray(toolCalls) && toolCalls.length > 0) {
    let [{ function: functionToolCall }] = toolCalls;

    let functionName = functionToolCall?.name;
    let functionArgs = JSON.parse(functionToolCall?.arguments);

    if (functionName == "Read") {
      let filePath = functionArgs.file_path;

      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found at: ${filePath}`);
      }

      let fileContent = fs.readFileSync(filePath, 'utf8');
      console.log(fileContent);
    }

  } else {
    console.log(response.choices[0].message.content);
  }
}

main();

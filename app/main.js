import dotenv from "dotenv";
import OpenAI from "openai";
import { readToolSchema, executeReadTool } from './tools/readTool.js';
import { writeToolSchema, executeWriteTool } from './tools/writeTool.js';

dotenv.config({ quiet: true });

async function main() {
  try {
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

    // Setting up the AI Model
    const aiModel = process.env.MODEL_NAME?.trim() || "anthropic/claude-haiku-4.5";
    let messages = [{ role: "user", content: prompt }];
    let tools = [readToolSchema, writeToolSchema];

    // You can use print statements as follows for debugging, they'll be visible when running tests.
    console.error("Logs from your program will appear here!");

    while (true) {
      let response = await client.chat.completions.create({
        model: aiModel,
        messages: messages,
        tools: tools
      });

      if (!response.choices || response.choices.length === 0) {
        throw new Error("no choices in response");
      }

      let responseMessage = response.choices?.[0]?.message;
      let toolCalls = responseMessage?.tool_calls;
      let finishReason = response.choices?.[0]?.finish_reason;

      messages.push(responseMessage);

      if (Array.isArray(toolCalls) && toolCalls.length > 0) {
        let [{ id: toolCallId, function: functionToolCall }] = toolCalls;

        let functionName = functionToolCall?.name;
        let functionArgs = JSON.parse(functionToolCall?.arguments);
        let toolCallResult;

        if (functionName == "Read") {
          toolCallResult = executeReadTool(toolCallId, functionArgs.file_path);
        } else if (functionName == "Write") {
          toolCallResult = executeWriteTool(toolCallId, functionArgs.file_path, functionArgs.content);
        }

        messages.push(toolCallResult);
      } else {
        console.log(response.choices[0].message.content);
      }

      if (finishReason === "stop") {
        break;
      }
    }
  } catch (error) {
    console.error('[Cloude Code JS] \u{274C}', error.message);
    process.exit(1);
  }
}

main();

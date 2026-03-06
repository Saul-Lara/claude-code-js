[![progress-banner](https://backend.codecrafters.io/progress/claude-code/93fef503-5a2a-45a8-8d5d-a497092420f1)](https://app.codecrafters.io/users/codecrafters-bot?r=2qF)

# 🤖 Claude Code (JS)

![GitHub repo size](https://img.shields.io/github/repo-size/Saul-Lara/claude-code-js?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/Saul-Lara/claude-code-js?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/Saul-Lara/claude-code-js?color=green&style=for-the-badge)

This repository is a JavaScript implementation for the ["Build Your Own Claude Code"](https://codecrafters.io/challenges/claude-code) challenge.

Claude Code is an AI coding assistant that uses Large Language Models (LLMs) to understand code and perform actions through tool calls.

This project implements the core architecture of an LLM-powered coding agent, exploring HTTP RESTful APIs, OpenAI-compatible tool calling, agent loop, and how to integrate multiple tools into an AI assistant.

> [!NOTE]
> 🧪 Try the challenge yourself on [codecrafters.io](https://codecrafters.io)!

## :pushpin: Features

:white_check_mark: LLM API integration (OpenAI-compatible)  
:white_check_mark: Agent loop for multi-step reasoning   
:white_check_mark: Tool calling with structured JSON schemas   
:white_check_mark: Read file tool for accessing local project files  
:white_check_mark: Write file tool for creating and updating files   
:white_check_mark: Bash tool for executing shell commands   
:white_check_mark: Environment-based model configuration (`.env`) 
:white_check_mark: Modular tool system for adding new capabilities   
:white_check_mark: Error handling for missing files and tool failures   
:white_check_mark: Lightweight implementation focused on learning AI agent architecture   

## :rocket: Built With

- **Programming Language**: JavaScript
- **Runtime**: Node.js
- **LLM API**: OpenAI-compatible API (via OpenRouter or similar)

## :hammer: Manual Build & Run

From the root repository:

### 1. Create the environment file

Create a .env file and configure the required variables:
```bash
OPENROUTER_BASE_URL=<your_openrouter_base_url>
OPENROUTER_API_KEY=<your_openrouter_api_key>
MODEL_NAME=<model_name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
node ./app/main.js [-p <prompt>]
```

Options:

- `-p <prompt>`: Instruction or question for the AI assistant

Example:
```bash
node ./app/main.js -p "Explain the structure of this project"
```

## :memo: Technical Details
This project implements the core architecture of a simple LLM-powered coding assistant. The application communicates with a Large Language Model through an OpenAI-compatible API and allows the model to interact with the local environment through tool calls.

The system follows a basic agent loop pattern:
1. The user provides a prompt through the CLI.
2. The prompt is sent to the LLM API along with the available tool definitions.
3. The model analyzes the request and may respond with a tool call.
4. If a tool call is detected, the corresponding tool is executed locally.
5. The tool result is returned to the model as a tool message.
6. The loop continues until the model returns a final response.

The agent currently supports the following tools:
| Tool           | Description                                                 |
| -------------- | ----------------------------------------------------------- |
| **Read Tool**  | Reads the contents of a file from the local filesystem.     |
| **Write Tool** | Creates or updates files in the project workspace.          |
| **Bash Tool**  | Executes shell commands using Node.js `child_process.exec`. |

The project is intentionally designed with a modular architecture, making it easy to add new tools and expand the agent’s capabilities.

## :notebook: Blog Explanation

Check out my post series for a detailed explanation of how this project was developed:
[Claude Code From Scratch: Building an AI Agent Step by Step](https://saul-lara.hashnode.dev/series/claude-code-from-scratch)

## :thought_balloon: Conclusion

This project demonstrates the fundamental concepts behind modern AI coding assistants. By implementing a simplified version from scratch, it becomes easier to understand how LLMs interact with external systems through tool calls and iterative reasoning.
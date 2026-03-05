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

# Passing the first stage

The entry point for your `claude-code` implementation is in `app/main.js`. Study
and uncomment the relevant code, and submit to pass the first stage:

```sh
codecrafters submit
```

# Stage 2 & beyond

Note: This section is for stages 2 and beyond.

1. Ensure you have `node (25)` installed locally.
2. Run `./your_program.sh` to run your program, which is implemented in
   `app/main.js`.
3. Run `codecrafters submit` to submit your solution to CodeCrafters. Test
   output will be streamed to your terminal.

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# VS Code MCP Server for GitHub Copilot

This repository contains a Model Context Protocol (MCP) server implementation that is compatible with Agent mode in VS Code. This allows the GitHub Copilot Agent to call the tools offered through this MCP server.

## Current Tools

- **CurrentDateAndTime**: Returns the current date and time, along with timezone information.
- **SystemInfo**: Returns basic system information about the server environment.

## Adding New Tools

This MCP server can be extended with additional tools by adding new tool registrations in the index.ts file using the server.tool() method.

## Development Notes

- Use ES modules (import/export) syntax.
- Update the server.tool() function to register new tools.
- Follow the existing code style and patterns.

You can find more info and examples at https://modelcontextprotocol.io/llms-full.txt
You can also find MCP server information at https://github.com/modelcontextprotocol/create-python-server

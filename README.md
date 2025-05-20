# VS Code MCP Server

A simple Model Context Protocol (MCP) server implementation that is compatible with Agent mode in VS Code. This MCP server allows the GitHub Copilot Agent to access tools that provide additional information and capabilities.

## Features

- **CurrentDateAndTime Tool**: Returns the current date and time along with timezone information, including day of year and week number.
- **SystemInfo Tool**: Returns basic system information like platform, architecture, Node.js version, and uptime.

## Prerequisites

- Node.js 16+
- npm or yarn

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Usage

### Running the Server

```bash
npm start
```

### Configuring VS Code

To use this MCP server with VS Code Agent mode, you need to add a configuration file in VS Code:

1. Create or edit the `mcp.json` file in the `.vscode` folder of your user or workspace directory:

```json
{
  "servers": {
    "vscode-date-time": {
      "type": "stdio",
      "command": "node",
      "args": [
        "/path/to/this/repo/build/index.js"
      ]
    }
  }
}
```

2. Replace `/path/to/this/repo` with the actual path to this repository.

## Extending with Additional Tools

The server is designed to be extensible. You can add more tools by:

1. Creating a companion package that exports tool definitions
2. Using the server's extension mechanism to register those tools

## Development

### Building

```bash
npm run build
```

### Development Build with Auto-Run

```bash
npm run dev
```

## License

ISC

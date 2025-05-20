import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create server instance
const server = new McpServer({
  name: "vscode-date-time",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Register our CurrentDateAndTime tool
server.tool(
  "CurrentDateAndTime",
  "Get the current date and time, including timezone information",
  {},
  async () => {
    const now = new Date();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTime = now.toLocaleString();
    const utcTime = now.toUTCString();
    const isoTime = now.toISOString();
    
    const result = `
Current Date and Time:
Local Time (${timeZone}): ${localTime}
UTC Time: ${utcTime}
ISO Format: ${isoTime}
Timestamp (ms): ${now.getTime()}
Day of Week: ${now.toLocaleDateString(undefined, { weekday: 'long' })}
Day of Year: ${getDayOfYear(now)}
Week of Year: ${getWeekNumber(now)}
`;

    return {
      content: [
        {
          type: "text",
          text: result,
        },
      ],
    };
  },
);

// Helper function to get day of year
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Helper function to get week number
function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// Also add a SystemInfo tool
server.tool(
  "SystemInfo",
  "Get basic information about the system where the MCP server is running",
  {},
  async () => {
    const result = `
System Information:
Platform: ${process.platform}
Architecture: ${process.arch}
Node.js Version: ${process.version}
Server Uptime: ${Math.floor(process.uptime())} seconds
OS Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
`;

    return {
      content: [
        {
          type: "text",
          text: result,
        },
      ],
    };
  }
);

// Main function to start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("VS Code MCP Server running on stdio");
  console.error("Available tools:");
  console.error("- CurrentDateAndTime");
  console.error("- SystemInfo");
}

// Start the server
main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

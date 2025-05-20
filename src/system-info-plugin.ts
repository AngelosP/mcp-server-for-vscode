import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BaseMcpServerPlugin } from "./plugin.js";
import { z } from "zod";

/**
 * Sample companion plugin that adds a SystemInfo tool.
 */
export class SystemInfoPlugin extends BaseMcpServerPlugin {
  constructor() {
    super("system-info", "1.0.0");
  }
  
  register(server: McpServer): void {
    server.tool(
      "SystemInfo",
      "Get basic information about the system where the MCP server is running",
      {},
      async () => {
        const info = {
          platform: process.platform,
          arch: process.arch,
          nodeVersion: process.version,
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          cpus: this.getCpuInfo(),
          env: {
            NODE_ENV: process.env.NODE_ENV || 'not set',
          }
        };
        
        const result = `
System Information:
Platform: ${info.platform}
Architecture: ${info.arch}
Node.js Version: ${info.nodeVersion}
Server Uptime: ${Math.floor(info.uptime)} seconds
Memory Usage:
  - RSS: ${this.formatBytes(info.memory.rss)}
  - Heap Total: ${this.formatBytes(info.memory.heapTotal)}
  - Heap Used: ${this.formatBytes(info.memory.heapUsed)}
  - External: ${this.formatBytes(info.memory.external)}
CPU Information:
${this.formatCpuInfo(info.cpus)}
Environment:
  - NODE_ENV: ${info.env.NODE_ENV}
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
  }
  
  private getCpuInfo() {
    try {
      const os = require('os');
      return os.cpus();
    } catch (error) {
      return null;
    }
  }
  
  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  private formatCpuInfo(cpus: any[] | null): string {
    if (!cpus) return '  Not available';
    return cpus.map((cpu, index) => 
      `  CPU ${index + 1}: ${cpu.model} (${cpu.speed} MHz)`
    ).join('\n');
  }
}

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Interface for MCP server plugins that provide additional tools.
 */
export interface McpServerPlugin {
  /**
   * The name of the plugin. Should be unique.
   */
  name: string;
  
  /**
   * The version of the plugin.
   */
  version: string;
  
  /**
   * A method that registers the plugin's tools with the MCP server.
   * @param server The MCP server instance.
   */
  register(server: McpServer): void;
}

/**
 * Abstract base class for MCP server plugins.
 */
export abstract class BaseMcpServerPlugin implements McpServerPlugin {
  /**
   * Creates a new base MCP server plugin.
   * @param name The name of the plugin.
   * @param version The version of the plugin.
   */
  constructor(public readonly name: string, public readonly version: string) {}
  
  /**
   * Registers the plugin's tools with the MCP server.
   * Implementation should be provided by subclasses.
   * @param server The MCP server instance.
   */
  abstract register(server: McpServer): void;
}

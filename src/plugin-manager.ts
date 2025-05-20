import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpServerPlugin } from "./plugin.js";

/**
 * Manager for MCP server plugins that provide additional tools.
 */
export class PluginManager {
  private plugins: Map<string, McpServerPlugin> = new Map();
  
  /**
   * Creates a new plugin manager.
   * @param server The MCP server instance.
   */
  constructor(private server: McpServer) {}
  
  /**
   * Registers a plugin with the MCP server.
   * @param plugin The plugin to register.
   * @returns True if the plugin was registered successfully, false otherwise.
   */
  registerPlugin(plugin: McpServerPlugin): boolean {
    if (this.plugins.has(plugin.name)) {
      console.error(`Plugin ${plugin.name} is already registered.`);
      return false;
    }
    
    try {
      plugin.register(this.server);
      this.plugins.set(plugin.name, plugin);
      console.error(`Plugin ${plugin.name} v${plugin.version} registered successfully.`);
      return true;
    } catch (error) {
      console.error(`Failed to register plugin ${plugin.name}:`, error);
      return false;
    }
  }
  
  /**
   * Gets all registered plugins.
   * @returns An array of all registered plugins.
   */
  getPlugins(): McpServerPlugin[] {
    return Array.from(this.plugins.values());
  }
  
  /**
   * Gets a plugin by name.
   * @param name The name of the plugin.
   * @returns The plugin with the given name, or undefined if not found.
   */
  getPlugin(name: string): McpServerPlugin | undefined {
    return this.plugins.get(name);
  }
  
  /**
   * Unregisters a plugin by name.
   * @param name The name of the plugin to unregister.
   * @returns True if the plugin was unregistered successfully, false otherwise.
   */
  unregisterPlugin(name: string): boolean {
    if (!this.plugins.has(name)) {
      console.error(`Plugin ${name} is not registered.`);
      return false;
    }
    
    this.plugins.delete(name);
    console.error(`Plugin ${name} unregistered successfully.`);
    return true;
  }
}

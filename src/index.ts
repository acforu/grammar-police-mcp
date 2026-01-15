#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "grammar-police",
  version: "1.0.0",
});

const TOOL_DESCRIPTION = `Check and correct English grammar in the provided text. Returns corrections in a structured format.

When you receive the text, analyze it for grammar errors and respond with:
- "original" -> "corrected" for each error found
- Corrected: "full corrected sentence"
- If no errors: "No grammar issues."

IGNORE: Capitalization, punctuation, technical terms/variable names, error/warning logs.`;

server.tool(
  "check_grammar",
  TOOL_DESCRIPTION,
  {
    text: z.string().describe("The text to check for grammar errors"),
  },
  async ({ text }) => ({
    content: [{ type: "text", text }],
  })
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Grammar Police MCP server running on stdio");
}

main().catch(console.error);

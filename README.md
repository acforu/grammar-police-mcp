# Grammar Police MCP Server

An MCP (Model Context Protocol) server that provides grammar checking capabilities to MCP-compatible clients like Claude Code.

## How It Works

This server exposes a `check_grammar` tool that accepts text input. The tool returns the text to the client along with instructions (in the tool description) for how to analyze and correct grammar errors.

The actual grammar checking is performed by the LLM client (e.g., Claude Code), not the server itself. This design keeps the server lightweight while leveraging the LLM's language understanding capabilities.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)
- [Claude Code](https://claude.ai/download) CLI tool

## Installation

### Option 1: Clone from GitHub

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/grammar-police-mcp.git
cd grammar-police-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

### Option 2: Download Release

1. Download the latest release from the [Releases](https://github.com/YOUR_USERNAME/grammar-police-mcp/releases) page
2. Extract the archive
3. Run `npm install && npm run build`

## Configuration

### Claude Code Setup

1. Open your Claude Code MCP settings file:
   - **Windows:** `%USERPROFILE%\.claude\claude_desktop_config.json`
   - **macOS/Linux:** `~/.claude/claude_desktop_config.json`

2. Add the grammar-police server to the `mcpServers` section:

```json
{
  "mcpServers": {
    "grammar-police": {
      "command": "node",
      "args": ["C:/path/to/grammar-police-mcp/dist/index.js"]
    }
  }
}
```

> **Note:** Replace `C:/path/to/grammar-police-mcp` with the actual path where you cloned/extracted the project.

3. Restart Claude Code to load the new MCP server

### Verify Installation

After restarting Claude Code, run `/mcp` to check if the grammar-police server is connected.

## Usage

Once configured, Claude Code will automatically have access to the `check_grammar` tool. You can instruct Claude to check grammar by configuring your `CLAUDE.md` file to call the tool on user input.

### Example CLAUDE.md Configuration

```markdown
You have access to a tool named `grammar-police`. Call the `check_grammar` tool with user input to check for grammar errors before responding.
```

### Running Standalone (Development)

```bash
npm start
```

## Tool: check_grammar

**Input:**
- `text` (string): The text to check for grammar errors

**Output:**
- The input text, returned to the client for grammar analysis

**Expected Client Response Format:**
```
"original" -> "corrected"
Corrected: "full corrected sentence"
```

Or if no errors: `No grammar issues.`

**Ignored:** Capitalization, punctuation, technical terms/variable names, error/warning logs.

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled server
- `npm run dev` - Watch mode for development

## Dependencies

- `@modelcontextprotocol/sdk` - MCP server SDK
- `zod` - Schema validation

## License

MIT

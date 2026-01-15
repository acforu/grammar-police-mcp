# Grammar Police MCP Server 👮‍♂️✍️

An MCP (Model Context Protocol) server that provides automated grammar checking capabilities to MCP-compatible clients like Claude Desktop and Claude Code.

## 📖 How It Works

This server exposes a `check_grammar` tool. The workflow is designed as a "middleware" style interception:
1.  You configure Claude to send your raw input to this tool **first**.
2.  The tool returns your text along with correction instructions.
3.  Claude (the LLM) performs the actual correction based on the tool's output before answering your technical question.

This design keeps the server lightweight while leveraging the LLM's full language understanding capabilities.

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (usually comes with Node.js)
- **One of the following clients:**
    - [Claude Desktop App](https://claude.ai/download) (GUI)
    - [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) (CLI)

## 📦 Installation

### Option 1: Install from npm (Recommended)

No manual download required. You can run it directly via `npx`.

```bash
npm install -g grammar-police-mcp

```

### Option 2: Clone from GitHub (For Development)

```bash
# Clone the repository
git clone [https://github.com/acforu/grammar-police-mcp.git](https://github.com/acforu/grammar-police-mcp.git)
cd grammar-police-mcp

# Install dependencies
npm install

# Build the project
npm run build

```

## ⚙️ Configuration

> **⚠️ Important:** Claude Desktop (GUI) and Claude Code (CLI) use **different config files**. Please follow the section matching your tool.

### 🖥️ For Claude Desktop (GUI)

**Config File Location:**

* **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
* **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

Add `grammar-police` to the `mcpServers` object.

#### If using npm (Option 1):

**macOS:**

```json
{
  "mcpServers": {
    "grammar-police": {
      "command": "npx",
      "args": ["-y", "grammar-police-mcp"]
    }
  }
}

```

**Windows:**

```json
{
  "mcpServers": {
    "grammar-police": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "grammar-police-mcp"]
    }
  }
}

```

*(Note: On Windows, `cmd /c` is required to invoke `npx` correctly.)*

#### If using Source Code (Option 2):

**macOS:**

```json
{
  "mcpServers": {
    "grammar-police": {
      "command": "node",
      "args": ["/absolute/path/to/grammar-police-mcp/build/index.js"]
    }
  }
}

```

**Windows:**

```json
{
  "mcpServers": {
    "grammar-police": {
      "command": "node",
      "args": ["C:\\absolute\\path\\to\\grammar-police-mcp\\build\\index.js"]
    }
  }
}

```

*(Note: Replace paths with your actual project location. Ensure your build output folder is `build`.)*

---

### ⌨️ For Claude Code (CLI)

**Config File Location:**

* **Windows:** `%USERPROFILE%\.claude.json`
* **macOS/Linux:** `~/.claude.json`
* *Or configure per-project in your project's `.claude.json*`

Add the server configuration using the same JSON format as the Desktop version above.

## 🚀 Usage

Since this tool is passive (it doesn't fix things unless you ask it to), you must instruct Claude to use it on every message.

### Method A: Claude Desktop (Project Instructions)

1. Open your Project in Claude.
2. Click **Project Settings** (or Edit).
3. Add the following to **Project Instructions** (System Prompt):

> **GLOBAL INSTRUCTION:**
> You have access to a tool named `grammar-police`. For every user message, you MUST first run the `check_grammar` tool on the raw input to check for errors. Display the corrections if any, then proceed to answer the user's request.

### Method B: Claude Code (CLAUDE.md)

Create or edit the `CLAUDE.md` file in your project root:

```markdown
## Tool Usage
You have access to a tool named `grammar-police`. Call the `check_grammar` tool with the user's raw input to check for English grammar errors before generating your response.

```

### Verify It Works

Restart Claude. Type a message with intentional errors:

> "i write code good."

Claude should call the tool and respond with a correction before answering.

## 🛠️ Development

* `npm run build`: Compile TypeScript to JavaScript (outputs to `/build`)
* `npm start`: Run the compiled server
* `npm run dev`: Watch mode for development

## 📄 License

MIT

```

```

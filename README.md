# 🐯 Tiger MCP Agent & CLI

[![MLH Challenge 3](https://img.shields.io/badge/MLH%20Builders%20Week-Challenge%203%20Supercharged-f97316.svg)](https://www.mlh.com/events/global-hack-week-builders-week/challenges/01a1b27d-f7f3-ef52-42cf-654f7d6ec201)
[![MCP Protocol](https://img.shields.io/badge/MCP-JSON--RPC%202.0-06b6d4.svg)](https://modelcontextprotocol.io)
[![Tiger Data](https://img.shields.io/badge/Tiger%20Data-TimescaleDB%20Engine-10b981.svg)](https://www.tigerdata.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Supercharging AI Agents with Tiger CLI & Model Context Protocol (MCP)**  
> Developed for **Major League Hacking (MLH) Global Hack Week: Builders Week** — *Challenge 3: Supercharge AI Agents with Tiger CLI or MCP Server*.

---

## 🌟 Overview

Connecting your database via **Model Context Protocol (MCP)** or **Tiger CLI** enables AI agents, LLMs, and development tools to query, manage, and retrieve live context directly from your database.

This project implements:
1. **Model Context Protocol (MCP) Server**: Direct integration using the official `@modelcontextprotocol/sdk` exposing 6 dedicated database tools.
2. **Autonomous AI Reasoning Agent**: Dynamically inspects database state, queries time-series rollups, verifies chunk pruning with `EXPLAIN`, and preserves context across sessions.
3. **Companion Tiger CLI (`tiger`)**: Command-line tool for developers and scripts to inspect hypertables, query data, and monitor cluster performance.
4. **Interactive Dev Interface**: Real-time agent chat with collapsible MCP JSON-RPC inspection, an interactive CLI terminal emulator, and an MCP sandbox.

---

## 🛠️ MCP Server Tools

The server implements the official **Model Context Protocol** specification (JSON-RPC 2.0) with stdio and HTTP bridges:

| MCP Tool Name | Description | Key Arguments |
|---|---|---|
| `tiger_list_hypertables` | Lists all active hypertables, time columns, chunk intervals, and compression ratios. | None |
| `tiger_inspect_chunks` | Inspects auto-partitioned chunks, time boundaries, row counts, and storage status. | `tableName` (string) |
| `tiger_time_bucket` | Computes high-performance downsampled rollups using `time_bucket()`. | `interval` (string, e.g. "1 hour") |
| `tiger_explain_query` | Executes `EXPLAIN (ANALYZE, BUFFERS)` to verify chunk skipping & partition pruning speedups. | `query` (string) |
| `tiger_query_sql` | Executes safe, read-only SQL queries against the Tiger Data instance. | `sql` (string) |
| `tiger_get_system_health` | Retrieves engine version, cache hit ratio, ingest rate, and cluster telemetry. | None |

---

## 💻 Companion Tiger CLI (`tiger`)

The CLI offers terminal commands for developers:

```bash
# Check instance health and active status
tiger status

# List active hypertables and chunk intervals
tiger hypertables

# Inspect dynamic chunks and compression state
tiger chunks sensor_telemetry

# Verify chunk pruning and execution speedup
tiger explain "SELECT COUNT(*) FROM sensor_telemetry WHERE time > NOW() - INTERVAL '6 hours'"

# Run SQL query against the instance
tiger query "SELECT * FROM sensor_telemetry LIMIT 5"

# Launch the Model Context Protocol stdio server
tiger mcp
```

---

## 🚀 Quick Start

### 1. Installation
```bash
git clone https://github.com/YTxFSGAMERz/tiger-mcp-agent.git
cd tiger-mcp-agent
npm install
```

### 2. Run the Full-Stack Application
```bash
npm run dev
```
- **Vite Web Application**: `http://localhost:5178`
- **Express Backend & MCP Bridge**: `http://localhost:3005`

### 3. Run the CLI
```bash
npm run cli status
npm run cli hypertables
```

### 4. Run the Stdio MCP Server for External Agents (Claude Desktop, Antigravity, etc.)
```bash
node mcp/tiger-mcp-server.js
```

---

## 🧩 Claude Desktop & External Agent MCP Configuration

To connect this Tiger MCP server to Claude Desktop or another MCP-compatible agent, add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "tiger-data": {
      "command": "node",
      "args": ["<PATH_TO_PROJECT>/mcp/tiger-mcp-server.js"]
    }
  }
}
```

---

## 🏗️ Project Architecture

```
tiger-mcp-agent/
├── cli/
│   └── tiger.js                  # Companion CLI implementation
├── mcp/
│   └── tiger-mcp-server.js       # Official MCP server using @modelcontextprotocol/sdk
├── src/
│   ├── components/
│   │   ├── AgentChatWithMcp.jsx  # AI Agent chat with collapsible MCP inspector
│   │   ├── CliTerminal.jsx       # Interactive in-browser Tiger CLI emulator
│   │   ├── McpStatusPanel.jsx    # MCP registry and JSON-RPC direct test sandbox
│   │   ├── MLHGuide.jsx          # MLH submission helper and checklist
│   │   └── Navbar.jsx            # Brand header and status indicators
│   ├── App.jsx                   # Main layout and tab controller
│   ├── index.css                 # Cyber-data dark styling
│   └── main.jsx                  # React application entry point
├── server.js                     # Express API & MCP JSON-RPC bridge (Port 3005)
├── start-dev.js                  # Dual-service concurrent runner
├── vite.config.js                # Vite port 5178 & /api proxy
└── package.json                  # Dependencies & scripts
```

---

## 🏆 MLH Submission Checklist

- [x] Integrate Tiger CLI or deploy an MCP server connection directly to Tiger Data.
- [x] Support querying, managing, and retrieving live context from the database.
- [x] Enable AI agents to inspect state and reason over live time-series data.
- [x] Verify chunk skipping and query plan optimization via `EXPLAIN ANALYZE`.
- [x] Public GitHub repository with comprehensive documentation and runnable code.

---

## 📄 License
MIT License &copy; 2026 Farhan Ahmad (YTxFSGAMERz)

import React, { useState } from 'react';
import { ExternalLink, Copy, Check, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function MLHGuide() {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);

  const projectUrl = 'https://github.com/YTxFSGAMERz/tiger-mcp-agent';

  const descriptionMarkdown = `### Tiger MCP Agent — Supercharging AI Agents with Tiger CLI & Model Context Protocol (MCP)

**Challenge**: Challenge 3: Supercharge AI Agents with Tiger CLI or MCP Server (MLH Global Hack Week: Builders Week)

#### Overview
Tiger MCP Agent connects Tiger Data directly to intelligent AI agents using the official **Model Context Protocol (MCP)** standard (\`@modelcontextprotocol/sdk\`) and provides a companion **Tiger CLI** (\`tiger\`) for terminal workflows. AI assistants can inspect live hypertables, time-partitioned chunks, execute downsampled rollups via \`time_bucket()\`, and verify partition pruning and chunk skipping speedup with \`EXPLAIN ANALYZE\` in real time.

#### Key Features & Architecture
1. **Model Context Protocol (MCP) Server**:
   - Implements official JSON-RPC 2.0 protocol over stdio and HTTP bridges.
   - 6 Production-Grade MCP Tools:
     - \`tiger_list_hypertables\`: Dimension, interval, and compression metrics.
     - \`tiger_inspect_chunks\`: Auto-partitioned chunk status and time boundaries.
     - \`tiger_time_bucket\`: Downsampled time-series aggregation.
     - \`tiger_explain_query\`: Chunk skipping execution plans with speedup metrics.
     - \`tiger_query_sql\`: Read-only guarded database queries.
     - \`tiger_get_system_health\`: Cache hit ratio and ingest velocity telemetry.

2. **Autonomous AI Reasoning Assistant**:
   - Parses natural-language database queries and maps them to appropriate MCP tools.
   - Inspects live database state and returns synthesized insights with complete MCP audit logs.

3. **Companion Tiger CLI (\`tiger\`)**:
   - Fast terminal commands: \`tiger status\`, \`tiger hypertables\`, \`tiger chunks\`, \`tiger explain\`, \`tiger query\`, and \`tiger mcp\`.

4. **Interactive Dev Interface**:
   - Full-stack dashboard with real-time AI Agent chat, interactive web terminal emulator, and direct JSON-RPC MCP sandbox.

#### Technologies Used
- Tiger Data Cloud / TimescaleDB
- Model Context Protocol (MCP) (\`@modelcontextprotocol/sdk\`)
- Node.js & Express 5
- React 19 & Vite 8
- PostgreSQL (\`pg\`)
- Tiger CLI (\`child_process\`, \`bin/tiger\`)
`;

  const copyUrl = () => {
    navigator.clipboard.writeText(projectUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const copyDesc = () => {
    navigator.clipboard.writeText(descriptionMarkdown);
    setCopiedDesc(true);
    setTimeout(() => setCopiedDesc(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
        border: '1px solid rgba(249, 115, 22, 0.3)',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <ShieldCheck size={22} color="var(--accent-orange)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
              MLH Challenge 3 Submission Portal Assistant
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Submit this project to <strong>Global Hack Week: Builders Week</strong> to claim your challenge points!
          </p>
        </div>

        <a
          href="https://www.mlh.com/events/global-hack-week-builders-week/challenges/01a1b27d-f7f3-ef52-42cf-654f7d6ec201/submissions/new"
          target="_blank"
          rel="noreferrer"
          style={{
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            color: '#fff',
            textDecoration: 'none',
            padding: '0.75rem 1.25rem',
            borderRadius: '8px',
            fontSize: '0.88rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)'
          }}
        >
          <span>Open MLH Submission Page</span>
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Field 1: Project URL */}
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
            1. Project URL * (GitHub Repository)
          </label>
          <button
            onClick={copyUrl}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--accent-orange)',
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: 600
            }}
          >
            {copiedUrl ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
            <span>{copiedUrl ? 'Copied!' : 'Copy URL'}</span>
          </button>
        </div>
        <input
          type="text"
          readOnly
          value={projectUrl}
          style={{
            background: 'var(--terminal-bg)',
            border: '1px solid var(--border-color)',
            color: 'var(--accent-cyan)',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem'
          }}
        />
      </div>

      {/* Field 2: Description */}
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
            2. Project Description (Markdown Formatted)
          </label>
          <button
            onClick={copyDesc}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--accent-orange)',
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: 600
            }}
          >
            {copiedDesc ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
            <span>{copiedDesc ? 'Copied!' : 'Copy Description'}</span>
          </button>
        </div>
        <textarea
          readOnly
          rows={12}
          value={descriptionMarkdown}
          style={{
            background: 'var(--terminal-bg)',
            border: '1px solid var(--border-color)',
            color: '#d1d5db',
            padding: '0.85rem 1rem',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            lineHeight: 1.5,
            resize: 'vertical'
          }}
        />
      </div>

      {/* Field 3: Technologies Used */}
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
          3. Technologies Used (Select in MLH form)
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[
            'Tiger Data Cloud',
            'Model Context Protocol (MCP)',
            'TimescaleDB',
            'PostgreSQL',
            'Node.js',
            'Express.js',
            'React',
            'Vite',
            'Tiger CLI',
            'JSON-RPC 2.0',
            'JavaScript / TypeScript'
          ].map((tag, idx) => (
            <span
              key={idx}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--accent-cyan)',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              ✓ {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

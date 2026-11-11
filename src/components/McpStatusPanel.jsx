import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, Play, Code2, Server, ArrowUpRight } from 'lucide-react';

export default function McpStatusPanel() {
  const [tools, setTools] = useState([]);
  const [serverMeta, setServerMeta] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [toolArgs, setToolArgs] = useState('{}');
  const [rpcResponse, setRpcResponse] = useState(null);
  const [invoking, setInvoking] = useState(false);

  useEffect(() => {
    fetch('/api/mcp/tools')
      .then(r => r.json())
      .then(data => {
        setTools(data.tools || []);
        setServerMeta(data.server);
        if (data.tools && data.tools.length > 0) {
          setSelectedTool(data.tools[0]);
        }
      })
      .catch(err => console.error('Error fetching MCP tools:', err));
  }, []);

  const handleSelectTool = (t) => {
    setSelectedTool(t);
    if (t.name === 'tiger_inspect_chunks') {
      setToolArgs(JSON.stringify({ tableName: 'sensor_telemetry' }, null, 2));
    } else if (t.name === 'tiger_time_bucket') {
      setToolArgs(JSON.stringify({ interval: '1 hour' }, null, 2));
    } else if (t.name === 'tiger_explain_query') {
      setToolArgs(JSON.stringify({ query: "SELECT COUNT(*), AVG(temperature) FROM sensor_telemetry WHERE time > NOW() - INTERVAL '6 hours'" }, null, 2));
    } else if (t.name === 'tiger_query_sql') {
      setToolArgs(JSON.stringify({ sql: "SELECT * FROM sensor_telemetry LIMIT 5" }, null, 2));
    } else {
      setToolArgs('{}');
    }
    setRpcResponse(null);
  };

  const handleInvoke = async () => {
    if (!selectedTool) return;
    setInvoking(true);
    let parsedArgs = {};
    try {
      parsedArgs = JSON.parse(toolArgs);
    } catch (e) {
      alert('Invalid JSON in arguments field');
      setInvoking(false);
      return;
    }

    try {
      const res = await fetch('/api/mcp/invoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: Math.floor(Math.random() * 10000),
          tool: selectedTool.name,
          args: parsedArgs
        })
      });
      const data = await res.json();
      setRpcResponse(data);
    } catch (err) {
      setRpcResponse({ error: err.message });
    } finally {
      setInvoking(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* MCP Header Info */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'rgba(6, 182, 212, 0.15)',
            color: 'var(--accent-cyan)',
            padding: '0.75rem',
            borderRadius: '10px',
            border: '1px solid rgba(6, 182, 212, 0.3)'
          }}>
            <Server size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
              Model Context Protocol (MCP) Server Architecture
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Official Anthropic & Open Source MCP standard implementation (`@modelcontextprotocol/sdk`).
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Protocol</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-mono)' }}>
              {serverMeta?.protocolVersion || '2024-11-05'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Transports</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
              Stdio & JSON-RPC
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Registered Tools</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)' }}>
              {tools.length} Tools
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Tools List + Sandbox */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {/* Left: Tools List */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={16} color="var(--accent-orange)" />
            <span>Registered MCP Tools ({tools.length})</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {tools.map((t) => {
              const isSelected = selectedTool?.name === t.name;
              return (
                <div
                  key={t.name}
                  onClick={() => handleSelectTool(t)}
                  style={{
                    background: isSelected ? 'rgba(249, 115, 22, 0.12)' : 'var(--bg-card)',
                    border: isSelected ? '1px solid var(--accent-orange)' : '1px solid var(--border-color)',
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <code style={{ fontSize: '0.82rem', fontWeight: 700, color: isSelected ? 'var(--accent-orange)' : 'var(--accent-cyan)' }}>
                      {t.name}
                    </code>
                    {isSelected && <span style={{ fontSize: '0.7rem', color: 'var(--accent-orange)' }}>Active</span>}
                  </div>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {t.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive Sandbox */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Code2 size={16} color="var(--accent-cyan)" />
              <span>Direct JSON-RPC Sandbox</span>
            </h3>
            <button
              onClick={handleInvoke}
              disabled={invoking || !selectedTool}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--accent-orange)',
                border: 'none',
                color: '#fff',
                padding: '0.45rem 0.9rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: invoking ? 'not-allowed' : 'pointer'
              }}
            >
              <Play size={14} />
              <span>{invoking ? 'Invoking...' : 'Execute Tool'}</span>
            </button>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
              Target Tool Name:
            </label>
            <input
              type="text"
              readOnly
              value={selectedTool?.name || ''}
              style={{
                width: '100%',
                background: 'var(--terminal-bg)',
                border: '1px solid var(--border-color)',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                color: 'var(--accent-orange)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
              JSON Arguments (`tool.args`):
            </label>
            <textarea
              rows={4}
              value={toolArgs}
              onChange={(e) => setToolArgs(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--terminal-bg)',
                border: '1px solid var(--border-color)',
                padding: '0.6rem 0.75rem',
                borderRadius: '6px',
                color: '#a5f3fc',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
              Raw JSON-RPC Response:
            </label>
            <pre style={{
              flex: 1,
              background: 'var(--terminal-bg)',
              border: '1px solid var(--border-color)',
              padding: '0.75rem',
              borderRadius: '6px',
              color: '#86efac',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              overflowY: 'auto',
              maxHeight: '260px',
              minHeight: '140px'
            }}>
              {rpcResponse ? JSON.stringify(rpcResponse, null, 2) : '// Click "Execute Tool" to test MCP response'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Terminal as TerminalIcon, Play, Trash2, Copy, Check } from 'lucide-react';

export default function CliTerminal() {
  const [history, setHistory] = useState([
    {
      cmd: 'tiger status',
      output: [
        '🐯 TIGER DATA CLOUD INSTANCE STATUS',
        '-------------------------------------------',
        'Instance:    tiger-prod-cluster-01.cloud.tigerdata.com',
        'Engine:      Tiger Data Cloud (PostgreSQL 16.3 / Timescale 2.15)',
        'Status:      ✅ ONLINE',
        'Hypertables: 2 active',
        'Chunks:      5 auto-partitioned',
        'Ingest Rate: 1,250 events/sec',
        'MCP Server:  Ready (@modelcontextprotocol/sdk)\n'
      ].join('\n')
    }
  ]);
  const [inputCmd, setInputCmd] = useState('');
  const [copied, setCopied] = useState(false);

  const quickCommands = [
    'status',
    'hypertables',
    'chunks sensor_telemetry',
    'explain',
    'query "SELECT * FROM sensor_telemetry LIMIT 5"',
    'mcp',
    'help'
  ];

  const runCommand = async (commandToRun) => {
    const raw = commandToRun || inputCmd;
    if (!raw.trim()) return;

    // strip optional leading "tiger "
    const cleanCmd = raw.trim().replace(/^tiger\s+/, '');

    try {
      const res = await fetch('/api/cli/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cleanCmd })
      });
      const data = await res.json();
      setHistory(prev => [...prev, { cmd: `tiger ${cleanCmd}`, output: data.output }]);
    } catch (err) {
      setHistory(prev => [...prev, { cmd: `tiger ${cleanCmd}`, output: `Error: ${err.message}` }]);
    }
    setInputCmd('');
  };

  const handleCopyAll = () => {
    const fullText = history.map(h => `$ ${h.cmd}\n${h.output}`).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* CLI Header */}
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
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
            <TerminalIcon size={20} color="var(--accent-orange)" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
              Companion Tiger CLI (`tiger`)
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Direct command-line management for Tiger Data Cloud. Seamlessly query hypertables, inspect partitions, and run EXPLAIN plans from your terminal or AI dev tool.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleCopyAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.78rem'
            }}
          >
            {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy Terminal'}</span>
          </button>
          <button
            onClick={() => setHistory([])}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.78rem'
            }}
          >
            <Trash2 size={14} /> Clear
          </button>
        </div>
      </div>

      {/* Quick Launch Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.25rem' }}>Quick Run:</span>
        {quickCommands.map((q, idx) => (
          <button
            key={idx}
            onClick={() => runCommand(q)}
            style={{
              background: 'var(--terminal-bg)',
              border: '1px solid var(--border-color)',
              color: 'var(--accent-cyan)',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.76rem',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
          >
            tiger {q}
          </button>
        ))}
      </div>

      {/* Terminal Window */}
      <div style={{
        background: 'var(--terminal-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
      }}>
        {/* Terminal Title Bar */}
        <div style={{
          background: '#090d16',
          padding: '0.65rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
          </div>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            tiger-cli session — bash 5.2 — @modelcontextprotocol/sdk
          </span>
          <div style={{ width: '48px' }} />
        </div>

        {/* Terminal Body */}
        <div style={{
          padding: '1.25rem',
          minHeight: '380px',
          maxHeight: '520px',
          overflowY: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {history.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-orange)' }}>
                <span style={{ color: 'var(--accent-emerald)' }}>developer@tiger-cloud:~$</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{item.cmd}</span>
              </div>
              <pre style={{
                color: '#d1d5db',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.5,
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '0.75rem',
                borderRadius: '6px'
              }}>
                {item.output}
              </pre>
            </div>
          ))}

          {/* Active Command Prompt Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              runCommand();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
          >
            <span style={{ color: 'var(--accent-emerald)', whiteSpace: 'nowrap' }}>developer@tiger-cloud:~$</span>
            <span style={{ color: 'var(--accent-orange)' }}>tiger</span>
            <input
              type="text"
              value={inputCmd}
              onChange={(e) => setInputCmd(e.target.value)}
              placeholder="status | hypertables | chunks | explain | query"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                outline: 'none'
              }}
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  );
}

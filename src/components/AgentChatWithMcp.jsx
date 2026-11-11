import React, { useState } from 'react';
import { Send, Sparkles, Database, Terminal, ChevronDown, ChevronRight, Activity, Zap, Cpu, RefreshCw } from 'lucide-react';

const SUGGESTIONS = [
  { label: '🐯 List Hypertables', prompt: 'List all active hypertables in our Tiger Data cluster and their chunk intervals' },
  { label: '🧱 Inspect Chunks', prompt: 'Inspect the auto-partitioned chunks and compression status for sensor_telemetry' },
  { label: '⚡ Verify Chunk Skipping', prompt: 'Run EXPLAIN ANALYZE on a 6-hour query to verify chunk skipping and query plan' },
  { label: '📊 1-Hour Time Bucket', prompt: 'Downsample sensor metrics into 1-hour time buckets using tiger_time_bucket' },
  { label: '🩺 System Health', prompt: 'Check Tiger Data Cloud instance health, ingest rate, and cache hit ratio' }
];

export default function AgentChatWithMcp() {
  const [messages, setMessages] = useState([
    {
      role: 'agent',
      text: "👋 Hello! I am the **Tiger Data AI Assistant**, supercharged via the **Model Context Protocol (MCP)**. I have direct access to your Tiger Data instance using 6 registered MCP tools:\n\n" +
        "• `tiger_list_hypertables`: Hypertable catalog & compression ratio\n" +
        "• `tiger_inspect_chunks`: Dynamic time-partition chunk boundaries\n" +
        "• `tiger_time_bucket`: High-performance time-series downsampling\n" +
        "• `tiger_explain_query`: EXPLAIN ANALYZE execution plan & chunk pruning verification\n" +
        "• `tiger_query_sql`: Safe read-only SQL querying\n" +
        "• `tiger_get_system_health`: Buffer cache & ingest velocity telemetry\n\n" +
        "Ask me anything or select a prompt below to see the MCP tool calls in real time!",
      mcpCalls: [],
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedCalls, setExpandedCalls] = useState({});

  const toggleExpand = (index, callIdx) => {
    const key = `${index}-${callIdx}`;
    setExpandedCalls(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSend = async (textToSend) => {
    const promptText = textToSend || input;
    if (!promptText.trim() || loading) return;

    const userMsg = {
      role: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText })
      });
      const data = await res.json();

      const agentMsg = {
        role: 'agent',
        text: data.reply,
        mcpCalls: data.mcpCalls || [],
        executionTimeMs: data.executionTimeMs,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, agentMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'agent',
          text: `⚠️ **Connection Error**: Could not reach backend MCP bridge (${err.message}). Verify that server.js is running on port 3005.`,
          mcpCalls: [],
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Intro Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)',
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
            <span style={{ fontSize: '1.25rem' }}>🤖</span>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
              Intelligent Agent with Real-Time Tiger MCP Context
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            The AI Agent autonomously determines when to invoke Tiger MCP tools to inspect database state, retrieve live time-series rollups, and verify query performance.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setMessages([messages[0]])}
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
            <RefreshCw size={14} /> Clear Chat
          </button>
        </div>
      </div>

      {/* Suggested Prompts */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(item.prompt)}
            disabled={loading}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              padding: '0.45rem 0.85rem',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent-orange)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.25rem',
        minHeight: '420px',
        maxHeight: '620px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: msg.role === 'user' ? '80%' : '90%',
              gap: '0.35rem'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <span>{msg.role === 'user' ? '👤 You' : '🐯 Tiger AI Agent'}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
              {msg.executionTimeMs && (
                <span style={{ color: 'var(--accent-cyan)' }}>
                  ({msg.executionTimeMs}ms)
                </span>
              )}
            </div>

            <div style={{
              background: msg.role === 'user' ? 'var(--accent-orange)' : 'var(--bg-card)',
              color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
              padding: '0.9rem 1.15rem',
              borderRadius: msg.role === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
              border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)',
              fontSize: '0.88rem',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.6
            }}>
              {msg.text}
            </div>

            {/* MCP Call Inspector */}
            {msg.mcpCalls && msg.mcpCalls.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.4rem' }}>
                {msg.mcpCalls.map((call, cIdx) => {
                  const isExpanded = expandedCalls[`${idx}-${cIdx}`];
                  return (
                    <div
                      key={cIdx}
                      style={{
                        background: 'rgba(5, 8, 16, 0.9)',
                        border: '1px solid rgba(249, 115, 22, 0.3)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        fontSize: '0.78rem'
                      }}
                    >
                      <button
                        onClick={() => toggleExpand(idx, cIdx)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: 'rgba(249, 115, 22, 0.1)',
                          border: 'none',
                          padding: '0.5rem 0.85rem',
                          color: 'var(--accent-orange)',
                          fontWeight: 600
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Cpu size={14} />
                          <span>MCP Tool Call: <strong>{call.tool}</strong></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>JSON-RPC 2.0</span>
                          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <div>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Tool Arguments:</span>
                            <pre style={{
                              background: '#090d16',
                              padding: '0.4rem 0.6rem',
                              borderRadius: '6px',
                              marginTop: '0.2rem',
                              color: '#a5f3fc',
                              fontSize: '0.72rem',
                              overflowX: 'auto'
                            }}>
                              {JSON.stringify(call.args, null, 2)}
                            </pre>
                          </div>
                          <div>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>MCP Result Payload:</span>
                            <pre style={{
                              background: '#090d16',
                              padding: '0.4rem 0.6rem',
                              borderRadius: '6px',
                              marginTop: '0.2rem',
                              color: '#86efac',
                              fontSize: '0.72rem',
                              maxHeight: '180px',
                              overflowY: 'auto'
                            }}>
                              {call.result.content?.[0]?.text || JSON.stringify(call.result, null, 2)}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-orange)', fontSize: '0.85rem' }}>
            <Activity className="animate-spin" size={16} />
            <span>AI Agent is calling Tiger MCP tools & evaluating database state...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        style={{ display: 'flex', gap: '0.75rem' }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the AI agent anything about your hypertables, chunks, or metrics..."
          style={{
            flex: 1,
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '0.8rem 1rem',
            color: '#fff',
            fontSize: '0.9rem',
            outline: 'none',
            transition: 'border 0.2s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent-orange)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            background: 'var(--accent-orange)',
            border: 'none',
            color: '#fff',
            padding: '0.8rem 1.4rem',
            borderRadius: '10px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: loading || !input.trim() ? 0.6 : 1,
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer'
          }}
        >
          <Send size={16} />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
}

import React from 'react';
import { Database, Terminal, Cpu, CheckCircle2, Globe, Shield, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'agent', label: 'AI Agent & MCP', icon: Sparkles },
    { id: 'cli', label: 'Tiger CLI Terminal', icon: Terminal },
    { id: 'mcp', label: 'MCP Server Registry', icon: Cpu },
    { id: 'guide', label: 'MLH Submission Guide', icon: Shield },
  ];

  return (
    <header style={{
      background: 'rgba(17, 24, 39, 0.95)',
      borderBottom: '1px solid var(--border-color)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0.75rem 1.5rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Logo and Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            color: '#fff',
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4)'
          }}>
            🐯
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                Tiger MCP Agent
              </h1>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                background: 'rgba(249, 115, 22, 0.15)',
                color: 'var(--accent-orange)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                padding: '0.15rem 0.5rem',
                borderRadius: '999px',
                textTransform: 'uppercase'
              }}>
                MLH Challenge 3
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Model Context Protocol Server & CLI for Tiger Data Cloud
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <nav style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-secondary)', padding: '0.25rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '7px',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  transition: 'all 0.15s ease',
                  background: isActive ? 'var(--accent-orange)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-secondary)'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Cluster / MCP Live Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            padding: '0.35rem 0.75rem',
            borderRadius: '999px',
            fontSize: '0.75rem',
            color: 'var(--accent-emerald)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--accent-emerald)',
              boxShadow: '0 0 8px var(--accent-emerald)'
            }} />
            <span>MCP Server: <strong>Connected</strong></span>
          </div>

          <div style={{
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)'
          }}>
            Vite :5178 | API :3005
          </div>
        </div>
      </div>
    </header>
  );
}

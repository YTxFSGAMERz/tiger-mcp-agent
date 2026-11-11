import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AgentChatWithMcp from './components/AgentChatWithMcp';
import CliTerminal from './components/CliTerminal';
import McpStatusPanel from './components/McpStatusPanel';
import MLHGuide from './components/MLHGuide';

export default function App() {
  const [activeTab, setActiveTab] = useState('agent');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{ flex: 1, padding: '2rem 1.5rem', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
        {activeTab === 'agent' && <AgentChatWithMcp />}
        {activeTab === 'cli' && <CliTerminal />}
        {activeTab === 'mcp' && <McpStatusPanel />}
        {activeTab === 'guide' && <MLHGuide />}
      </main>

      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '1.25rem 1.5rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        background: 'var(--bg-secondary)'
      }}>
        🐯 Tiger Data Cloud &bull; Model Context Protocol (MCP) Server &bull; MLH Global Hack Week: Builders Week Challenge 3
      </footer>
    </div>
  );
}

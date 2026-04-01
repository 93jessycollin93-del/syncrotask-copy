import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Zap, Send, ArrowLeft, Gamepad2, Globe, Sparkles, Code2, RotateCcw, Copy, Check, ChevronDown, History, Eye } from 'lucide-react';
import VersionHistory from '../components/studio/VersionHistory';
import LivePreview from '../components/studio/LivePreview';
import DownloadButton from '../components/studio/DownloadButton';
import { cn } from '@/lib/utils';

const STARTERS = [
  { icon: Gamepad2, label: '2D Platformer Game', prompt: 'Build a 2D side-scrolling platformer game with a player character that can jump, run, collect coins, and avoid enemies. Include a scoring system, lives counter, and multiple levels.' },
  { icon: Gamepad2, label: 'Top-Down RPG', prompt: 'Create a top-down RPG with character movement, an inventory system, health/mana bars, NPCs with dialogue, and combat mechanics.' },
  { icon: Globe, label: 'SaaS Dashboard', prompt: 'Build a full SaaS analytics dashboard with sidebar navigation, KPI cards, line and bar charts showing real-time data, a data table with filtering, and user settings.' },
  { icon: Globe, label: 'E-Commerce Store', prompt: 'Create a complete e-commerce platform with product listings, category filters, product detail pages, shopping cart, checkout flow, and order history.' },
  { icon: Code2, label: 'Portfolio Website', prompt: 'Design a stunning developer portfolio website with a hero section, animated skill bars, project showcase grid, testimonials, and a contact form.' },
  { icon: Sparkles, label: 'AI Chat Interface', prompt: 'Build a beautiful AI chat interface with message bubbles, typing indicators, code block rendering with syntax highlighting, conversation history sidebar, and model selection.' },
];

const PHASES = [
  { id: 'listen', label: 'Listening', color: 'text-neon-cyan', desc: 'Analyzing your vision...' },
  { id: 'analyze', label: 'Analyzing', color: 'text-neon-purple', desc: 'Breaking down requirements...' },
  { id: 'create', label: 'Creating', color: 'text-neon-pink', desc: 'Building your application...' },
  { id: 'verify', label: 'Verifying', color: 'text-neon-cyan', desc: 'Checking all systems...' },
  { id: 'deliver', label: 'Delivering', color: 'text-neon-purple', desc: 'Finalizing output...' },
];

export default function Studio() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [phase, setPhase] = useState(null);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const [showStarters, setShowStarters] = useState(true);
  const [versions, setVersions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewCode, setPreviewCode] = useState('');
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, phase]);

  // Cycle through build phases
  useEffect(() => {
    if (!isBuilding) return;
    const interval = setInterval(() => {
      setPhaseIndex(i => {
        const next = i + 1;
        if (next >= PHASES.length) {
          clearInterval(interval);
          return i;
        }
        setPhase(PHASES[next]);
        return next;
      });
    }, 1400);
    return () => clearInterval(interval);
  }, [isBuilding]);

  const handleSubmit = async () => {
    if (!input.trim() || isBuilding) return;
    const userMsg = input.trim();
    setInput('');
    setShowStarters(false);

    setMessages(prev => [...prev, { role: 'user', content: userMsg, id: Date.now() }]);
    setIsBuilding(true);
    setPhaseIndex(0);
    setPhase(PHASES[0]);

    const systemPrompt = `You are FORGE — a world-class senior full-stack engineer and product designer. 
Your role is to analyze a user's build request and produce:
1. A brief strategic overview (2-3 sentences)
2. A complete, detailed technical specification with: Architecture breakdown, Key components/systems, Data models, User flows, and Tech stack choices
3. Full, production-ready code for the main entry point or core component (React/JSX)
4. What the next build steps would be

Format your response in clear markdown sections. Be specific, technical, and actionable. Never use placeholders or TODOs. Code blocks must be complete and functional.`;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `${systemPrompt}\n\nUser Request: ${userMsg}`,
      model: 'claude_sonnet_4_6',
    });

    setIsBuilding(false);
    setPhase(null);
    const forgeMsg = { role: 'forge', content: result, id: Date.now() };
    setMessages(prev => [...prev, forgeMsg]);
    setPreviewCode(result);
    setVersions(prev => [{
      id: Date.now(),
      timestamp: new Date().toISOString(),
      title: userMsg.slice(0, 60) + (userMsg.length > 60 ? '...' : ''),
      prompt: userMsg,
      content: result,
    }, ...prev]);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit();
  };

  const handleStarter = (prompt) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };

  const reset = () => {
    setMessages([]);
    setInput('');
    setShowStarters(true);
    setPhase(null);
    setIsBuilding(false);
    setVersions([]);
    setPreviewCode('');
    setShowPreview(false);
    setShowHistory(false);
  };

  const handleRevert = (version) => {
    const reverted = { role: 'forge', content: version.content, id: Date.now() };
    setMessages(prev => [...prev.filter(m => m.role === 'user'), reverted]);
    setPreviewCode(version.content);
    setVersions(prev => [{
      id: Date.now(),
      timestamp: new Date().toISOString(),
      title: `Reverted: ${version.title}`,
      prompt: version.prompt,
      content: version.content,
    }, ...prev]);
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border bg-surface-1/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 bg-primary rounded-lg opacity-20 blur-sm" />
              <div className="relative w-7 h-7 bg-primary/10 border border-primary/40 rounded-lg flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary" />
              </div>
            </div>
            <span className="font-space font-bold text-foreground">FORGE <span className="text-muted-foreground font-normal text-sm">Studio</span></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <>
              <DownloadButton messages={messages} buildTitle={versions[0]?.title} />
              <button
                onClick={() => { setShowHistory(h => !h); setShowPreview(false); }}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-lg transition-all',
                  showHistory ? 'border-primary/40 text-primary bg-primary/10' : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                )}
              >
                <History className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{versions.length}</span>
              </button>
              <button
                onClick={() => { setShowPreview(p => !p); setShowHistory(false); }}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-lg transition-all',
                  showPreview ? 'border-neon-cyan/40 text-neon-cyan bg-neon-cyan/10' : 'border-border text-muted-foreground hover:text-foreground hover:border-neon-cyan/30'
                )}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Preview</span>
              </button>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground border border-border hover:border-primary/30 rounded-lg transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Build</span>
              </button>
            </>
          )}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 rounded-lg border border-border text-xs text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon-cyan"></span>
            </span>
            Claude Sonnet
          </div>
        </div>
      </header>

      {/* Body: side panel + messages */}
      <div className="flex flex-1 overflow-hidden">
      {(showHistory || showPreview) && (
        <div className="hidden lg:flex border-r border-border bg-surface-1 w-80 xl:w-96 flex-col overflow-hidden">
          {showHistory && <VersionHistory versions={versions} onRevert={handleRevert} onClose={() => setShowHistory(false)} />}
          {showPreview && <LivePreview code={previewCode} onClose={() => setShowPreview(false)} />}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-8">

          {/* Welcome state */}
          {messages.length === 0 && !isBuilding && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-3">
                What are we building?
              </h1>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                Describe your vision. FORGE will analyze, architect, and deliver production-ready code.
              </p>
            </div>
          )}

          {/* Quick starters */}
          {showStarters && messages.length === 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Quick Start</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {STARTERS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.label}
                      onClick={() => handleStarter(s.prompt)}
                      className="flex items-center gap-2.5 px-4 py-3 bg-surface-1 border border-border rounded-xl text-left hover:border-primary/40 hover:bg-surface-2 transition-all group text-sm"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Message list */}
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              msg={msg}
              onCopy={() => handleCopy(msg.id, msg.content)}
              copied={copiedId === msg.id}
            />
          ))}

          {/* Build phase indicator */}
          {isBuilding && phase && (
            <div className="flex justify-start">
              <div className="max-w-xl bg-surface-1 border border-border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-8 h-8 shrink-0">
                    <div className="absolute inset-0 bg-primary/20 rounded-lg animate-pulse" />
                    <div className="relative w-8 h-8 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">FORGE is building</p>
                    <p className="text-xs text-muted-foreground">{phase.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {PHASES.map((p, i) => (
                    <div key={p.id} className="flex items-center gap-2">
                      <div className={cn(
                        'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all',
                        i <= phaseIndex
                          ? 'bg-primary/15 text-primary border border-primary/30'
                          : 'bg-surface-2 text-muted-foreground border border-border'
                      )}>
                        {i < phaseIndex && <Check className="w-2.5 h-2.5" />}
                        {i === phaseIndex && (
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                          </span>
                        )}
                        {p.label}
                      </div>
                      {i < PHASES.length - 1 && <div className={cn('w-4 h-px', i < phaseIndex ? 'bg-primary/40' : 'bg-border')} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-surface-1/80 backdrop-blur-xl px-4 md:px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-surface-2 border border-border rounded-2xl focus-within:border-primary/50 transition-all">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe what you want to build — a game, a web app, a feature..."
              rows={3}
              className="w-full bg-transparent px-4 pt-4 pb-2 text-sm text-foreground placeholder-muted-foreground resize-none outline-none font-space"
              disabled={isBuilding}
            />
            <div className="flex items-center justify-between px-4 pb-3">
              <p className="text-xs text-muted-foreground">
                <kbd className="px-1.5 py-0.5 bg-surface-3 border border-border rounded text-xs font-mono">⌘</kbd>
                {' + '}
                <kbd className="px-1.5 py-0.5 bg-surface-3 border border-border rounded text-xs font-mono">Enter</kbd>
                {' to build'}
              </p>
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || isBuilding}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                  input.trim() && !isBuilding
                    ? 'bg-primary text-primary-foreground hover:opacity-90 glow-purple'
                    : 'bg-surface-3 text-muted-foreground cursor-not-allowed'
                )}
              >
                <Zap className="w-3.5 h-3.5" />
                Build
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg, onCopy, copied }) {
  const [expanded, setExpanded] = useState(true);
  const isUser = msg.role === 'user';

  // Extract code blocks for separate rendering
  const parts = msg.content.split(/(```[\s\S]*?```)/g);

  return (
    <div className={cn('flex gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="relative w-8 h-8 shrink-0 mt-0.5">
          <div className="absolute inset-0 bg-primary/20 rounded-lg" />
          <div className="relative w-8 h-8 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary" />
          </div>
        </div>
      )}

      <div className={cn('min-w-0', isUser ? 'max-w-lg' : 'max-w-3xl w-full')}>
        {isUser ? (
          <div className="px-4 py-3 bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-sm text-sm text-foreground">
            {msg.content}
          </div>
        ) : (
          <div className="bg-surface-1 border border-border rounded-2xl rounded-tl-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-primary">FORGE</span>
                <span className="text-xs text-muted-foreground">· Build Output</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setExpanded(e => !e)}
                  className="p-1 rounded hover:bg-surface-3 text-muted-foreground transition-colors"
                >
                  <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', !expanded && '-rotate-90')} />
                </button>
                <button
                  onClick={onCopy}
                  className="p-1 rounded hover:bg-surface-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-neon-cyan" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {expanded && (
              <div className="p-4 text-sm text-foreground leading-relaxed space-y-3 overflow-x-auto">
                {parts.map((part, i) => {
                  if (part.startsWith('```')) {
                    const lines = part.slice(3, -3).split('\n');
                    const lang = lines[0] || 'code';
                    const code = lines.slice(1).join('\n');
                    return (
                      <div key={i} className="relative group/code rounded-xl overflow-hidden border border-border">
                        <div className="flex items-center justify-between px-4 py-2 bg-surface-3 border-b border-border">
                          <span className="text-xs font-mono text-muted-foreground">{lang}</span>
                          <button
                            onClick={() => { navigator.clipboard.writeText(code); }}
                            className="opacity-0 group-hover/code:opacity-100 transition-opacity p-1 rounded hover:bg-surface-2"
                          >
                            <Copy className="w-3 h-3 text-muted-foreground" />
                          </button>
                        </div>
                        <pre className="p-4 text-xs font-mono text-foreground overflow-x-auto bg-surface-2 leading-relaxed">
                          <code>{code}</code>
                        </pre>
                      </div>
                    );
                  }
                  // Render markdown-ish text
                  return (
                    <div key={i} className="prose-dark whitespace-pre-wrap text-sm text-foreground/90 leading-relaxed">
                      {part.split('\n').map((line, j) => {
                        if (line.startsWith('# ')) return <h1 key={j} className="text-xl font-bold text-foreground mt-4 mb-2">{line.slice(2)}</h1>;
                        if (line.startsWith('## ')) return <h2 key={j} className="text-base font-semibold text-foreground mt-3 mb-1.5">{line.slice(3)}</h2>;
                        if (line.startsWith('### ')) return <h3 key={j} className="text-sm font-semibold text-neon-purple mt-2 mb-1">{line.slice(4)}</h3>;
                        if (line.startsWith('- ') || line.startsWith('* ')) return <div key={j} className="flex gap-2 text-foreground/80"><span className="text-primary mt-1 shrink-0">•</span><span>{line.slice(2)}</span></div>;
                        if (line.match(/^\d+\./)) return <div key={j} className="text-foreground/80 ml-2">{line}</div>;
                        if (line === '') return <div key={j} className="h-2" />;
                        return <p key={j} className="text-foreground/80">{line}</p>;
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
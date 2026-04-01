import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Zap, Code2, BookOpen, Layers, ChevronRight, Star, Trophy, Copy, Check, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LANGUAGES, DESIGN_PATTERNS, CATEGORIES, AI_MODELS } from '../data/codingKnowledge';

export default function KnowledgeBase() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('snippet');
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState('languages'); // languages | patterns | ai

  const filtered = useMemo(() => {
    return LANGUAGES.filter(lang => {
      const matchCat = category === 'All' || lang.category === category;
      const matchSearch = !search ||
        lang.name.toLowerCase().includes(search.toLowerCase()) ||
        lang.description.toLowerCase().includes(search.toLowerCase()) ||
        lang.useCases.some(u => u.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [search, category]);

  const handleCopy = () => {
    if (!selected) return;
    navigator.clipboard.writeText(selected.snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tierColor = {
    legendary: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    elite: 'text-neon-purple border-neon-purple/30 bg-neon-purple/10',
    standard: 'text-muted-foreground border-border bg-surface-2',
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border bg-surface-1/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-neon-cyan" />
            <span className="font-space font-bold text-foreground">Knowledge <span className="text-neon-cyan">Core</span></span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/studio" className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-all">
            <Zap className="w-3.5 h-3.5" />
            Studio
          </Link>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="lg:w-80 border-b lg:border-b-0 lg:border-r border-border bg-surface-1/50 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search languages..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-surface-2 border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </div>

          {/* View switcher */}
          <div className="flex gap-1 p-4 border-b border-border">
            {[
              { id: 'languages', label: 'Languages', icon: Code2 },
              { id: 'patterns', label: 'Patterns', icon: Layers },
              { id: 'ai', label: 'AI Models', icon: Zap },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setView(id); setSelected(null); }}
                className={cn(
                  'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all',
                  view === id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-surface-3'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Category filter (languages only) */}
          {view === 'languages' && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-1.5 mb-2">
                <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-medium">Category</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.filter(c => c === 'All' || LANGUAGES.some(l => l.category === c)).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={cn(
                      'px-2 py-1 rounded-md text-xs font-medium transition-all',
                      category === cat
                        ? 'bg-primary/20 text-primary border border-primary/40'
                        : 'bg-surface-2 text-muted-foreground border border-border hover:border-primary/20'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* List */}
          <div className="flex-1 overflow-y-auto p-2">
            {view === 'languages' && filtered.map(lang => (
              <button
                key={lang.id}
                onClick={() => { setSelected(lang); setActiveTab('snippet'); }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all mb-1',
                  selected?.id === lang.id
                    ? 'bg-primary/10 border border-primary/30'
                    : 'hover:bg-surface-2 border border-transparent'
                )}
              >
                <span className="text-xl shrink-0">{lang.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{lang.name}</span>
                    <span className="text-xs text-muted-foreground">{lang.category}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="h-1 flex-1 bg-surface-3 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        style={{ width: `${lang.xp / 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{(lang.xp / 100).toFixed(0)}%</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              </button>
            ))}

            {view === 'patterns' && DESIGN_PATTERNS.map((p, i) => (
              <button
                key={i}
                onClick={() => setSelected({ ...p, _type: 'pattern' })}
                className={cn(
                  'w-full flex items-start gap-3 px-3 py-3 rounded-xl text-left transition-all mb-1',
                  selected?.name === p.name
                    ? 'bg-primary/10 border border-primary/30'
                    : 'hover:bg-surface-2 border border-transparent'
                )}
              >
                <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Layers className="w-4 h-4 text-neon-cyan" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{p.name}</div>
                  <div className="text-xs text-neon-cyan">{p.category}</div>
                </div>
              </button>
            ))}

            {view === 'ai' && AI_MODELS.map(model => (
              <button
                key={model.id}
                onClick={() => setSelected({ ...model, _type: 'ai' })}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all mb-1',
                  selected?.id === model.id
                    ? 'bg-primary/10 border border-primary/30'
                    : 'hover:bg-surface-2 border border-transparent'
                )}
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{model.name}</span>
                    <span className={cn('text-xs px-1.5 py-0.5 rounded border font-medium', tierColor[model.tier])}>
                      {model.tier}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">{model.provider} · {model.tokens}</div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {!selected ? (
            <EmptyState view={view} count={filtered.length} />
          ) : selected._type === 'pattern' ? (
            <PatternDetail pattern={selected} />
          ) : selected._type === 'ai' ? (
            <AIModelDetail model={selected} tierColor={tierColor} />
          ) : (
            <LanguageDetail
              lang={selected}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onCopy={handleCopy}
              copied={copied}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function EmptyState({ view, count }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-24 px-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
        <BookOpen className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">FORGE Knowledge Core</h2>
      <p className="text-muted-foreground max-w-sm">
        {view === 'languages' && `${count} programming languages with full syntax, patterns, and production snippets.`}
        {view === 'patterns' && 'Architecture and design patterns used in production systems and games.'}
        {view === 'ai' && 'All available AI models — select the right one for any build task.'}
      </p>
      <p className="text-xs text-muted-foreground mt-4">← Select from the sidebar to explore</p>
    </div>
  );
}

function LanguageDetail({ lang, activeTab, setActiveTab, onCopy, copied }) {
  const tabs = ['snippet', 'concepts', 'use cases', 'strengths'];

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="text-5xl">{lang.emoji}</div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold text-foreground">{lang.name}</h1>
            <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
              {lang.level}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-surface-2 border border-border text-xs text-muted-foreground">
              {lang.category}
            </span>
          </div>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{lang.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {lang.paradigms.map(p => (
              <span key={p} className="px-2 py-0.5 rounded bg-surface-3 border border-border text-xs text-muted-foreground">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* XP bar */}
      <div className="flex items-center gap-3 mb-8 p-4 bg-surface-1 border border-border rounded-2xl">
        <Trophy className="w-5 h-5 text-yellow-400 shrink-0" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-foreground">FORGE Mastery Level</span>
            <span className="text-xs text-primary font-bold">{lang.xp.toLocaleString()} XP</span>
          </div>
          <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
              style={{ width: `${lang.xp / 100}%` }}
            />
          </div>
        </div>
        <span className="text-xs text-muted-foreground">{(lang.xp / 100).toFixed(0)}%</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-surface-2 p-1 rounded-xl border border-border w-fit">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all',
              activeTab === tab
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'snippet' && (
        <div className="relative group rounded-2xl overflow-hidden border border-border">
          <div className="flex items-center justify-between px-4 py-2.5 bg-surface-2 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-muted-foreground font-mono">{lang.name.toLowerCase()}_production.{lang.id === 'sql' ? 'sql' : lang.id === 'glsl' ? 'frag' : lang.id === 'wasm' ? 'wat' : lang.id === 'python' ? 'py' : lang.id === 'rust' ? 'rs' : lang.id === 'cpp' ? 'cpp' : lang.id === 'csharp' ? 'cs' : lang.id === 'go' ? 'go' : lang.id === 'java' ? 'java' : lang.id === 'kotlin' ? 'kt' : lang.id === 'swift' ? 'swift' : lang.id === 'lua' ? 'lua' : 'ts'}</span>
            </div>
            <button
              onClick={onCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-3 hover:bg-surface-1 border border-border text-xs text-muted-foreground hover:text-foreground transition-all"
            >
              {copied ? <Check className="w-3 h-3 text-neon-cyan" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="p-6 text-xs font-mono text-foreground/90 overflow-x-auto leading-relaxed bg-surface-1 max-h-[600px] overflow-y-auto">
            <code>{lang.snippet}</code>
          </pre>
        </div>
      )}

      {activeTab === 'concepts' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {lang.concepts.map((concept, i) => (
            <div key={i} className="flex items-center gap-2.5 p-3 bg-surface-1 border border-border rounded-xl hover:border-primary/30 transition-all">
              <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Star className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-sm text-foreground">{concept}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'use cases' && (
        <div className="space-y-2">
          {lang.useCases.map((uc, i) => (
            <div key={i} className="flex items-center gap-3 p-3.5 bg-surface-1 border border-border rounded-xl hover:border-neon-cyan/30 transition-all">
              <div className="w-2 h-2 rounded-full bg-neon-cyan shrink-0" />
              <span className="text-sm text-foreground">{uc}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'strengths' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-neon-cyan mb-3 flex items-center gap-2">
              <span className="w-4 h-4 text-lg">✓</span> Strengths
            </h3>
            <div className="space-y-2">
              {lang.strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-neon-cyan/5 border border-neon-cyan/15 rounded-xl">
                  <span className="text-neon-cyan text-xs mt-0.5">+</span>
                  <span className="text-sm text-foreground">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
              <span>⚠</span> Watch out for
            </h3>
            <div className="space-y-2">
              {lang.weaknesses.map((w, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-destructive/5 border border-destructive/15 rounded-xl">
                  <span className="text-destructive text-xs mt-0.5">−</span>
                  <span className="text-sm text-foreground">{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PatternDetail({ pattern }) {
  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center shrink-0">
          <Layers className="w-7 h-7 text-neon-cyan" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{pattern.name}</h1>
          <span className="text-sm text-neon-cyan font-medium">{pattern.category}</span>
        </div>
      </div>
      <div className="p-6 bg-surface-1 border border-border rounded-2xl">
        <p className="text-foreground leading-relaxed">{pattern.description}</p>
      </div>
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
        <p className="text-xs text-primary font-semibold mb-1">FORGE Note</p>
        <p className="text-sm text-muted-foreground">
          This pattern is loaded into FORGE's context when building relevant systems. 
          Open Studio and describe your use case — FORGE will apply the correct pattern automatically.
        </p>
      </div>
    </div>
  );
}

function AIModelDetail({ model, tierColor }) {
  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <Zap className="w-7 h-7 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-foreground">{model.name}</h1>
            <span className={cn('text-xs px-2 py-1 rounded-full border font-semibold capitalize', tierColor[model.tier])}>
              {model.tier}
            </span>
          </div>
          <p className="text-muted-foreground text-sm mt-1">{model.provider} · {model.tokens}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-surface-1 border border-border rounded-2xl">
          <p className="text-xs text-muted-foreground font-medium mb-1">Best at</p>
          <p className="text-foreground font-semibold">{model.specialty}</p>
        </div>

        <div className="p-4 bg-surface-1 border border-border rounded-2xl">
          <p className="text-xs text-muted-foreground font-medium mb-2">Model ID</p>
          <code className="text-sm font-mono text-neon-cyan bg-surface-2 px-3 py-1.5 rounded-lg border border-border block">
            {model.id}
          </code>
        </div>

        <Link
          to="/studio"
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all"
        >
          <Zap className="w-4 h-4" />
          Build with {model.name}
        </Link>
      </div>
    </div>
  );
}
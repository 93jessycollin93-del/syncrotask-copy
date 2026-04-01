import { useState } from 'react';
import { History, RotateCcw, X, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function VersionHistory({ versions, onRevert, onClose }) {
  const [hoveredId, setHoveredId] = useState(null);

  if (!versions.length) {
    return (
      <div className="flex flex-col h-full">
        <Header onClose={onClose} />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <History className="w-10 h-10 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">No versions saved yet.<br />Build something to create your first snapshot.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header onClose={onClose} />
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {versions.map((v, i) => (
          <div
            key={v.id}
            onMouseEnter={() => setHoveredId(v.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={cn(
              'p-3 rounded-xl border transition-all cursor-default',
              i === 0 ? 'border-primary/40 bg-primary/5' : 'border-border bg-surface-1 hover:border-primary/20'
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {i === 0 && <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium">Latest</span>}
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {format(new Date(v.timestamp), 'MMM d, HH:mm:ss')}
                  </span>
                </div>
                <p className="text-sm text-foreground font-medium truncate">{v.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{v.prompt}</p>
              </div>
              {i > 0 && (
                <button
                  onClick={() => onRevert(v)}
                  className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-surface-2 border border-border hover:border-primary/40 hover:text-primary transition-all"
                >
                  <RotateCcw className="w-3 h-3" />
                  Revert
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Header({ onClose }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
      <div className="flex items-center gap-2">
        <History className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">Version History</span>
      </div>
      <button onClick={onClose} className="p-1 rounded hover:bg-surface-3 text-muted-foreground transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
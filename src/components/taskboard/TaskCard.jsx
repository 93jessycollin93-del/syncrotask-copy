import { useState } from 'react';
import { CheckCircle2, Circle, Clock, AlertTriangle, Lock, ChevronDown, ChevronUp, Trash2, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const PRIORITY_CONFIG = {
  high: { color: 'text-red-400 border-red-400/30 bg-red-400/10', label: 'High' },
  medium: { color: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10', label: 'Med' },
  low: { color: 'text-blue-400 border-blue-400/30 bg-blue-400/10', label: 'Low' },
};

export default function TaskCard({ task, allTasks, onStatusChange, onDelete, onSelectForLink, isLinkSource, cardRef }) {
  const [expanded, setExpanded] = useState(false);

  const prerequisites = (task.prerequisites || [])
    .map(id => allTasks.find(t => t.id === id))
    .filter(Boolean);

  const blockedBy = prerequisites.filter(p => p.status !== 'done');
  const isBlocked = blockedBy.length > 0 && task.status !== 'done';
  const canComplete = blockedBy.length === 0;

  const handleComplete = () => {
    if (!canComplete) return;
    onStatusChange(task, task.status === 'done' ? 'in_progress' : 'done');
  };

  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative bg-surface-1 border rounded-2xl p-4 transition-all group',
        task.status === 'done'
          ? 'border-border opacity-60'
          : isBlocked
          ? 'border-orange-500/40 shadow-[0_0_0_1px_rgba(249,115,22,0.15)]'
          : 'border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5',
        isLinkSource && 'border-primary ring-1 ring-primary/40'
      )}
    >
      {/* Top row */}
      <div className="flex items-start gap-2">
        <button
          onClick={handleComplete}
          title={isBlocked ? `Blocked by: ${blockedBy.map(t => t.title).join(', ')}` : ''}
          className={cn(
            'mt-0.5 shrink-0 transition-all',
            !canComplete && task.status !== 'done' ? 'cursor-not-allowed opacity-50' : 'hover:scale-110'
          )}
        >
          {task.status === 'done' ? (
            <CheckCircle2 className="w-5 h-5 text-primary" />
          ) : isBlocked ? (
            <Lock className="w-5 h-5 text-orange-400" />
          ) : (
            <Circle className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p className={cn('text-sm font-medium text-foreground leading-snug', task.status === 'done' && 'line-through text-muted-foreground')}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onSelectForLink(task)}
            title="Add as prerequisite link"
            className={cn(
              'p-1 rounded-lg transition-all',
              isLinkSource
                ? 'text-primary bg-primary/15'
                : 'text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-primary hover:bg-primary/10'
            )}
          >
            <Link2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setExpanded(e => !e)}
            className="p-1 rounded-lg text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-foreground hover:bg-surface-3 transition-all"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 rounded-lg text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Badges row */}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <span className={cn('text-xs px-2 py-0.5 rounded-full border font-medium', priority.color)}>
          {priority.label}
        </span>
        {prerequisites.length > 0 && (
          <span className="text-xs px-2 py-0.5 rounded-full border border-border bg-surface-2 text-muted-foreground flex items-center gap-1">
            <Link2 className="w-2.5 h-2.5" />
            {prerequisites.length} dep{prerequisites.length > 1 ? 's' : ''}
          </span>
        )}
        {isBlocked && (
          <span className="text-xs px-2 py-0.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 flex items-center gap-1">
            <AlertTriangle className="w-2.5 h-2.5" />
            Blocked
          </span>
        )}
        {task.due_date && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {new Date(task.due_date).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Expanded prerequisite list */}
      {expanded && prerequisites.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground font-medium mb-2">Prerequisites</p>
          <div className="space-y-1">
            {prerequisites.map(pre => (
              <div key={pre.id} className="flex items-center gap-2 text-xs">
                {pre.status === 'done'
                  ? <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  : <Circle className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                }
                <span className={pre.status === 'done' ? 'text-muted-foreground line-through' : 'text-foreground'}>
                  {pre.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const STATUSES = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export default function AddTaskModal({ onClose, onAdd, allTasks, defaultStatus = 'todo' }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: defaultStatus,
    priority: 'medium',
    prerequisites: [],
    due_date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onAdd({
      ...form,
      prerequisites: form.prerequisites,
    });
  };

  const togglePrereq = (id) => {
    setForm(f => ({
      ...f,
      prerequisites: f.prerequisites.includes(id)
        ? f.prerequisites.filter(p => p !== id)
        : [...f.prerequisites, id],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-surface-1 border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">New Task</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-3 text-muted-foreground transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Title *</label>
            <input
              autoFocus
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Task title..."
              className="w-full bg-surface-2 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary/50 transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Optional description..."
              rows={2}
              className="w-full bg-surface-2 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary/50 resize-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Status</label>
              <select
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                className="w-full bg-surface-2 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary/50 transition-all"
              >
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Priority</label>
              <select
                value={form.priority}
                onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
                className="w-full bg-surface-2 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary/50 transition-all"
              >
                {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Due Date</label>
            <input
              type="date"
              value={form.due_date}
              onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))}
              className="w-full bg-surface-2 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary/50 transition-all"
            />
          </div>

          {allTasks.length > 0 && (
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Prerequisites (must complete first)</label>
              <div className="max-h-36 overflow-y-auto space-y-1 bg-surface-2 border border-border rounded-xl p-2">
                {allTasks.map(t => (
                  <label key={t.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-3 cursor-pointer transition-all">
                    <input
                      type="checkbox"
                      checked={form.prerequisites.includes(t.id)}
                      onChange={() => togglePrereq(t.id)}
                      className="accent-primary"
                    />
                    <span className="text-sm text-foreground">{t.title}</span>
                    <span className="text-xs text-muted-foreground ml-auto capitalize">{t.status.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 bg-surface-2 border border-border text-muted-foreground rounded-xl text-sm font-medium hover:text-foreground hover:border-primary/30 transition-all">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!form.title.trim()}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                form.title.trim()
                  ? 'bg-primary text-primary-foreground hover:opacity-90'
                  : 'bg-surface-3 text-muted-foreground cursor-not-allowed'
              )}
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
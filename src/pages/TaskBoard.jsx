import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, Plus, Zap, Link2, X, Eye, EyeOff } from 'lucide-react';
import TaskCard from '../components/taskboard/TaskCard';
import DependencyArrows from '../components/taskboard/DependencyArrows';
import AddTaskModal from '../components/taskboard/AddTaskModal';
import { cn } from '@/lib/utils';

const COLUMNS = [
  { id: 'todo', label: 'To Do', color: 'text-muted-foreground', dot: 'bg-muted-foreground' },
  { id: 'in_progress', label: 'In Progress', color: 'text-yellow-400', dot: 'bg-yellow-400' },
  { id: 'done', label: 'Done', color: 'text-primary', dot: 'bg-primary' },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState('todo');
  const [showArrows, setShowArrows] = useState(true);
  const [linkSource, setLinkSource] = useState(null); // task being linked FROM (as prereq)
  const containerRef = useRef(null);
  const cardRefs = useRef({});

  const setCardRef = useCallback((taskId, el) => {
    cardRefs.current[taskId] = el;
  }, []);

  const loadTasks = async () => {
    const data = await base44.entities.Task.list('-created_date', 100);
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => { loadTasks(); }, []);

  // Re-compute arrows whenever tasks change (after short tick for DOM)
  useEffect(() => {
    const timeout = setTimeout(() => {
      // trigger re-render by nudging state — DependencyArrows handles resize itself
    }, 100);
    return () => clearTimeout(timeout);
  }, [tasks]);

  const handleStatusChange = async (task, newStatus) => {
    const updated = { ...task, status: newStatus };
    setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
    await base44.entities.Task.update(task.id, { status: newStatus });
  };

  const handleDelete = async (taskId) => {
    // Remove this task from any prerequisites arrays
    const affectedTasks = tasks.filter(t => t.prerequisites?.includes(taskId));
    for (const t of affectedTasks) {
      const newPrereqs = t.prerequisites.filter(p => p !== taskId);
      await base44.entities.Task.update(t.id, { prerequisites: newPrereqs });
    }
    setTasks(prev => prev
      .filter(t => t.id !== taskId)
      .map(t => ({
        ...t,
        prerequisites: (t.prerequisites || []).filter(p => p !== taskId)
      }))
    );
    await base44.entities.Task.delete(taskId);
  };

  const handleAdd = async (formData) => {
    const created = await base44.entities.Task.create(formData);
    setTasks(prev => [created, ...prev]);
    setShowModal(false);
  };

  // Link mode: clicking a card while linkSource is set adds linkSource as a prereq to the clicked card
  const handleSelectForLink = (task) => {
    if (!linkSource) {
      // Start linking: this task will be added as a prerequisite to the next card clicked
      setLinkSource(task);
      return;
    }
    if (linkSource.id === task.id) {
      setLinkSource(null);
      return;
    }
    // Add linkSource as prerequisite to task
    const currentPrereqs = task.prerequisites || [];
    if (currentPrereqs.includes(linkSource.id)) {
      setLinkSource(null);
      return;
    }
    const newPrereqs = [...currentPrereqs, linkSource.id];
    const updated = { ...task, prerequisites: newPrereqs };
    setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
    base44.entities.Task.update(task.id, { prerequisites: newPrereqs });
    setLinkSource(null);
  };

  const openModal = (status) => {
    setDefaultStatus(status);
    setShowModal(true);
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
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 bg-primary rounded-lg opacity-20 blur-sm" />
              <div className="relative w-7 h-7 bg-primary/10 border border-primary/40 rounded-lg flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary" />
              </div>
            </div>
            <span className="font-space font-bold text-foreground">Task <span className="text-muted-foreground font-normal text-sm">Board</span></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Link mode indicator */}
          {linkSource && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-lg text-xs text-primary">
              <Link2 className="w-3 h-3" />
              <span className="hidden sm:inline">Click a card to set it as dependent on <strong>{linkSource.title.slice(0, 20)}</strong></span>
              <span className="sm:hidden">Linking…</span>
              <button onClick={() => setLinkSource(null)}>
                <X className="w-3 h-3 ml-1" />
              </button>
            </div>
          )}

          <button
            onClick={() => setShowArrows(a => !a)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-lg transition-all',
              showArrows
                ? 'border-primary/40 text-primary bg-primary/10'
                : 'border-border text-muted-foreground hover:text-foreground'
            )}
          >
            {showArrows ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Arrows</span>
          </button>

          <button
            onClick={() => openModal('todo')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Task</span>
          </button>
        </div>
      </header>

      {/* Legend */}
      {showArrows && tasks.some(t => t.prerequisites?.length) && (
        <div className="flex items-center gap-6 px-6 py-2 bg-surface-1/50 border-b border-border text-xs text-muted-foreground">
          <span className="font-medium">Dependency arrows:</span>
          <span className="flex items-center gap-1.5">
            <svg width="32" height="10"><line x1="0" y1="5" x2="28" y2="5" stroke="rgb(139,92,246)" strokeWidth="1.5" /><polygon points="24,2 32,5 24,8" fill="rgb(139,92,246)" /></svg>
            Completed
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="32" height="10"><line x1="0" y1="5" x2="28" y2="5" stroke="rgb(249,115,22)" strokeWidth="1.5" strokeDasharray="4 3" /><polygon points="24,2 32,5 24,8" fill="rgb(249,115,22)" /></svg>
            Blocking
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="32" height="10"><line x1="0" y1="5" x2="28" y2="5" stroke="rgb(100,116,139)" strokeWidth="1.5" strokeDasharray="4 3" /><polygon points="24,2 32,5 24,8" fill="rgb(100,116,139)" /></svg>
            Pending
          </span>
        </div>
      )}

      {/* Board */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <div ref={containerRef} className="flex-1 relative overflow-auto">
          {showArrows && (
            <DependencyArrows tasks={tasks} cardRefs={cardRefs} containerRef={containerRef} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 h-full min-h-[calc(100vh-120px)]">
            {COLUMNS.map((col, colIdx) => {
              const colTasks = tasks.filter(t => t.status === col.id);
              return (
                <div
                  key={col.id}
                  className={cn(
                    'flex flex-col border-border',
                    colIdx < COLUMNS.length - 1 && 'md:border-r'
                  )}
                >
                  {/* Column header */}
                  <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-surface-1/90 backdrop-blur-sm border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className={cn('w-2 h-2 rounded-full', col.dot)} />
                      <span className={cn('text-sm font-semibold', col.color)}>{col.label}</span>
                      <span className="text-xs text-muted-foreground bg-surface-2 border border-border px-1.5 py-0.5 rounded-full">
                        {colTasks.length}
                      </span>
                    </div>
                    <button
                      onClick={() => openModal(col.id)}
                      className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-3 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Tasks */}
                  <div className="flex-1 p-3 space-y-3">
                    {colTasks.length === 0 && (
                      <div
                        onClick={() => openModal(col.id)}
                        className="flex flex-col items-center justify-center py-12 rounded-2xl border-2 border-dashed border-border text-muted-foreground cursor-pointer hover:border-primary/30 hover:text-primary/60 transition-all"
                      >
                        <Plus className="w-6 h-6 mb-2" />
                        <span className="text-xs">Add task</span>
                      </div>
                    )}
                    {colTasks.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        allTasks={tasks}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDelete}
                        onSelectForLink={handleSelectForLink}
                        isLinkSource={linkSource?.id === task.id}
                        cardRef={(el) => setCardRef(task.id, el)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
          allTasks={tasks}
          defaultStatus={defaultStatus}
        />
      )}
    </div>
  );
}
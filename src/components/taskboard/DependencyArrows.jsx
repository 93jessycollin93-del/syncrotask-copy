import { useEffect, useRef, useState } from 'react';

export default function DependencyArrows({ tasks, cardRefs, containerRef }) {
  const [arrows, setArrows] = useState([]);

  useEffect(() => {
    const compute = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newArrows = [];

      tasks.forEach(task => {
        if (!task.prerequisites?.length) return;
        const toRef = cardRefs.current[task.id];
        if (!toRef) return;
        const toRect = toRef.getBoundingClientRect();

        task.prerequisites.forEach(prereqId => {
          const fromRef = cardRefs.current[prereqId];
          if (!fromRef) return;
          const fromRect = fromRef.getBoundingClientRect();
          const prereqTask = tasks.find(t => t.id === prereqId);

          // from right-center of prereq card to left-center of task card
          const x1 = fromRect.right - containerRect.left;
          const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
          const x2 = toRect.left - containerRect.left;
          const y2 = toRect.top + toRect.height / 2 - containerRect.top;

          const dx = x2 - x1;
          const cp1x = x1 + Math.min(Math.abs(dx) * 0.5, 80);
          const cp2x = x2 - Math.min(Math.abs(dx) * 0.5, 80);

          const isDone = prereqTask?.status === 'done';

          newArrows.push({
            id: `${prereqId}->${task.id}`,
            path: `M ${x1} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`,
            isDone,
            isBlocked: !isDone && task.status !== 'done',
          });
        });
      });

      setArrows(newArrows);
    };

    compute();
    const observer = new ResizeObserver(compute);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('scroll', compute, true);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', compute, true);
    };
  }, [tasks, cardRefs, containerRef]);

  if (!arrows.length) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      <defs>
        <marker id="arrow-done" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <path d="M 0 0 L 8 3 L 0 6 Z" fill="rgb(139,92,246)" fillOpacity="0.7" />
        </marker>
        <marker id="arrow-blocked" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <path d="M 0 0 L 8 3 L 0 6 Z" fill="rgb(249,115,22)" fillOpacity="0.8" />
        </marker>
        <marker id="arrow-default" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <path d="M 0 0 L 8 3 L 0 6 Z" fill="rgb(100,116,139)" fillOpacity="0.6" />
        </marker>
      </defs>
      {arrows.map(arrow => (
        <path
          key={arrow.id}
          d={arrow.path}
          fill="none"
          stroke={
            arrow.isDone
              ? 'rgb(139,92,246)'
              : arrow.isBlocked
              ? 'rgb(249,115,22)'
              : 'rgb(100,116,139)'
          }
          strokeWidth={arrow.isDone ? 1.5 : 1.5}
          strokeOpacity={arrow.isDone ? 0.5 : arrow.isBlocked ? 0.7 : 0.4}
          strokeDasharray={arrow.isDone ? 'none' : '4 3'}
          markerEnd={arrow.isDone ? 'url(#arrow-done)' : arrow.isBlocked ? 'url(#arrow-blocked)' : 'url(#arrow-default)'}
        />
      ))}
    </svg>
  );
}
import { useState } from 'react';
import { Gamepad2, Globe, BarChart3, Smartphone, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const projects = [
  {
    id: 1,
    title: 'Neon Runner',
    type: 'Video Game',
    description: 'A full 2D side-scrolling platformer with physics, parallax backgrounds, enemy AI, scoring system, and level progression.',
    icon: Gamepad2,
    color: 'neon-purple',
    tags: ['React + Three.js', 'Physics Engine', 'AI Enemies', 'Level Design'],
    img: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&q=80',
  },
  {
    id: 2,
    title: 'DataForge Dashboard',
    type: 'Web App',
    description: 'Real-time analytics platform with live charts, drill-down tables, role-based access, and automated reporting.',
    icon: BarChart3,
    color: 'neon-cyan',
    tags: ['React', 'Real-time', 'Charts', 'Auth'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  },
  {
    id: 3,
    title: 'GuildCraft',
    type: 'Video Game',
    description: 'Multiplayer strategy game with base building, resource management, guild system, and real-time combat mechanics.',
    icon: Gamepad2,
    color: 'neon-pink',
    tags: ['Game Logic', 'Multiplayer', 'Strategy', 'UI System'],
    img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80',
  },
  {
    id: 4,
    title: 'Launchpad CRM',
    type: 'Web App',
    description: 'Full customer management suite with pipeline tracking, email automation, analytics, and team collaboration tools.',
    icon: Globe,
    color: 'neon-purple',
    tags: ['CRM', 'Automation', 'Pipeline', 'Teams'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  },
  {
    id: 5,
    title: 'PixelQuest RPG',
    type: 'Video Game',
    description: 'Top-down RPG with inventory system, character progression, dialogue trees, and procedural dungeon generation.',
    icon: Gamepad2,
    color: 'neon-cyan',
    tags: ['RPG Systems', 'Procedural Gen', 'Dialogue', 'Inventory'],
    img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80',
  },
  {
    id: 6,
    title: 'StoreForge',
    type: 'Web App',
    description: 'E-commerce platform with product catalog, cart, checkout flow, order management, and vendor dashboard.',
    icon: Smartphone,
    color: 'neon-pink',
    tags: ['E-Commerce', 'Payments', 'Inventory', 'Mobile'],
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
  },
];

const colorMap = {
  'neon-purple': { badge: 'bg-neon-purple/15 text-neon-purple border-neon-purple/20', dot: 'bg-neon-purple' },
  'neon-cyan': { badge: 'bg-neon-cyan/15 text-neon-cyan border-neon-cyan/20', dot: 'bg-neon-cyan' },
  'neon-pink': { badge: 'bg-neon-pink/15 text-neon-pink border-neon-pink/20', dot: 'bg-neon-pink' },
};

export default function ProjectShowcase() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Video Game', 'Web App'];
  const visible = filter === 'All' ? projects : projects.filter(p => p.type === filter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-8 justify-center">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              filter === f
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface-2 text-muted-foreground hover:text-foreground border border-border hover:border-primary/30'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((project) => {
          const styles = colorMap[project.color] || colorMap['neon-purple'];
          const Icon = project.icon;
          return (
            <div
              key={project.id}
              className="group rounded-2xl bg-surface-1 border border-border hover:border-primary/30 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm', styles.badge)}>
                    <Icon className="w-3 h-3" />
                    {project.type}
                  </span>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center border border-border">
                    <ArrowUpRight className="w-3.5 h-3.5 text-foreground" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-surface-3 rounded text-xs text-muted-foreground border border-border/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
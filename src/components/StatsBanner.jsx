const stats = [
  { value: '100%', label: 'Functional Output', desc: 'Zero placeholders' },
  { value: '< 60s', label: 'Time to First Build', desc: 'Describe → Deploy' },
  { value: '∞', label: 'Project Types', desc: 'Games to enterprise' },
  { value: '1:1', label: 'Vision Match', desc: 'Mirrored accuracy' },
];

export default function StatsBanner() {
  return (
    <div className="border-y border-border bg-surface-1/50 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
            <div className="text-sm font-semibold text-foreground mb-0.5">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
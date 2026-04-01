import { useState, useEffect, useRef } from 'react';
import { Monitor, Smartphone, Tablet, RefreshCw, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const VIEWPORTS = [
  { id: 'desktop', label: 'Desktop', icon: Monitor, width: '100%' },
  { id: 'tablet', label: 'Tablet', icon: Tablet, width: '768px' },
  { id: 'mobile', label: 'Mobile', icon: Smartphone, width: '390px' },
];

function buildHtml(code) {
  // Extract JSX/JS code block from markdown if present
  const match = code.match(/```(?:jsx?|tsx?|javascript|typescript)?\n([\s\S]*?)```/);
  const rawCode = match ? match[1] : code;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>FORGE Preview</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; font-family: system-ui, sans-serif; background: #0d1117; color: #e6edf3; }
    #root { min-height: 100vh; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    try {
      ${rawCode}
      // Try to find and render the default export or last function
      const allKeys = Object.keys(window).filter(k => typeof window[k] === 'function' && /^[A-Z]/.test(k));
      const Component = typeof App !== 'undefined' ? App : typeof exports !== 'undefined' && exports.default ? exports.default : null;
      if (Component) {
        ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Component));
      } else {
        document.getElementById('root').innerHTML = '<div style="padding:2rem;color:#a78bfa">Code loaded — no default React component found to render.</div>';
      }
    } catch(e) {
      document.getElementById('root').innerHTML = '<pre style="padding:2rem;color:#f87171;white-space:pre-wrap">' + e.message + '</pre>';
    }
  </script>
</body>
</html>`;
}

export default function LivePreview({ code, onClose }) {
  const [viewport, setViewport] = useState('desktop');
  const [key, setKey] = useState(0);
  const iframeRef = useRef(null);
  const current = VIEWPORTS.find(v => v.id === viewport);

  useEffect(() => {
    if (!iframeRef.current || !code) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(buildHtml(code));
      doc.close();
    }
  }, [code, key]);

  return (
    <div className="flex flex-col h-full bg-surface-1">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-2 shrink-0">
        <div className="flex items-center gap-1 p-1 bg-surface-3 rounded-lg border border-border">
          {VIEWPORTS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setViewport(id)}
              title={label}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all',
                viewport === id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setKey(k => k + 1)}
            className="p-1.5 rounded-lg hover:bg-surface-3 text-muted-foreground hover:text-foreground transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preview frame */}
      <div className="flex-1 overflow-auto flex justify-center bg-[#111] p-4">
        <div
          className="transition-all duration-300 h-full"
          style={{ width: current.width, minWidth: current.id !== 'desktop' ? current.width : undefined }}
        >
          {code ? (
            <iframe
              ref={iframeRef}
              key={key}
              className="w-full h-full rounded-xl border border-border bg-background"
              style={{ minHeight: '500px' }}
              sandbox="allow-scripts"
              title="Live Preview"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              Build something to see a live preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
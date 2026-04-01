import { useEffect, useRef } from 'react';

export default function HeroOrb() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.35;

      // Outer glow rings
      for (let i = 3; i >= 1; i--) {
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * (1 + i * 0.3));
        gradient.addColorStop(0, `rgba(139, 92, 246, ${0.08 / i})`);
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(cx, cy, r * (1 + i * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Rotating ring 1
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.4);
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 1.2, r * 0.35, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // Dot on ring
      const dotX = Math.cos(t * 0.4) * r * 1.2;
      const dotY = Math.sin(t * 0.4) * r * 0.35;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(139, 92, 246, 0.9)';
      ctx.fill();
      ctx.restore();

      // Rotating ring 2
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-t * 0.25);
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.38, r * 1.25, Math.PI / 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(6, 226, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      const dot2X = Math.cos(-t * 0.25) * r * 0.38;
      const dot2Y = Math.sin(-t * 0.25) * r * 1.25;
      ctx.beginPath();
      ctx.arc(dot2X, dot2Y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 226, 255, 0.9)';
      ctx.fill();
      ctx.restore();

      // Core orb
      const coreGrad = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, 0, cx, cy, r);
      coreGrad.addColorStop(0, 'rgba(167, 139, 250, 0.95)');
      coreGrad.addColorStop(0.4, 'rgba(139, 92, 246, 0.7)');
      coreGrad.addColorStop(0.8, 'rgba(79, 70, 229, 0.4)');
      coreGrad.addColorStop(1, 'rgba(30, 20, 60, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Inner highlight
      const hlGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx - r * 0.3, cy - r * 0.3, r * 0.5);
      hlGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
      hlGrad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = hlGrad;
      ctx.fill();

      // Floating particles
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + t * (i % 2 === 0 ? 0.3 : -0.2);
        const dist = r * (1.4 + 0.3 * Math.sin(t * 0.7 + i));
        const px = cx + Math.cos(angle) * dist;
        const py = cy + Math.sin(angle) * dist * 0.6;
        const size = 1 + Math.sin(t + i) * 0.5;
        const alpha = 0.3 + Math.sin(t * 0.8 + i) * 0.3;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0
          ? `rgba(6, 226, 255, ${alpha})`
          : i % 3 === 1
          ? `rgba(139, 92, 246, ${alpha})`
          : `rgba(244, 114, 182, ${alpha})`;
        ctx.fill();
      }

      t += 0.012;
      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
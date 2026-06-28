import { useEffect, useRef } from 'react';
import './Fireworks.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
  size: number;
}

const COLORS = ['#bf4e1e', '#e8964a', '#f3c969', '#d96c4a', '#ffd9a0', '#ffffff'];

/**
 * 인스타 스토리 느낌의 폭죽/콘페티 버스트.
 * 마운트 시 화면 곳곳에서 여러 번 터진 뒤 자동으로 사라진다.
 */
export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];

    const burst = (cx: number, cy: number) => {
      const count = 40 + Math.floor((cx / width) * 20);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (cy % 1);
        const speed = 2 + ((i * 37) % 100) / 25;
        const maxLife = 60 + ((i * 13) % 40);
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: COLORS[i % COLORS.length],
          life: 0,
          maxLife,
          size: 2 + ((i * 7) % 3),
        });
      }
    };

    // 여러 번에 걸쳐 터뜨리기
    const bursts = [
      { x: width * 0.5, y: height * 0.35, t: 0 },
      { x: width * 0.25, y: height * 0.28, t: 350 },
      { x: width * 0.75, y: height * 0.3, t: 650 },
      { x: width * 0.4, y: height * 0.22, t: 1000 },
      { x: width * 0.62, y: height * 0.42, t: 1300 },
    ];
    const timers = bursts.map((b) =>
      window.setTimeout(() => burst(b.x, b.y), b.t)
    );

    let rafId = 0;
    let finished = false;
    const lastBurstTime = bursts[bursts.length - 1].t;
    const startTime = performance.now();

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.vy += 0.04; // 중력
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        if (alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const elapsed = performance.now() - startTime;
      if (particles.length === 0 && elapsed > lastBurstTime + 500) {
        finished = true;
        canvas.classList.add('fade-out');
        return;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      timers.forEach((t) => clearTimeout(t));
      if (!finished) cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fireworks-canvas" />;
}

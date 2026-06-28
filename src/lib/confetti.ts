// 의존성 없는 폭죽/콘페티 엔진. 화면 전체를 덮는 캔버스 1개를 재사용한다.
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

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let rafId = 0;
let dpr = 1;
let w = 0;
let h = 0;

function resize() {
  if (!canvas || !ctx) return;
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function ensureCanvas() {
  if (canvas) return;
  dpr = window.devicePixelRatio || 1;
  canvas = document.createElement('canvas');
  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:300;';
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  resize();
  window.addEventListener('resize', resize);
}

function loop() {
  if (!ctx) {
    rafId = 0;
    return;
  }
  ctx.clearRect(0, 0, w, h);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life++;
    p.vy += 0.05; // 중력
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
  rafId = particles.length > 0 ? requestAnimationFrame(loop) : 0;
}

/** 지정한 위치(화면 비율 0~1)에서 폭죽 한 번 터뜨리기 */
export function fireConfetti(originX = 0.5, originY = 0.4) {
  ensureCanvas();
  const cx = originX * w;
  const cy = originY * h;
  const count = 50;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
    const speed = 3 + Math.random() * 4;
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      color: COLORS[i % COLORS.length],
      life: 0,
      maxLife: 60 + Math.random() * 40,
      size: 2 + Math.random() * 3,
    });
  }
  if (!rafId) rafId = requestAnimationFrame(loop);
}

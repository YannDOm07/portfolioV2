import { useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════ */
interface Particle {
  // Current rendered position
  x: number;
  y: number;
  // Network-mode position (structured)
  netX: number;
  netY: number;
  // Free-mode origin (drifting)
  freeX: number;
  freeY: number;
  // Physics
  vx: number;
  vy: number;
  floatOffset: number;
  // Visual
  baseSize: number;
  color: string;
  colorRgb: [number, number, number];
  // Pulse (mouse proximity glow)
  pulsePhase: number;
}

/* ═══════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════ */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Parse hex like #00D4FF to [r,g,b] */
const hexToRgb = (hex: string): [number, number, number] => {
  const v = parseInt(hex.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
};

const CYAN = '#00D4FF';
const ORANGE = '#FF6B35';
const CYAN_RGB = hexToRgb(CYAN);
const ORANGE_RGB = hexToRgb(ORANGE);

/* ═══════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */
const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    particles: [] as Particle[],
    mouseX: -9999,
    mouseY: -9999,
    scrollProgress: 0,    // 0 = Hero fully visible, 1 = Hero scrolled away
    animationFrameId: 0,
    width: 0,
    height: 0,
    heroHeight: 0,
    time: 0,
  });

  /* ── Create particles ── */
  const initParticles = useCallback((w: number, h: number) => {
    const isMobile = w < 768;
    const count = isMobile ? 80 : 140;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const isCyan = Math.random() > 0.4;
      const color = isCyan ? CYAN : ORANGE;
      const colorRgb = isCyan ? CYAN_RGB : ORANGE_RGB;

      // Network position: spread across the full canvas with some clustering
      const netX = Math.random() * w;
      const netY = Math.random() * h;

      // Free-floating position: same initially, will drift
      const freeX = Math.random() * w;
      const freeY = Math.random() * h;

      particles.push({
        x: netX,
        y: netY,
        netX,
        netY,
        freeX,
        freeY,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        floatOffset: Math.random() * Math.PI * 2,
        baseSize: Math.random() * 1.8 + 1,
        color,
        colorRgb,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    return particles;
  }, []);

  /* ── Main animation loop ── */
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const s = stateRef.current;
    s.time += 0.016; // ~60fps time step

    const { particles, mouseX, mouseY, width, height } = s;

    // Calculate scroll progress (0 → 1)
    const heroEl = document.getElementById('home');
    if (heroEl) {
      s.heroHeight = heroEl.offsetHeight;
    }
    // Use 1.8x hero height so the transition unfolds slowly over more scroll distance
    const rawProgress = s.heroHeight > 0 ? window.scrollY / (s.heroHeight * 1.8) : 0;
    // Smooth clamp to [0, 1]
    s.scrollProgress = Math.min(1, Math.max(0, rawProgress));

    const sp = s.scrollProgress;
    // Eased scroll progress for smooth transitions
    const easedSP = easeInOutCubic(sp);

    // Phase calculations — spread over the full [0, 1] range for a slow, cinematic transition
    // Phase 1: connections fade (sp 0 → 0.6)
    const connectionAlpha = Math.max(0, 1 - sp / 0.6);
    // Phase 2: nodes start dispersing (sp 0.3 → 0.9)
    const disperseT = easeInOutCubic(Math.min(1, Math.max(0, (sp - 0.3) / 0.6)));
    // Phase 3: fully free particles (sp > 0.9)

    // Connection distance shrinks as we scroll
    const maxConnectionDist = lerp(160, 0, Math.min(1, sp / 0.65));
    const mouseInfluenceRadius = lerp(200, 120, easedSP);

    // Clear
    ctx.clearRect(0, 0, width, height);

    /* ── Update particle positions ── */
    for (const p of particles) {
      // Update free-floating origin (always drifting) — slow & calm
      p.floatOffset += 0.005;
      p.freeX += p.vx + Math.sin(p.floatOffset) * 0.06;
      p.freeY += p.vy + Math.cos(p.floatOffset * 0.7) * 0.06;

      // Wrap around edges
      if (p.freeX < -20) p.freeX = width + 20;
      if (p.freeX > width + 20) p.freeX = -20;
      if (p.freeY < -20) p.freeY = height + 20;
      if (p.freeY > height + 20) p.freeY = -20;

      // Network nodes also float gently — very subtle breathing motion
      p.netX += Math.sin(p.floatOffset * 0.6 + p.pulsePhase) * 0.08;
      p.netY += Math.cos(p.floatOffset * 0.8 + p.pulsePhase) * 0.08;

      // Clamp network positions to canvas
      p.netX = Math.max(0, Math.min(width, p.netX));
      p.netY = Math.max(0, Math.min(height, p.netY));

      // Interpolate between network position and free position based on scroll
      let targetX = lerp(p.netX, p.freeX, disperseT);
      let targetY = lerp(p.netY, p.freeY, disperseT);

      // Mouse interaction
      const dx = mouseX - targetX;
      const dy = mouseY - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouseInfluenceRadius && dist > 0) {
        const force = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
        const dirX = dx / dist;
        const dirY = dy / dist;

        if (sp < 0.6) {
          // Network mode: attract slightly towards cursor (neural connection feel)
          const attractForce = force * 15;
          targetX += dirX * attractForce;
          targetY += dirY * attractForce;
        } else {
          // Free mode: scatter away from cursor
          const scatterForce = force * 40;
          targetX -= dirX * scatterForce;
          targetY -= dirY * scatterForce;
        }
      }

      // Smooth interpolation to target
      p.x += (targetX - p.x) * 0.08;
      p.y += (targetY - p.y) * 0.08;

      // Update pulse
      p.pulsePhase += 0.03;
    }

    /* ── Draw connections (network mode) ── */
    if (connectionAlpha > 0.01) {
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDist) {
            // Base opacity decreases with distance
            const distFade = 1 - dist / maxConnectionDist;
            let alpha = distFade * 0.25 * connectionAlpha;

            // Mouse proximity boost: connections near cursor glow brighter
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const mouseDx = mouseX - midX;
            const mouseDy = mouseY - midY;
            const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

            let glowBoost = 0;
            if (mouseDist < mouseInfluenceRadius) {
              glowBoost = (1 - mouseDist / mouseInfluenceRadius) * 0.5;
              alpha += glowBoost * connectionAlpha;
            }

            // Blend colors of the two connected nodes
            const r = Math.round((a.colorRgb[0] + b.colorRgb[0]) / 2);
            const g = Math.round((a.colorRgb[1] + b.colorRgb[1]) / 2);
            const bl = Math.round((a.colorRgb[2] + b.colorRgb[2]) / 2);

            // Pulse effect along connections near mouse
            if (glowBoost > 0.1) {
              const pulse = Math.sin(s.time * 3 - mouseDist * 0.02) * 0.5 + 0.5;
              alpha += pulse * 0.15 * glowBoost * connectionAlpha;
            }

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${r},${g},${bl},${Math.min(alpha, 0.6)})`;
            ctx.stroke();
          }
        }

        // Extra connections from nodes to mouse cursor (neural-network feel)
        if (sp < 0.5) {
          const dmx = mouseX - a.x;
          const dmy = mouseY - a.y;
          const distToMouse = Math.sqrt(dmx * dmx + dmy * dmy);

          if (distToMouse < mouseInfluenceRadius * 0.8 && distToMouse > 10) {
            const fade = 1 - distToMouse / (mouseInfluenceRadius * 0.8);
            const alpha = fade * 0.35 * connectionAlpha;
            const pulse = Math.sin(s.time * 4 - distToMouse * 0.03) * 0.3 + 0.7;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(${a.colorRgb[0]},${a.colorRgb[1]},${a.colorRgb[2]},${alpha * pulse})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.lineWidth = 1;
          }
        }
      }
    }

    /* ── Draw nodes (particles) ── */
    for (const p of particles) {
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Size modulation
      let size = p.baseSize;
      const sizeBoost = sp < 0.6
        ? (dist < mouseInfluenceRadius ? lerp(1, 2.2, 1 - dist / mouseInfluenceRadius) : 1)
        : (dist < 120 ? lerp(1, 1.5, 1 - dist / 120) : 1);
      size *= sizeBoost;

      // Opacity modulation
      let alpha = lerp(0.7, 0.4, easedSP);
      if (dist < mouseInfluenceRadius) {
        alpha = lerp(alpha, 1, (1 - dist / mouseInfluenceRadius) * 0.6);
      }

      // Outer glow in network mode
      if (sp < 0.7 && dist < mouseInfluenceRadius) {
        const glowAlpha = (1 - dist / mouseInfluenceRadius) * 0.15 * (1 - sp / 0.7);
        const glowSize = size * 4;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
        gradient.addColorStop(0, `rgba(${p.colorRgb[0]},${p.colorRgb[1]},${p.colorRgb[2]},${glowAlpha})`);
        gradient.addColorStop(1, `rgba(${p.colorRgb[0]},${p.colorRgb[1]},${p.colorRgb[2]},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    /* ── Mouse cursor node (in network mode) ── */
    if (sp < 0.55 && mouseX > -999 && mouseY > -999) {
      const cursorAlpha = Math.max(0, 1 - sp / 0.55) * 0.6;
      // Pulsing cursor node
      const pulse = Math.sin(s.time * 5) * 0.3 + 0.7;
      const cursorSize = 3 * pulse;

      // Glow
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 25);
      gradient.addColorStop(0, `rgba(0,212,255,${cursorAlpha * 0.3})`);
      gradient.addColorStop(1, 'rgba(0,212,255,0)');
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 25, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, cursorSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${cursorAlpha})`;
      ctx.fill();
    }

    s.animationFrameId = requestAnimationFrame(animate);
  }, []);

  /* ── Setup & cleanup ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const s = stateRef.current;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);

      s.width = w;
      s.height = h;
      s.particles = initParticles(w, h);
    };

    const onMouseMove = (e: MouseEvent) => {
      s.mouseX = e.clientX;
      s.mouseY = e.clientY;
    };

    const onMouseLeave = () => {
      s.mouseX = -9999;
      s.mouseY = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(s.animationFrameId);
    };
  }, [initParticles, animate]);

  return (
    <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default InteractiveBackground;

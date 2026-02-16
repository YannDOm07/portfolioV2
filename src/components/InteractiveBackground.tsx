import { useEffect, useRef } from 'react';

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { 
      x: number; 
      y: number; 
      originX: number; 
      originY: number; 
      size: number; 
      color: string;
      vx: number;
      vy: number;
      floatOffset: number;
    }[] = [];
    
    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 60 : 120; 
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.6 ? '#00D4FF' : '#FF6B35', // Electric Blue or Neon Orange
          vx: (Math.random() - 0.5) * 0.2, // Slow horizontal drift
          vy: (Math.random() - 0.5) * 0.2, // Slow vertical drift
          floatOffset: Math.random() * 100 // Randomized starting phase for sine wave
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // --- 1. Natural Floating Motion (Leaf-like) ---
        particle.floatOffset += 0.02;
        // Apply gentle sine wave motion + drift
        particle.originX += particle.vx + Math.sin(particle.floatOffset) * 0.1;
        particle.originY += particle.vy + Math.cos(particle.floatOffset) * 0.1;

        // Wrap around screen edges
        if (particle.originX < 0) particle.originX = canvas.width;
        if (particle.originX > canvas.width) particle.originX = 0;
        if (particle.originY < 0) particle.originY = canvas.height;
        if (particle.originY > canvas.height) particle.originY = 0;

        // --- 2. Mouse Interaction ---
        const dx = mouseX - particle.originX;
        const dy = mouseY - particle.originY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDistance = 120; // Radius of influence
        
        let targetX = particle.originX;
        let targetY = particle.originY;
        let targetSize = particle.size;

        if (distance < forceDistance) {
            // "Scattering" effect - particles move away slightly and grow
            const force = (forceDistance - distance) / forceDistance;
            const directionX = dx / distance;
            const directionY = dy / distance;
            
            const moveForce = 40; // Max pixels to move away
            
            targetX -= directionX * force * moveForce;
            targetY -= directionY * force * moveForce;
            targetSize = particle.size * 1.5; // Grow when close
        }

        // Smoothly interpolate current position to target
        particle.x += (targetX - particle.x) * 0.1;
        particle.y += (targetY - particle.y) * 0.1;

        // Draw particle
        ctx.beginPath();
        // Use current interpolated 'particle.x/y' but draw with potentially enlarged size if hovered (simulated by re-calculating or storing currentSize - simplistic text keeps it fixed mostly, let's keep it simple)
        // Actually, let's animate size too if needed, but keeping it simple is often better for perf.
        
        ctx.arc(particle.x, particle.y, distance < forceDistance ? targetSize : particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        // Higher opacity near mouse, lower normally
        ctx.globalAlpha = distance < forceDistance ? 0.8 : 0.4; 
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      // Background is fixed, so clientX/Y map directly to canvas if it's fullscreen
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', onMouseMove);

    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default InteractiveBackground;

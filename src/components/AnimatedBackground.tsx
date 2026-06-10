import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size to the parent section (e.g. the hero), not the viewport — the hero is
    // taller than one screen, so a viewport-sized canvas would stop partway down.
    const parent = canvas.parentElement;
    const sizeToParent = () => {
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    sizeToParent();

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    const colors = [
      "rgba(59, 130, 246, 0.5)", // electric blue
      "rgba(96, 165, 250, 0.5)", // soft blue glow
      "rgba(6, 182, 212, 0.5)", // cyan teal
    ];

    // Scale particle count to the area so the taller hero doesn't look sparse.
    const count = Math.max(50, Math.min(110, Math.round((canvas.width * canvas.height) / 22000)));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let rafId = 0;
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle, j) => {
          if (i === j) return;
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    // Re-fit when the viewport changes and when the hero section itself grows
    // (e.g. once the demo mockup/iframe loads and pushes the section taller).
    window.addEventListener("resize", sizeToParent);
    const ro =
      parent && "ResizeObserver" in window
        ? new ResizeObserver(sizeToParent)
        : null;
    if (parent && ro) ro.observe(parent);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", sizeToParent);
      ro?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
};

export default AnimatedBackground;

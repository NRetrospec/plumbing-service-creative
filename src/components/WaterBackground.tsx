import { useEffect, useRef } from 'react';

export default function WaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Bubble {
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;
      wobble: number;
      wobbleSpeed: number;
    }

    const bubbles: Bubble[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      radius: Math.random() * 4 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.3 + 0.1,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      // Draw flowing wave lines
      for (let w = 0; w < 5; w++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.03 + w * 0.01})`;
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 2) {
          const y = canvas.height * (0.3 + w * 0.12) +
            Math.sin(x * 0.003 + time + w) * 40 +
            Math.sin(x * 0.007 + time * 1.5 + w * 2) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Animate bubbles
      bubbles.forEach((bubble) => {
        bubble.y -= bubble.speed;
        bubble.wobble += bubble.wobbleSpeed;
        const xOffset = Math.sin(bubble.wobble) * 2;

        ctx.beginPath();
        ctx.arc(bubble.x + xOffset, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${bubble.opacity})`;
        ctx.fill();

        // Highlight on bubble
        ctx.beginPath();
        ctx.arc(
          bubble.x + xOffset - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          bubble.radius * 0.3,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.5})`;
        ctx.fill();

        if (bubble.y < -20) {
          bubble.y = canvas.height + 20;
          bubble.x = Math.random() * canvas.width;
        }
      });

      // Ambient glow spots
      const glowX = canvas.width * 0.3 + Math.sin(time) * 100;
      const glowY = canvas.height * 0.5 + Math.cos(time * 0.7) * 80;
      const gradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 300);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.03)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const glowX2 = canvas.width * 0.7 + Math.cos(time * 0.8) * 120;
      const glowY2 = canvas.height * 0.4 + Math.sin(time * 0.6) * 60;
      const gradient2 = ctx.createRadialGradient(glowX2, glowY2, 0, glowX2, glowY2, 250);
      gradient2.addColorStop(0, 'rgba(45, 212, 191, 0.02)');
      gradient2.addColorStop(1, 'rgba(45, 212, 191, 0)');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

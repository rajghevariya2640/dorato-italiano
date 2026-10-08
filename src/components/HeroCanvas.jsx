/**
 * HeroCanvas.jsx — Interactive Canvas Hero Background
 * Renders floating organic warm amber/ember particles that respond to mouse movement.
 */
import { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Setup
    const particleCount = Math.min(window.innerWidth < 768 ? 45 : 85, 100);
    const particles = [];

    const mouse = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 180,
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Color palette for embers & golden flour dust
    const colors = [
      'rgba(255, 206, 153, ', // Peach #FFCE99
      'rgba(255, 150, 68, ',  // Bright Orange #FF9644
      'rgba(232, 122, 24, ',  // Honey Orange #E87A18
      'rgba(217, 119, 6, ',   // Warm Amber #D97706
    ];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3.5 + 1;
        this.baseSize = this.size;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = -(Math.random() * 0.8 + 0.3); // Upward float like embers
        this.alpha = Math.random() * 0.6 + 0.2;
        this.baseAlpha = this.alpha;
        this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        this.pulse = Math.random() * 0.05;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        // Floating motion
        this.angle += 0.02;
        this.x += this.vx + Math.sin(this.angle) * 0.3;
        this.y += this.vy;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
          this.size = this.baseSize + force * 2.5;
          this.alpha = Math.min(0.9, this.baseAlpha + force * 0.4);
        } else {
          this.size = this.baseSize;
          this.alpha = this.baseAlpha;
        }

        // Respawn when floating out of top
        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.colorPrefix}${this.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#FF9644';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle warm gradient overlay
      const radialGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 3, 50,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      radialGradient.addColorStop(0, 'rgba(255, 206, 153, 0.08)');
      radialGradient.addColorStop(0.5, 'rgba(255, 150, 68, 0.03)');
      radialGradient.addColorStop(1, 'rgba(86, 47, 0, 0)');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}

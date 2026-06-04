import { useEffect, useRef } from "react";

interface SpaceBackgroundProps {
  className?: string;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  direction: number;
}

export default function SpaceBackground({ className }: SpaceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    let stars: Star[] = [];
    let rafId: number | null = null;
    let isMounted = true;

    const createStars = () => {
      stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.5 + Math.random() * 1.2,
        alpha: 0.2 + Math.random() * 0.8,
        speed: 0.15 + Math.random() * 0.35,
        direction: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars();
    };

    const drawBackground = () => {
      const gradient = ctx.createRadialGradient(
        width * 0.2,
        height * 0.2,
        0,
        width * 0.2,
        height * 0.2,
        width * 0.65,
      );
      gradient.addColorStop(0, "rgba(15, 23, 42, 0.85)");
      gradient.addColorStop(0.45, "rgba(15, 23, 42, 0.7)");
      gradient.addColorStop(1, "rgba(15, 23, 42, 0.92)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(147, 197, 253, 0.12)";
      ctx.beginPath();
      ctx.arc(width * 0.8, height * 0.25, width * 0.16, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(width * 0.15, height * 0.75, width * 0.14, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawStars = () => {
      stars.forEach((star) => {
        star.x += Math.cos(star.direction) * star.speed;
        star.y += Math.sin(star.direction) * star.speed;
        star.direction += (Math.random() - 0.5) * 0.002;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.beginPath();
        ctx.fillStyle = `rgba(203, 213, 225, ${star.alpha})`;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawZigzag = () => {
      ctx.strokeStyle = "rgba(96, 165, 250, 0.18)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      const step = width / 18;
      let x = 0;
      let y = height * 0.55;
      ctx.moveTo(x, y);
      let toggle = true;

      while (x <= width) {
        y += toggle ? -20 : 20;
        x += step;
        ctx.lineTo(x, y);
        toggle = !toggle;
      }

      ctx.stroke();
    };

    const render = () => {
      if (!isMounted) return;
      ctx.clearRect(0, 0, width, height);
      drawBackground();
      drawStars();
      drawZigzag();
      rafId = window.requestAnimationFrame(render);
      animationRef.current = rafId;
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      isMounted = false;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={className} style={{ pointerEvents: "none" }}>
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  );
}

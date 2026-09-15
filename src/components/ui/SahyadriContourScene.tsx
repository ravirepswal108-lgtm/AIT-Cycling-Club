import React, { useEffect, useRef } from 'react';

interface SahyadriContourSceneProps {
  className?: string;
}

export const SahyadriContourScene: React.FC<SahyadriContourSceneProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Render Sahyadri topographical elevation wireframes
    const render = () => {
      time += 0.008;
      // Smooth lerp mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Subtle atmospheric vignette
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 50,
        width / 2, height / 2, Math.max(width, height) * 0.75
      );
      gradient.addColorStop(0, 'rgba(17, 26, 19, 0.45)');
      gradient.addColorStop(1, 'rgba(10, 15, 11, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw undulating elevation contours
      const numLines = 24;
      const step = height / (numLines * 0.9);

      for (let i = 0; i < numLines; i++) {
        const yBase = i * step + height * 0.15;
        const progress = i / numLines;
        
        ctx.beginPath();
        
        // Dynamic colors transitioning from deep moss to glowing lime and warm amber
        // STRICTLY ZERO BLUE
        if (i % 4 === 0) {
          ctx.strokeStyle = `rgba(217, 119, 6, ${0.15 + progress * 0.25})`; // Amber contour
          ctx.lineWidth = 1.6;
        } else {
          ctx.strokeStyle = `rgba(132, 204, 22, ${0.08 + progress * 0.22})`; // Lime moss contour
          ctx.lineWidth = 1.1;
        }

        for (let x = 0; x <= width; x += 15) {
          // Topography wave synthesis
          const xFactor = x / width;
          const distToMouse = Math.hypot(x - mouseX, yBase - mouseY);
          const mouseInfluence = Math.max(0, 1 - distToMouse / 380) * 35;
          
          // Mountain peaks (Sinhagad & Dighi ridges)
          const peak1 = Math.sin(xFactor * 6 + time + progress * 3) * 22;
          const peak2 = Math.cos(xFactor * 11 - time * 0.8) * 12;
          const peak3 = Math.sin(xFactor * 3.5 + progress * 5) * 35;
          
          const yOffset = peak1 + peak2 + peak3 - mouseInfluence;
          const y = yBase + yOffset;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.85 }}
    />
  );
};

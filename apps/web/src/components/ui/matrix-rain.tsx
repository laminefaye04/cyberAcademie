"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const GLYPHS = ["ア","カ","サ","タ","ナ","ハ","マ","ヤ","ラ","ワ","0","1","Z","9","$","#","%","&","=","+","<",">"];

export function MatrixRain({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const font = 14;
    let cols = 0;
    let drops: number[] = [];
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(canvas.clientWidth / font);
      drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -60));
    };
    resize();
    window.addEventListener("resize", resize);
    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.fillStyle = "rgba(6,18,30,0.09)";
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.font = `${font}px "JetBrains Mono", monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * font;
        const y = drops[i] * font;
        ctx.fillStyle = Math.random() > 0.985 ? "#4FD1C5" : "#16A085";
        ctx.fillText(ch, x, y);
        if (y > canvas.clientHeight && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}

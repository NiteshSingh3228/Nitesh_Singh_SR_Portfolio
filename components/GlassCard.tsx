"use client";

import React, { useRef, useState } from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function GlassCard({ children, className = "", as: Component = "div", ...props }: GlassCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 8;
    const rotateY = (x / rect.width) * 8;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`);
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  return (
    <Component
      ref={cardRef}
      className={`card-glass ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: transform ? 'none' : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
      {...props}
    >
      {children}
    </Component>
  );
}

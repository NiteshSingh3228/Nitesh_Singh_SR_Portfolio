'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scrolling while loading
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    });

    // 1. Initial State (Fade in spinner if needed, but it's already visible via CSS)
    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set(spinnerRef.current, { scale: 0.8, opacity: 0 });

    // 2. Pop in the spinner
    tl.to(spinnerRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out(1.7)',
    });

    // 3. Wait for "loading" (e.g. 1.5 seconds)
    tl.to({}, { duration: 1.5 });

    // 4. Fade out everything (Glassmorphism reveal)
    tl.to(spinnerRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
    })
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
    }, '-=0.2');

    return () => {
      tl.kill();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/40 backdrop-blur-2xl"
    >
      {/* Glassmorphism Spinner Container */}
      <div 
        ref={spinnerRef}
        className="flex flex-col items-center justify-center p-8 rounded-full bg-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/40 backdrop-blur-md"
      >
        {/* Loading Circle */}
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

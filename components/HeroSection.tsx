"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { GlassCard } from "./GlassCard";
import { profile } from "@/lib/portfolio-data";

export function HeroSection() {
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        const scrollTop = window.scrollY;
        if (badge1Ref.current) {
          badge1Ref.current.style.transform = `translateY(${scrollTop * 0.04}px) rotate(${scrollTop * 0.01}deg)`;
        }
        if (badge2Ref.current) {
          badge2Ref.current.style.transform = `translateY(${-scrollTop * 0.03}px) rotate(${-scrollTop * -0.01}deg)`;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-6 sm:pt-10 pb-16 w-full" id="hero">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Hero Left Column */}
        <div className="lg:col-span-7 flex flex-col items-start pt-2">
          {/* Availability Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-white/90 text-[12px] font-medium text-[#7C6FE8] shadow-sm mb-5">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M18.66 5.34l1.41-1.41"/>
            </svg>
            <span>Available for new orbits & collaborations</span>
          </div>

          {/* Eyebrow */}
          <div className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#E25B38] mb-3">
            DATA ANALYTICS & MACHINE LEARNING
          </div>

          {/* Display Name */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-ink tracking-tight leading-[1.05] mb-5">
            Nitesh Singh
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-muted text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-normal">
            Computer Science undergraduate with hands-on experience in
            full-stack ML systems, predictive modeling, and data visualization.
            Currently building applied analytics skills to solve real-world
            business problems.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-6">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#121217] text-white text-xs sm:text-sm font-semibold hover:bg-neutral-800 transition-all hover:scale-[1.02] shadow-sm"
            >
              <span>Explore my work</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
              </svg>
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/70 border border-white/90 text-ink text-xs sm:text-sm font-semibold hover:bg-white transition-all shadow-sm"
            >
              <span>Get in touch</span>
            </Link>
            {/* Resume download button */}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/70 border border-white/90 text-ink text-xs sm:text-sm font-semibold hover:bg-white transition-all shadow-sm group"
            >
              <svg
                className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Resume</span>
            </a>
          </div>

          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 border border-white text-xs font-medium text-muted">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Gurugram, India</span>
          </div>
        </div>

        {/* Hero Right Column: User Portrait & Floating Glass Badges */}
        <div className="lg:col-span-5 relative flex justify-center items-center py-4">
          <div className="relative p-2.5 rounded-[38px] bg-white/40 border border-white/80 backdrop-blur-xl shadow-glass">
            <div className="w-[280px] sm:w-[320px] h-[370px] sm:h-[410px] overflow-hidden rounded-[32px] relative bg-gradient-to-b from-purple-100 to-indigo-50">
              <img
                alt="Nitesh Singh"
                className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
                src="/portrait.png"
              />
            </div>

            {/* Floating Glass Badge: Upper Right (CGPA / Academics) */}
            <div
              ref={badge1Ref}
              className="absolute -top-3 -right-3 sm:-right-5 card-glass rounded-2xl p-3 sm:p-4 shadow-glass float-slow flex items-center gap-3 z-20 border border-white/90"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accentStart to-accentEnd flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-sm">
                8.09
              </div>
              <div>
                <div className="text-xs sm:text-sm font-extrabold text-ink leading-tight">
                  CGPA B.Tech
                </div>
                <div className="text-[11px] text-muted font-medium">
                  Computer Science
                </div>
              </div>
            </div>

            {/* Floating Glass Badge: Lower Right (Data impact) */}
            <div
              ref={badge2Ref}
              className="absolute -bottom-5 -right-3 sm:-right-5 card-glass rounded-2xl p-3.5 sm:p-4 shadow-glass float-slow-delayed z-20 max-w-[200px] border border-white/90"
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
                  DATA IMPACT
                </span>
                <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  +120%
                </span>
              </div>
              <div className="text-base sm:text-lg font-black text-ink leading-tight">
                260k+ Rows
              </div>
              <div className="text-[10px] sm:text-[11px] text-muted font-medium mb-1">
                Processed & Modeled
              </div>
              {/* Mini Sparkline */}
              <svg className="w-full h-5 text-accentStart" fill="none" viewBox="0 0 100 25">
                <path
                  d="M0 20 Q 25 18, 40 10 T 70 12 T 100 3"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                ></path>
                <path
                  d="M0 20 Q 25 18, 40 10 T 70 12 T 100 3 L 100 25 L 0 25 Z"
                  fill="#7C6FE8"
                  opacity="0.15"
                ></path>
              </svg>
            </div>

            {/* Floating Status Pill: Lower Left */}
            <div className="absolute -bottom-3 -left-3 card-glass rounded-full px-3 py-1.5 shadow-glass flex items-center gap-2 z-20 border border-white/90">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[11px] font-semibold text-ink">
                Ready for Collabs
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

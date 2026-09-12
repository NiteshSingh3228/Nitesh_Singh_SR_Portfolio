"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { profile } from "@/lib/portfolio-data";

const SOCIAL_LINKS = profile.socials;

const navItems = [
  { id: "hero", num: "00", label: "Top & Intro" },
  { id: "about", num: "01", label: "About" },
  { id: "skills", num: "02", label: "Skills" },
  { id: "projects", num: "03", label: "Projects" },
  { id: "experience", num: "04", label: "Experience" },
  { id: "education", num: "05", label: "Education" },
  { id: "certifications", num: "06", label: "Certifications" },
  { id: "achievements", num: "07", label: "Achievements" },
  { id: "activity", num: "08", label: "Activity" },
  { id: "contact", num: "09", label: "Contact" },
];

export function NavigationDock() {
  const [activeId, setActiveId] = useState("hero");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fuse track progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const newProgress = Math.min(Math.max(scrollTop / (docHeight || 1), 0), 1);
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Intersection Observer for Active Navigation
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.getAttribute("id") || "");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => sectionObserver.unobserve(section));
    };
  }, []);

  return (
    <aside className="w-full lg:w-[280px] xl:w-[310px] lg:shrink-0 lg:sticky lg:top-0 lg:h-screen z-50 p-3 sm:p-4 lg:p-6 lg:pr-2 flex flex-col justify-between">
      <div className="nav-dock-glass relative rounded-3xl lg:rounded-[32px] p-4 lg:p-5 flex flex-col h-full overflow-hidden">
        {/* Glowing Fuse Line (Rail) along the right edge of vertical dock */}
        <div className="hidden lg:block fuse-rail">
          <div
            className="fuse-track"
            style={{ height: `${progress * 100}%` }}
          >
            <div
              className="fuse-head"
              style={{ top: `${progress * 100}%`, opacity: progress > 0.01 ? 1 : 0 }}
            ></div>
          </div>
        </div>

        {/* Top Brand Identity */}
        <div className="flex items-center justify-between lg:justify-start gap-3 pb-4 border-b border-white/70">
          <Link href="#hero" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-[#E25B38] text-white flex items-center justify-center font-bold text-xs shadow-md tracking-tight group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
              Ni
            </div>
            <div>
              <span className="font-bold text-[15px] leading-tight text-ink tracking-tight block">
                Nitesh Singh
              </span>
              <span className="text-[10px] font-medium text-muted block tracking-tight">
                Data Analytics & ML
              </span>
            </div>
          </Link>

          {/* Mobile Contact CTA Pill */}
          <Link
            href="#contact"
            className="lg:hidden inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#121217] text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-sm"
          >
            <span>Contact</span>
          </Link>
        </div>

        {/* Middle: Navigation Links */}
        <div className="my-auto py-3 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden no-scrollbar">
          <nav className="flex lg:flex-col gap-1.5 min-w-max lg:min-w-0 text-xs">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-link flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted hover:text-ink hover:bg-white/60 transition-all border border-transparent ${
                    isActive ? "active" : ""
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-muted2 nav-dot transition-all"></span>
                  <span className="font-mono text-[11px] nav-num text-muted2">
                    {item.num}
                  </span>
                  <span className="font-semibold truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Social Links & Pill CTA (Desktop) */}
        <div className="pt-3 border-t border-white/70 hidden lg:flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-muted">
              <a
                className="w-7 h-7 rounded-full bg-white/70 hover:bg-[#121217] hover:text-white flex items-center justify-center text-ink transition-all shadow-xs"
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                title="GitHub"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"></path>
                </svg>
              </a>
              <a
                className="w-7 h-7 rounded-full bg-white/70 hover:bg-[#0A66C2] hover:text-white flex items-center justify-center text-ink transition-all shadow-xs"
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z"></path>
                </svg>
              </a>
              <a
                className="w-7 h-7 rounded-full bg-white/70 hover:bg-rose-500 hover:text-white flex items-center justify-center text-ink transition-all shadow-xs"
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                title="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"></path>
                </svg>
              </a>
              <a
                className="w-7 h-7 rounded-full bg-white/70 hover:bg-[#7C6FE8] hover:text-white flex items-center justify-center text-ink transition-all shadow-xs"
                href={SOCIAL_LINKS.upwork || SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                title="Portfolio code"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </a>
            </div>
            <span className="text-[10px] font-mono text-muted2">v2.4</span>
          </div>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            download
            className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-2xl bg-white/80 border border-white text-ink text-xs font-semibold hover:bg-white transition-all shadow-xs group mb-2"
          >
            <svg className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Resume</span>
          </a>
          <Link
            href="#contact"
            className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-2xl bg-[#121217] text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-sm group"
          >
            <span>Transmit message</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
}

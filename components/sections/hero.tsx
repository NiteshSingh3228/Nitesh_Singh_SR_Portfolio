'use client'

import { profile } from '@/lib/portfolio-data'
import { ArrowUpRight, MapPin, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center px-4 pt-24 overflow-hidden"
    >
      
      <div className="mx-auto max-w-4xl text-center z-40 relative pointer-events-none transform-gpu">
        <div className="mb-6 inline-flex animate-float-slow items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-foreground pointer-events-auto border border-primary/20 bg-primary/5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Available for new orbits &amp; collaborations
        </div>

        <p className="mb-4 font-mono text-sm uppercase tracking-[0.35em] text-primary">
          {profile.role}
        </p>

        <h1 className="font-display text-6xl font-bold leading-[0.95] tracking-tight text-balance sm:text-7xl md:text-8xl">
          <span className="cosmic-gradient-text">{profile.name}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {profile.tagline}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-6px_var(--neon-blue)] transition-all hover-neon-glow"
          >
            Explore my work
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/10 hover-neon-glow"
          >
            Get in touch
          </a>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {profile.location}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="h-2 w-1 animate-twinkle rounded-full bg-primary" />
        </div>
      </div>
    </section>
  )
}

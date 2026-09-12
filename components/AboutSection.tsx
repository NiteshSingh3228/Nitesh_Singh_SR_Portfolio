import React from "react";
import { GlassCard } from "./GlassCard";

export function AboutSection() {
  return (
    <section className="py-14 w-full" id="about">
      <div className="eyebrow-tag mb-2">01 —— ABOUT</div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-8">
        A signal across disciplines
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Paragraph Card */}
        <GlassCard className="lg:col-span-6 rounded-3xl p-7 sm:p-9 flex flex-col justify-between shadow-glass-card">
          <div>
            <p className="text-muted leading-relaxed text-base sm:text-lg mb-6 font-normal">
              I am a Computer Science undergraduate (CGPA 8.09/10) passionate
              about turning data into actionable insights.
            </p>
            <p className="text-muted leading-relaxed text-base sm:text-lg font-normal">
              With hands-on experience delivering full-stack ML systems like an
              earthquake damage predictor and a CV-based road defect detector, I
              care deeply about bridging the gap between complex algorithms and
              real-world impact.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-white/60 flex items-center gap-2 text-xs font-semibold text-[#7C6FE8]">
            <span>Curious, iterative, impact-driven.</span>
          </div>
        </GlassCard>

        {/* Right 4 Stat Cards */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Stat 1 */}
          <GlassCard className="rounded-3xl p-6 sm:p-7 flex flex-col justify-center shadow-glass-card">
            <div className="text-4xl sm:text-5xl font-black text-ink tracking-tight mb-2">
              2
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted">
              ML SYSTEMS SHIPPED
            </div>
          </GlassCard>

          {/* Stat 2 */}
          <GlassCard className="rounded-3xl p-6 sm:p-7 flex flex-col justify-center shadow-glass-card">
            <div className="text-4xl sm:text-5xl font-black text-ink tracking-tight mb-2">
              260k+
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted">
              DATA POINTS PROCESSED
            </div>
          </GlassCard>

          {/* Stat 3 */}
          <GlassCard className="rounded-3xl p-6 sm:p-7 flex flex-col justify-center shadow-glass-card">
            <div className="text-4xl sm:text-5xl font-black text-ink tracking-tight mb-2">
              3
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted">
              HACKATHONS
            </div>
          </GlassCard>

          {/* Stat 4 */}
          <GlassCard className="rounded-3xl p-6 sm:p-7 flex flex-col justify-center shadow-glass-card">
            <div className="text-4xl sm:text-5xl font-black text-ink tracking-tight mb-2">
              8.09
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted">
              CGPA
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

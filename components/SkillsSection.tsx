import React from "react";
import { GlassCard } from "./GlassCard";

export function SkillsSection() {
  return (
    <section className="py-14 w-full" id="skills">
      <div className="eyebrow-tag mb-2">02 —— SKILLS</div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-3">
        Tools in my constellation
      </h2>
      <p className="text-muted text-base max-w-2xl mb-8 font-normal">
        A stack that spans product engineering, machine learning, and design —
        chosen to move fast without breaking craft.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category 1: Programming Languages */}
        <GlassCard className="rounded-3xl p-7 shadow-glass-card">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E25B38]"></span>
            <h3 className="font-bold text-sm tracking-wide text-ink">
              Programming Languages
            </h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <span className="px-4 py-2 rounded-xl bg-white/70 border border-white text-xs font-semibold text-ink shadow-sm">
              Python
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/70 border border-white text-xs font-semibold text-ink shadow-sm">
              Java
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/70 border border-white text-xs font-semibold text-ink shadow-sm">
              HTML
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/70 border border-white text-xs font-semibold text-ink shadow-sm">
              SQL (MySQL)
            </span>
          </div>
        </GlassCard>

        {/* Category 2: Data & ML Libraries */}
        <GlassCard className="rounded-3xl p-7 shadow-glass-card">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7C6FE8]"></span>
            <h3 className="font-bold text-sm tracking-wide text-ink">
              Data & ML Libraries
            </h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <span className="px-4 py-2 rounded-xl bg-white/70 border border-white text-xs font-semibold text-ink shadow-sm">
              NumPy
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/70 border border-white text-xs font-semibold text-ink shadow-sm">
              Pandas
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/70 border border-white text-xs font-semibold text-ink shadow-sm">
              Scikit-learn
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/70 border border-white text-xs font-semibold text-ink shadow-sm">
              Matplotlib
            </span>
          </div>
        </GlassCard>

        {/* Category 3: Analytics & BI Tools */}
        <GlassCard className="rounded-3xl p-7 shadow-glass-card">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5B8DEF]"></span>
            <h3 className="font-bold text-sm tracking-wide text-ink">
              Analytics & BI Tools
            </h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <span className="px-4 py-2 rounded-xl bg-white/70 border border-white text-xs font-semibold text-ink shadow-sm">
              Excel
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/70 border border-white text-xs font-semibold text-ink shadow-sm">
              Power BI
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/70 border border-white text-xs font-semibold text-ink shadow-sm">
              Tableau
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/70 border border-white text-xs font-semibold text-ink shadow-sm">
              Jupyter Notebook
            </span>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

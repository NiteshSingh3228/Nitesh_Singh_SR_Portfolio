import React from "react";
import { GlassCard } from "./GlassCard";
import { education } from "@/lib/portfolio-data";

// Mortarboard/graduation cap SVG (replaces 🎓)
function GraduationCapIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

const ACCENT = ["text-[#7C6FE8] bg-purple-50", "text-[#5B8DEF] bg-blue-50"];
const DATE_COLOR = ["text-[#7C6FE8]", "text-[#5B8DEF]"];

export function EducationSection() {
  return (
    <section className="py-14 w-full" id="education">
      <div className="eyebrow-tag mb-2">05 —— EDUCATION</div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-8">
        Where I calibrated
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu, i) => (
          <GlassCard
            key={edu.degree}
            className="rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-glass-card"
          >
            <div>
              <div className={`w-10 h-10 rounded-2xl ${ACCENT[i % ACCENT.length]} flex items-center justify-center mb-4`}>
                <GraduationCapIcon className="w-5 h-5" />
              </div>
              <div className={`text-[11px] font-bold ${DATE_COLOR[i % DATE_COLOR.length]} uppercase tracking-wider mb-2`}>
                {edu.period.toUpperCase()}
              </div>
              <h3 className="text-xl font-bold text-ink mb-1">{edu.degree}</h3>
              <div className="text-sm font-semibold text-muted mb-4">{edu.school}</div>
              <p className="text-xs sm:text-sm text-muted leading-relaxed font-normal">
                {edu.detail}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

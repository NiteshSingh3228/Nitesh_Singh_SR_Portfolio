import React from "react";
import { GlassCard } from "./GlassCard";
import { experiences } from "@/lib/portfolio-data";

export function ExperienceSection() {
  return (
    <section className="py-14 w-full" id="experience">
      <div className="eyebrow-tag mb-2">04 —— EXPERIENCE</div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-12">
        Experience & Trajectory
      </h2>

      <div className="relative max-w-3xl">
        {/* Central Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-purple-300 via-indigo-200 to-transparent -translate-x-1/2"></div>

        {experiences.map((exp, i) => {
          const dotColors = ["border-[#7C6FE8]", "border-[#5B8DEF]", "border-[#E25B38]", "border-teal-400"];
          const dateColors = ["text-[#7C6FE8]", "text-[#5B8DEF]", "text-[#E25B38]", "text-teal-600"];
          const align = i % 2 === 0 ? "left" : "right";
          const dotColor = dotColors[i % dotColors.length];
          const dateColor = dateColors[i % dateColors.length];

          return (
            <div key={i} className="relative mb-12 pl-12 md:pl-0">
              <div className={`absolute left-4 md:left-1/2 top-6 w-4 h-4 rounded-full bg-white border-4 ${dotColor} -translate-x-1/2 z-20 shadow-sm`}></div>
              <div className="md:grid md:grid-cols-2 md:gap-10 items-start">
                {align === "right" && <div className="hidden md:block"></div>}
                <GlassCard className={`rounded-3xl p-6 sm:p-7 shadow-glass-card ${align === "right" ? "md:col-start-2" : "md:col-start-1"}`}>
                  <div className={`text-[11px] font-bold ${dateColor} uppercase tracking-wider mb-2`}>
                    {exp.period.toUpperCase()}
                  </div>
                  <h3 className="text-xl font-bold text-ink">{exp.role}</h3>
                  <div className="text-xs font-semibold text-muted mb-3">{exp.company}</div>
                  <p className="text-muted text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/70 text-[11px] font-medium text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-white/60">
                    {exp.certificate && exp.certificate !== "#" && (
                      <a
                        href={exp.certificate}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 rounded-full bg-white/80 border border-white text-[11px] font-semibold text-ink shadow-xs hover:bg-white transition-all"
                      >
                        Certificate ↗
                      </a>
                    )}
                    {exp.certificate === "#" && (
                      <span className="px-3 py-1 rounded-full bg-white/50 border border-white/60 text-[11px] font-semibold text-muted cursor-not-allowed">
                        Certificate (Coming Soon)
                      </span>
                    )}
                    {exp.offerLetter && (
                      <a
                        href={exp.offerLetter}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 rounded-full bg-white/80 border border-white text-[11px] font-semibold text-ink shadow-xs hover:bg-white transition-all"
                      >
                        Offer Letter ↗
                      </a>
                    )}
                    {exp.project && (
                      <a
                        href={exp.project}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 rounded-full bg-white/80 border border-white text-[11px] font-semibold text-ink shadow-xs hover:bg-white transition-all"
                      >
                        Project Link ↗
                      </a>
                    )}
                  </div>
                </GlassCard>
                {align === "left" && <div className="hidden md:block"></div>}
              </div>
            </div>
          );
        })}

        {/* Next Chapter */}
        <div className="relative pl-12 md:pl-0">
          <div className="absolute left-4 md:left-1/2 top-6 w-4 h-4 rounded-full bg-white border-4 border-[#E25B38] -translate-x-1/2 z-20 shadow-sm"></div>
          <div className="max-w-md mx-auto">
            <GlassCard className="rounded-3xl p-6 text-center shadow-glass-card">
              <span className="text-[10px] font-bold text-[#E25B38] uppercase tracking-widest block mb-1">
                FUTURE ROLES
              </span>
              <h3 className="text-lg font-extrabold text-ink mb-2">Next Chapter</h3>
              <p className="text-muted text-xs sm:text-sm leading-relaxed">
                Seeking opportunities in Data Analytics, Data Engineering, and Machine Learning. More experiences are coming soon.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

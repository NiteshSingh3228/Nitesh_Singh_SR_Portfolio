import React from "react";
import { GlassCard } from "./GlassCard";
import { projects } from "@/lib/portfolio-data";

const ACCENT_COLOR: Record<string, string> = {
  cyan: "text-[#7C6FE8]",
  gold: "text-[#5B8DEF]",
  magenta: "text-[#E25B38]",
  violet: "text-teal-600",
};
const HOVER_COLOR: Record<string, string> = {
  cyan: "group-hover:text-[#7C6FE8]",
  gold: "group-hover:text-[#5B8DEF]",
  magenta: "group-hover:text-[#E25B38]",
  violet: "group-hover:text-teal-600",
};

export function ProjectsSection() {
  return (
    <section className="py-14 w-full" id="projects">
      <div className="eyebrow-tag mb-2">03 —— PROJECTS</div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-3">
        Missions I've launched
      </h2>
      <p className="text-muted text-base max-w-2xl mb-10 font-normal">
        A selection of things I've built across the software, AI, and
        creative-dev spectrum.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <GlassCard
            key={project.title}
            className="rounded-3xl p-7 sm:p-8 flex flex-col justify-between group shadow-glass-card"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${ACCENT_COLOR[project.accent]}`}>
                  {project.category}
                </span>
                <div className="flex items-center gap-2">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      title="View source on GitHub"
                      className="text-muted hover:text-ink transition-colors text-xs font-mono"
                    >
                      &lt;/&gt;
                    </a>
                  )}
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      title="Visit live demo"
                      className="text-muted hover:text-ink transition-colors text-sm"
                    >
                      ↗
                    </a>
                  )}
                </div>
              </div>

              <h3 className={`text-2xl font-bold text-ink mb-3 transition-colors ${HOVER_COLOR[project.accent]}`}>
                {project.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6 font-normal">
                {project.description}
              </p>
            </div>

            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/60 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-white/70 border border-white/80 text-xs font-medium text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#121217] text-white text-[11px] font-semibold hover:bg-neutral-800 transition-all shadow-sm"
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/80 border border-white text-[11px] font-semibold text-ink hover:bg-white transition-all shadow-xs"
                  >
                    Visit ↗
                  </a>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Banner beneath projects */}
      <GlassCard className="mt-6 rounded-3xl p-6 sm:p-8 border border-white/90 text-center shadow-glass-card">
        <div className="text-sm sm:text-base font-bold text-ink mb-1">
          + More Projects Coming Soon
        </div>
        <p className="text-xs sm:text-sm text-muted">
          Currently designing and developing new AI experiments, automated data
          pipelines, and custom web applications.
        </p>
      </GlassCard>
    </section>
  );
}

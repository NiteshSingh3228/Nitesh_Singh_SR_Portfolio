import React from "react";
import { GlassCard } from "./GlassCard";
import { achievements } from "@/lib/portfolio-data";

const ACCENT_STYLES: Record<string, { dot: string; badge: string; color: string }> = {
  gold:    { dot: "bg-amber-500",  badge: "text-amber-600",  color: "#d97706" },
  cyan:    { dot: "bg-[#7C6FE8]", badge: "text-[#7C6FE8]", color: "#7C6FE8" },
  magenta: { dot: "bg-[#E25B38]", badge: "text-[#E25B38]", color: "#E25B38" },
  violet:  { dot: "bg-[#5B8DEF]", badge: "text-[#5B8DEF]", color: "#5B8DEF" },
};

// Trophy SVG icon (replaces 🏆)
function TrophyIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

export function AchievementsSection() {
  return (
    <section className="py-14 w-full" id="achievements">
      <div className="eyebrow-tag mb-2">07 —— ACHIEVEMENTS &amp; HACKATHONS</div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-2">
        Supernovae moments
      </h2>
      <p className="text-muted text-base max-w-2xl mb-8 font-normal">
        Wins, finals, and milestones earned under pressure — often over
        sleepless hackathon nights.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((ach) => {
          const style = ACCENT_STYLES[ach.accent] ?? ACCENT_STYLES.gold;
          return (
            <GlassCard
              key={ach.title}
              className="rounded-3xl p-6 sm:p-7 shadow-glass-card flex flex-col justify-between"
            >
              <div>
                <div className={`w-10 h-10 rounded-2xl bg-amber-50 ${style.badge} flex items-center justify-center mb-4`}>
                  <TrophyIcon className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-muted mb-1">
                  {ach.placement}
                </div>
                <h3 className="text-lg font-bold text-ink mb-4">{ach.title}</h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: style.color }}>
                  <span className={`w-2 h-2 rounded-full ${style.dot} inline-block`}></span>
                  <span>{ach.event}</span>
                </div>
                {ach.certificate && (
                  <a
                    href={ach.certificate}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold hover:underline flex items-center gap-1"
                    style={{ color: style.color }}
                  >
                    View
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </a>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}

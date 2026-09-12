import React from "react";
import { GlassCard } from "./GlassCard";
import { activities } from "@/lib/portfolio-data";

// SVG icons replacing emojis
function SatelliteIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.5-1.5 3.5 0 4.5s3 1.5 4.5 0" />
      <path d="m9.5 9.5 2 2" />
      <path d="M14 8.5a1 1 0 0 0-1-1" />
      <path d="m16 6.5-1.5 1.5" />
      <path d="m6.5 16 1.5-1.5" />
      <path d="M22 14.5A9.5 9.5 0 0 0 9.5 2" />
      <path d="M15 9.5A4.5 4.5 0 0 0 9.5 4" />
      <circle cx="9.5" cy="9.5" r="2.5" />
    </svg>
  );
}

function BoltIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function MedalIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
      <path d="M11 12 5.12 2.2" />
      <path d="m13 12 5.88-9.8" />
      <path d="M8 7h8" />
      <circle cx="12" cy="17" r="5" />
      <path d="M12 18v-2h-.5" />
    </svg>
  );
}

function TargetIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

const ICON_MAP: Record<string, { icon: React.ReactNode; bg: string }> = {
  violet: { icon: <SatelliteIcon className="w-5 h-5" />, bg: "bg-blue-50 text-[#5B8DEF]" },
  cyan:   { icon: <BoltIcon     className="w-5 h-5" />, bg: "bg-purple-50 text-[#7C6FE8]" },
  magenta:{ icon: <StarIcon     className="w-5 h-5" />, bg: "bg-pink-50 text-pink-600" },
  gold:   { icon: <MedalIcon    className="w-5 h-5" />, bg: "bg-amber-50 text-amber-600" },
};

const DOT_COLOR: Record<string, string> = {
  violet:  "bg-[#5B8DEF]",
  cyan:    "bg-[#7C6FE8]",
  magenta: "bg-pink-500",
  gold:    "bg-amber-500",
};

export function ActivitySection() {
  return (
    <section className="py-14 w-full" id="activity">
      <div className="eyebrow-tag mb-2">08 —— ACTIVITY</div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-2">
        Extracurricular & Beyond
      </h2>
      <p className="text-muted text-base max-w-2xl mb-8 font-normal">
        Engagement, leadership, and active participation beyond the classroom.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((act) => {
          const { icon, bg } = ICON_MAP[act.accent] ?? { icon: <TargetIcon className="w-5 h-5" />, bg: "bg-gray-50 text-gray-600" };
          const dot = DOT_COLOR[act.accent] ?? "bg-gray-400";
          return (
            <GlassCard key={act.title} className="rounded-3xl p-7 shadow-glass-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-2xl ${bg} flex items-center justify-center`}>
                    {icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/70 border border-white text-[11px] font-semibold text-muted">
                    {act.role}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-ink mb-2">{act.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted mb-6">
                  <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
                  <span>{act.event}</span>
                </div>
              </div>
              {act.link && (
                <a
                  href={act.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 border border-white text-xs font-semibold text-ink hover:bg-white transition-all shadow-xs w-fit"
                >
                  View {act.linkText ?? "Link"}
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  </svg>
                </a>
              )}
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}

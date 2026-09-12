import React from "react";
import { GlassCard } from "./GlassCard";
import { certifications } from "@/lib/portfolio-data";

export function CertificationsSection() {
  return (
    <section className="py-14 w-full" id="certifications">
      <div className="eyebrow-tag mb-2">06 —— CERTIFICATIONS</div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-2">
        Verified coordinates
      </h2>
      <p className="text-muted text-base max-w-xl mb-8 font-normal">
        Credentials that back up the craft.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <GlassCard key={cert.title} className="rounded-3xl p-6 flex flex-col justify-between shadow-glass-card">
            <div>
              <h3 className="text-base font-bold text-ink mb-1">{cert.title}</h3>
              <div className="text-xs text-muted mb-6">
                {cert.issuer} • {cert.year}
              </div>
            </div>
            {cert.link ? (
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 border border-white text-xs font-semibold text-ink hover:bg-white transition-all shadow-xs w-fit"
              >
                View Certificate ↗
              </a>
            ) : (
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/50 border border-white/60 text-xs font-semibold text-muted w-fit cursor-not-allowed">
                Coming Soon
              </span>
            )}
          </GlassCard>
        ))}

        {/* More coming */}
        <GlassCard className="rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-glass-card">
          <div className="text-sm font-bold text-ink mb-1">+ More Certifications</div>
          <div className="text-xs text-muted">In progress & coming soon</div>
        </GlassCard>
      </div>
    </section>
  );
}

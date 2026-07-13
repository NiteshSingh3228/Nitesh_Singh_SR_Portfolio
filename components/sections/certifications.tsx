import { certifications } from '@/lib/portfolio-data'
import { Award, ExternalLink, Plus } from 'lucide-react'
import { Reveal } from '../reveal'
import { SectionHeading } from '../section-heading'
import Link from 'next/link'

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:py-32">
      <SectionHeading
        index="06"
        eyebrow="Certifications"
        title="Verified coordinates"
        description="Credentials that back up the craft."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <Reveal key={cert.title} delay={(i % 3) * 80}>
            <div className="glass flex flex-col justify-between h-full rounded-2xl p-5 transition-all duration-300 hover:scale-[1.015] hover:shadow-md">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 ring-1 ring-gold/30">
                  <Award className="h-5 w-5 text-gold" />
                </span>
                <div>
                  <h3 className="font-medium leading-snug text-balance">{cert.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cert.issuer} &middot; {cert.year}
                  </p>
                </div>
              </div>
              
              {cert.link && (
                <div className="mt-4 pt-3 border-t border-primary/10 flex justify-end">
                  {cert.link === '#' ? (
                    <span className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 text-primary/60 px-3 py-1.5 text-xs font-semibold cursor-not-allowed">
                      <ExternalLink className="h-3.5 w-3.5" />
                      {cert.linkText || 'Certificate'} (Coming Soon)
                    </span>
                  ) : (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full border border-primary text-primary px-3 py-1.5 text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {cert.linkText || 'Certificate'}
                    </a>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        ))}

        {/* Coming Soon Box */}
        <Reveal delay={(certifications.length % 3) * 80}>
          <div className="border border-dashed border-primary/30 bg-primary/5 flex h-full items-center gap-4 rounded-2xl p-5 min-h-[120px]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
              <Plus className="h-5 w-5 text-primary animate-pulse" />
            </span>
            <div>
              <h3 className="font-medium leading-snug text-foreground/80">More Certifications</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                In progress & coming soon
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

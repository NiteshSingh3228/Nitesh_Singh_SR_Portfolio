import { experiences } from '@/lib/portfolio-data'
import { Briefcase, ExternalLink, Award, FileText, Plus } from 'lucide-react'
import { Reveal } from '../reveal'
import { SectionHeading } from '../section-heading'
import Link from 'next/link'

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:py-32">
      <SectionHeading
        index="04"
        eyebrow="Experience"
        title="Trajectory so far"
        description="Roles where I've shipped real products and grown across the stack."
      />

      <div className="relative">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan via-violet to-magenta md:left-1/2" />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <Reveal key={exp.role + exp.company} delay={i * 90}>
              <div
                className={`relative pl-12 md:w-1/2 md:pl-0 ${
                  i % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:pr-12 md:text-right'
                }`}
              >
                <span
                  className={`absolute top-1.5 flex h-8 w-8 items-center justify-center rounded-full glass ${
                    i % 2 === 0
                      ? 'left-0 md:-left-4'
                      : 'left-0 md:left-auto md:-right-4'
                  }`}
                >
                  <Briefcase className="h-3.5 w-3.5 text-primary" />
                </span>

                <div className="glass rounded-2xl p-6 hover-neon-glow transition-all duration-300">
                  <span className="font-mono text-xs uppercase tracking-widest text-primary">
                    {exp.period}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold">{exp.role}</h3>
                  <p className="text-sm font-medium text-foreground/80">{exp.company}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>
                  
                  {/* Tags */}
                  <div
                    className={`mt-5 flex flex-wrap gap-2 ${
                      i % 2 === 0 ? '' : 'md:justify-end'
                    }`}
                  >
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-medium tracking-wide text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links / Action Buttons */}
                  {(exp.certificate || exp.project || exp.offerLetter) && (
                    <div className={`mt-5 flex flex-wrap gap-3 ${
                      i % 2 === 0 ? '' : 'md:justify-end'
                    }`}>
                      {exp.certificate && (
                        exp.certificate === '#' ? (
                          <span className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 text-primary/60 px-3 py-1.5 text-xs font-semibold cursor-not-allowed">
                            <Award className="h-3.5 w-3.5" />
                            Certificate (Coming Soon)
                          </span>
                        ) : (
                          <Link 
                            href={exp.certificate}
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1.5 rounded-full border border-primary text-primary px-3 py-1.5 text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                          >
                            <Award className="h-3.5 w-3.5" />
                            Certificate
                          </Link>
                        )
                      )}
                      {exp.offerLetter && (
                        exp.offerLetter === '#' ? (
                          <span className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 text-primary/60 px-3 py-1.5 text-xs font-semibold cursor-not-allowed">
                            <FileText className="h-3.5 w-3.5" />
                            Offer Letter (Coming Soon)
                          </span>
                        ) : (
                          <Link 
                            href={exp.offerLetter}
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1.5 rounded-full border border-primary text-primary px-3 py-1.5 text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            Offer Letter
                          </Link>
                        )
                      )}
                      {exp.project && (
                        <Link 
                          href={exp.project}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="flex items-center gap-1.5 rounded-full border border-primary text-primary px-3 py-1.5 text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Project Link
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}

          {/* Coming Soon Timeline Node */}
          <Reveal delay={experiences.length * 90}>
            <div
              className={`relative pl-12 md:w-1/2 md:pl-0 ${
                experiences.length % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:pr-12 md:text-right'
              }`}
            >
              <span
                className={`absolute top-1.5 flex h-8 w-8 items-center justify-center rounded-full glass border border-dashed border-primary/40 ${
                  experiences.length % 2 === 0
                    ? 'left-0 md:-left-4'
                    : 'left-0 md:left-auto md:-right-4'
                }`}
              >
                <Plus className="h-3.5 w-3.5 text-primary animate-pulse" />
              </span>

              <div className="border border-dashed border-primary/30 bg-primary/5 rounded-2xl p-6">
                <span className="font-mono text-xs uppercase tracking-widest text-primary/70">
                  Future Roles
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-foreground/80">Next Chapter</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Seeking opportunities in Data Analytics, Data Engineering, and Machine Learning. More experiences are coming soon.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

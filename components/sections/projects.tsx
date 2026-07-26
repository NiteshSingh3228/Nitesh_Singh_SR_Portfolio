import { projects } from '@/lib/portfolio-data'
import { accentBorder, accentText } from '@/lib/accent'
import { cn } from '@/lib/utils'
import { ArrowUpRight, Plus, Code, ExternalLink } from 'lucide-react'
import { Reveal } from '../reveal'
import { SectionHeading } from '../section-heading'

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:py-32">
      <SectionHeading
        index="03"
        eyebrow="Projects"
        title="Missions I've launched"
        description="A selection of things I've built across the software, AI, and creative-dev spectrum."
      />

      <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[minmax(180px,auto)] gap-5">
        {projects.map((project, i) => {
          
          let gridClass = 'md:col-span-3 md:row-span-1'

          return (
            <Reveal key={project.title} delay={(i % 2) * 100} className={gridClass}>
            <div
                className={cn(
                  'group glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-all hover-neon-glow flex flex-col justify-between',
                  accentBorder[project.accent],
                )}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        'font-mono text-xs uppercase tracking-widest',
                        accentText[project.accent],
                      )}
                    >
                      {project.category}
                    </span>
                    <div className="flex items-center gap-3">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 z-10" title="Source Code">
                          <Code className="h-5 w-5" />
                        </a>
                      )}
                      {project.demoLink && (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 z-10" title="Live Demo">
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-2.5 py-0.5 text-xs text-muted-foreground transition-colors group-hover:bg-white/10 group-hover:text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )
        })}

        {/* Coming Soon Box */}
        <Reveal delay={(projects.length % 2) * 100} className="md:col-span-6 md:row-span-1">
          <div className="border border-dashed border-primary/30 bg-primary/5 flex h-full flex-col justify-center rounded-3xl p-6 min-h-[180px]">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <Plus className="h-5 w-5 text-primary animate-pulse" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-foreground/80">More Projects Coming Soon</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Currently designing and developing new AI experiments, automated data pipelines, and custom web applications.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

import { education } from '@/lib/portfolio-data'
import { GraduationCap } from 'lucide-react'
import { Reveal } from '../reveal'
import { SectionHeading } from '../section-heading'

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:py-32">
      <SectionHeading index="05" eyebrow="Education" title="Where I calibrated" />

      <div className="grid gap-5 md:grid-cols-2">
        {education.map((item, i) => (
          <Reveal key={item.degree} delay={i * 100}>
            <div className="glass h-full rounded-3xl p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
                <GraduationCap className="h-5 w-5 text-primary" />
              </span>
              <span className="mt-4 block font-mono text-xs uppercase tracking-widest text-primary">
                {item.period}
              </span>
              <h3 className="mt-1 font-display text-xl font-semibold text-balance">
                {item.degree}
              </h3>
              <p className="text-sm text-muted-foreground">{item.school}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

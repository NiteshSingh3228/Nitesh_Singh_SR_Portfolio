import { about } from '@/lib/portfolio-data'
import { Reveal } from '../reveal'
import { SectionHeading } from '../section-heading'
import { NumberCounter } from '../ui/number-counter'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:py-32">
      <SectionHeading index="01" eyebrow="About" title="A signal across disciplines" />

      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3">
          <Reveal>
            <p className="text-xl leading-relaxed text-pretty text-foreground md:text-2xl">
              {about.intro}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 leading-relaxed text-muted-foreground">{about.detail}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          {about.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90}>
              <div className="glass h-full rounded-2xl p-5">
                <div className="font-display text-3xl font-bold cosmic-gradient-text md:text-4xl">
                  <NumberCounter value={stat.value} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

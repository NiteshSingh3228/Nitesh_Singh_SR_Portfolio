import { skillGroups } from '@/lib/portfolio-data'
import { accentDot, accentText } from '@/lib/accent'
import { cn } from '@/lib/utils'
import { Reveal } from '../reveal'
import { SectionHeading } from '../section-heading'

// Bento layout: 5 cards in a 3-col grid
const bentoCols = [
  'md:col-span-2 md:row-span-2', // Big card
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-2 md:row-span-1',
  'md:col-span-1 md:row-span-1',
]

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:py-32">
      <SectionHeading
        index="02"
        eyebrow="Skills"
        title="Tools in my constellation"
        description="A stack that spans product engineering, machine learning, and design — chosen to move fast without breaking craft."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(180px,auto)] gap-4">
        {skillGroups.map((group, i) => (
          <Reveal key={group.category} delay={i * 80} className={bentoCols[i] ?? 'md:col-span-1'}>
            <div className="glass group h-full rounded-3xl p-6 transition-all duration-300 hover:bg-white/[0.08] hover-neon-glow flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <span className={cn('h-2 w-2 rounded-full', accentDot[group.accent])} />
                <h3 className={cn('font-display text-xl font-bold', accentText[group.accent])}>
                  {group.category}
                </h3>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}


import { achievements } from '@/lib/portfolio-data'
import { accentDot, accentText } from '@/lib/accent'
import { cn } from '@/lib/utils'
import { Trophy } from 'lucide-react'
import { Reveal } from '../reveal'
import { SectionHeading } from '../section-heading'

export function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:py-32">
      <SectionHeading
        index="07"
        eyebrow="Achievements & Hackathons"
        title="Supernovae moments"
        description="Wins, finals, and milestones earned under pressure — often over sleepless hackathon nights."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item, i) => (
          <Reveal key={item.title + item.event} delay={(i % 3) * 80}>
            <div className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-colors hover:bg-white/[0.06]">
              <div className="flex items-center justify-between">
                <Trophy className={cn('h-6 w-6', accentText[item.accent])} />
                <span
                  className={cn(
                    'rounded-full border border-white/10 px-3 py-1 text-xs font-semibold',
                    accentText[item.accent],
                  )}
                >
                  {item.placement}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{item.title}</h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <span className={cn('h-1.5 w-1.5 rounded-full', accentDot[item.accent])} />
                {item.event}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

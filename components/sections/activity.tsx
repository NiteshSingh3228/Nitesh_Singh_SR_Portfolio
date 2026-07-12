import { activities } from '@/lib/portfolio-data'
import { accentDot, accentText } from '@/lib/accent'
import { cn } from '@/lib/utils'
import { Activity as ActivityIcon, ExternalLink } from 'lucide-react'
import { Reveal } from '../reveal'
import { SectionHeading } from '../section-heading'
import Link from 'next/link'

export function Activity() {
  return (
    <section id="activity" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:py-32">
      <SectionHeading
        index="08"
        eyebrow="Activity"
        title="Extracurricular & Beyond"
        description="Engagement, leadership, and active participation beyond the classroom."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((item, i) => (
          <Reveal key={item.title + item.event} delay={(i % 3) * 80}>
            <div className="glass group relative flex flex-col justify-between h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.06] hover:scale-[1.015]">
              <div>
                <div className="flex items-center justify-between">
                <ActivityIcon className={cn('h-6 w-6', accentText[item.accent])} />
                <span
                  className={cn(
                    'rounded-full border border-white/10 px-3 py-1 text-xs font-semibold',
                    accentText[item.accent],
                  )}
                >
                  {item.role}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{item.title}</h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <span className={cn('h-1.5 w-1.5 rounded-full', accentDot[item.accent])} />
                {item.event}
              </div>
              </div>
              
              {item.link && (
                <div className="mt-4 pt-4 border-t border-primary/10 flex justify-end">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full border border-primary text-primary px-3 py-1.5 text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {item.linkText || 'View'}
                  </a>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

import { CosmicBackground } from '@/components/cosmic-background'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Skills } from '@/components/sections/skills'
import { Projects } from '@/components/sections/projects'
import { Experience } from '@/components/sections/experience'
import { Education } from '@/components/sections/education'
import { Certifications } from '@/components/sections/certifications'
import { Achievements } from '@/components/sections/achievements'
import { Activity } from '@/components/sections/activity'
import { Contact } from '@/components/sections/contact'

export default function Page() {
  return (
    <>
      <CosmicBackground />
      <SiteNav />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Achievements />
        <Activity />
        <Contact />
      </main>
    </>
  )
}


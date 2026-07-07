'use client'

import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { GithubIcon, InstagramIcon, LinkedinIcon, UpworkIcon } from './brand-icons'
import { navLinks, profile } from '@/lib/portfolio-data'

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <nav
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 md:px-6',
          scrolled ? 'glass shadow-lg shadow-black/30' : 'bg-transparent',
        )}
      >
        <a
          href="#top"
          className="group flex items-center font-display tracking-tight"
        >
          <div className="flex h-11 w-11 flex-col items-center justify-center rounded-full bg-[#ea580c] text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            <span className="font-sans text-[1.1rem] font-bold leading-none tracking-tighter mt-1">Ni</span>
            <span 
              className="mt-[1px] text-[6.5px] font-light leading-none tracking-wide" 
              style={{ fontFamily: "'Brush Script MT', 'Dancing Script', 'Caveat', cursive" }}
            >
              Nitesh Singh
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 sm:flex">
            <SocialLink href={profile.socials.github} label="GitHub">
              <GithubIcon className="h-4 w-4" />
            </SocialLink>
            <SocialLink href={profile.socials.linkedin} label="LinkedIn">
              <LinkedinIcon className="h-4 w-4" />
            </SocialLink>
            <SocialLink href={profile.socials.instagram} label="Instagram">
              <InstagramIcon className="h-4 w-4" />
            </SocialLink>
            {profile.socials.upwork && (
              <SocialLink href={profile.socials.upwork} label="Upwork">
                <UpworkIcon className="h-4 w-4" />
              </SocialLink>
            )}
          </div>
          
          <a
            href="#contact"
            className="hidden sm:inline-flex ml-2 items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_15px_-3px_var(--neon-blue)] transition-all hover-neon-glow"
          >
            Contact
          </a>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white/5 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'mx-auto mt-2 max-w-6xl overflow-hidden px-2 transition-all duration-300 lg:hidden',
          open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="glass grid grid-cols-2 gap-1 rounded-3xl p-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <div className="col-span-2 mt-1 flex items-center gap-2 border-t border-white/10 pt-3">
            <SocialLink href={profile.socials.github} label="GitHub">
              <GithubIcon className="h-4 w-4" />
            </SocialLink>
            <SocialLink href={profile.socials.linkedin} label="LinkedIn">
              <LinkedinIcon className="h-4 w-4" />
            </SocialLink>
            <SocialLink href={profile.socials.instagram} label="Instagram">
              <InstagramIcon className="h-4 w-4" />
            </SocialLink>
            {profile.socials.upwork && (
              <SocialLink href={profile.socials.upwork} label="Upwork">
                <UpworkIcon className="h-4 w-4" />
              </SocialLink>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-white/5 hover:text-primary"
    >
      {children}
    </a>
  )
}

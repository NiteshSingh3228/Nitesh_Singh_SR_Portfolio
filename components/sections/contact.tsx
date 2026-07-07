'use client'

import { profile } from '@/lib/portfolio-data'
import { ArrowUpRight, Mail, Send, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { GithubIcon, InstagramIcon, LinkedinIcon, UpworkIcon } from '../brand-icons'
import { Reveal } from '../reveal'
import { SectionHeading } from '../section-heading'

const OCCUPATION_OPTIONS = [
  'Student', 'Recruiter', 'HR Manager', 'Hiring Manager', 'Software Engineer', 'AI/ML Engineer', 'Data Scientist', 'Data Analyst', 'Product Manager', 'Project Manager', 'Founder', 'Co-Founder', 'CEO', 'CTO', 'Entrepreneur', 'Researcher', 'Professor', 'Teacher', 'Open Source Maintainer', 'Freelancer', 'Consultant', 'Designer', 'Content Creator', 'Investor', 'Business Development', 'Marketing Professional', 'Sales Representative', 'Other...'
]

const ORGANIZATION_OPTIONS = [
  'Company', 'Startup', 'University', 'College', 'Research Lab', 'Government Organization', 'NGO', 'Incubator', 'Accelerator', 'Open Source Organization', 'Community', 'Tech Club', 'Student Chapter', 'Freelance / Self-Employed', 'Individual', 'Other...'
]

const PURPOSE_OPTIONS = [
  'Career', 'Internship Opportunity', 'Full-Time Job Opportunity', 'Part-Time Opportunity', 'Contract Position', 'Referral', 'Interview Invitation', 'Recruitment', 'Collaboration', 'Project Collaboration', 'Research Collaboration', 'Startup Collaboration', 'Hackathon Team-Up', 'Open Source Collaboration', 'Technical Partnership', 'Business', 'Freelance Project', 'Client Project', 'Business Proposal', 'Sponsorship', 'Investment Opportunity', 'Partnership', 'Consultation Request', 'Networking', 'Mentorship Request', 'Career Guidance', 'Coffee Chat', 'Community Invitation', 'Speaking Invitation', 'Podcast Invitation', 'Technical', 'Code Review', 'Project Feedback', 'Bug Report', 'Feature Request', 'Technical Discussion', 'API Integration', 'General', 'General Inquiry', 'Question', 'Support', 'Just Saying Hi 👋', 'Other...'
]

export function Contact() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    occupation: '',
    organization: '',
    purpose: '',
    message: '' 
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      // Play a satisfying "success" chime using Web Audio API
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          const playTone = (freq: number, startTime: number, duration: number) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
            gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
            gain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + startTime + 0.05); // Increased volume
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + startTime);
            osc.stop(ctx.currentTime + startTime + duration);
          };
          playTone(523.25, 0, 0.2); // C5
          playTone(659.25, 0.1, 0.4); // E5
        }
      } catch (e) {
        // Ignore audio errors (e.g. if browser blocks auto-play)
      }

      // Tell the background music component to lower its volume
      window.dispatchEvent(new Event('playSuccessChime'));

      setSent(true)
      setForm({
        name: '', 
        email: '', 
        occupation: '',
        organization: '',
        purpose: '',
        message: '' 
      })
      
      // Reset the sent status after 5 seconds
      setTimeout(() => setSent(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:py-32">
      <SectionHeading
        index="09"
        eyebrow="Contact"
        title="Send a transmission"
        description="Have an idea, a role, or a collaboration in mind? Let's chart a course together."
      />

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Reveal>
            <a
              href={`mailto:${profile.email}`}
              className="glass flex items-center gap-3 rounded-2xl p-4 transition-colors hover:bg-white/[0.06]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <Mail className="h-5 w-5 text-primary" />
              </span>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                <div className="truncate text-sm font-medium">{profile.email}</div>
              </div>
            </a>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <SocialCard href={profile.socials.github} label="GitHub">
                <GithubIcon className="h-5 w-5" />
              </SocialCard>
              <SocialCard href={profile.socials.linkedin} label="LinkedIn">
                <LinkedinIcon className="h-5 w-5" />
              </SocialCard>
              <SocialCard href={profile.socials.instagram} label="Instagram">
                <InstagramIcon className="h-5 w-5" />
              </SocialCard>
              {profile.socials.upwork && (
                <SocialCard href={profile.socials.upwork} label="Upwork">
                  <UpworkIcon className="h-5 w-5" />
                </SocialCard>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                id="name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                placeholder="Ada Lovelace"
              />
              <Field
                label="Email"
                id="email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                placeholder="you@galaxy.com"
              />
              <SelectField
                label="Occupation"
                id="occupation"
                value={form.occupation}
                onChange={(v) => setForm((f) => ({ ...f, occupation: v }))}
                options={OCCUPATION_OPTIONS}
              />
              <SelectField
                label="Organization"
                id="organization"
                value={form.organization}
                onChange={(v) => setForm((f) => ({ ...f, organization: v }))}
                options={ORGANIZATION_OPTIONS}
              />
              <div className="sm:col-span-2">
                <SelectField
                  label="Purpose of Contact"
                  id="purpose"
                  value={form.purpose}
                  onChange={(v) => setForm((f) => ({ ...f, purpose: v }))}
                  options={PURPOSE_OPTIONS}
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Tell me about your mission..."
                className="w-full resize-none rounded-xl border border-primary/30 bg-white/60 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 hover:border-primary/50 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {error && (
              <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting || sent}
              className="group mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-6px_var(--cyan)] transition-all hover:shadow-[0_0_40px_-4px_var(--cyan)] disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? 'Sending...' : sent ? 'Message Sent!' : 'Launch message'}
              {!isSubmitting && !sent && <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            </button>
          </form>
        </Reveal>
      </div>

      <footer className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-muted-foreground sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. Built among the stars.
        </p>
        <a href="#top" className="inline-flex items-center gap-1 transition-colors hover:text-foreground">
          Back to top
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </footer>
    </section>
  )
}

function Field({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
}: {
  label: string
  id: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-primary/30 bg-white/60 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 hover:border-primary/50 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
      />
    </div>
  )
}

function SelectField({
  label,
  id,
  value,
  onChange,
  options,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  const [showOther, setShowOther] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {!showOther ? (
        <div className="relative">
          <select
            id={id}
            required
            value={value}
            onChange={(e) => {
              if (e.target.value === 'Other...') {
                setShowOther(true);
                onChange('');
              } else {
                onChange(e.target.value);
              }
            }}
            className="w-full appearance-none rounded-xl border border-primary/30 bg-white/60 px-4 py-3 text-sm outline-none transition-all hover:border-primary/50 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 text-foreground"
          >
            <option value="" disabled className="text-muted-foreground">Select {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt} className="bg-background text-foreground">
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      ) : (
        <div className="flex w-full gap-2 items-center">
          <input
            autoFocus
            type="text"
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Specify ${label.toLowerCase()}...`}
            className="w-full rounded-xl border border-primary/30 bg-white/60 px-4 py-3 text-sm outline-none transition-all hover:border-primary/50 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 text-foreground"
          />
          <button
            type="button"
            onClick={() => {
              setShowOther(false);
              onChange('');
            }}
            className="px-3 py-2 text-xs font-medium rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground transition-colors shrink-0"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

function SocialCard({
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
      className="glass flex aspect-square items-center justify-center rounded-2xl text-muted-foreground transition-all hover:-translate-y-1 hover:text-primary"
    >
      {children}
    </a>
  )
}

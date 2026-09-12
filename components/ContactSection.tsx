"use client";

import React, { useState } from "react";
import { GlassCard } from "./GlassCard";
import { profile } from "@/lib/portfolio-data";

const SOCIAL_LINKS = profile.socials;


export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    occupation: "",
    organization: "",
    purpose: "",
    message: "",
    bot_field: "", // Honeypot field
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage({ type: 'success', text: 'Message transmitted successfully!' });
        setFormData({
          name: "",
          email: "",
          occupation: "",
          organization: "",
          purpose: "",
          message: "",
          bot_field: "",
        });
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Failed to send message.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-14 w-full" id="contact">
      <div className="eyebrow-tag mb-2">09 —— CONTACT</div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-2">
        Send a transmission
      </h2>
      <p className="text-muted text-base max-w-xl mb-10 font-normal">
        Have an idea, a role, or a collaboration in mind? Let's chart a course together.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Details */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Direct Email Card */}
          <GlassCard className="rounded-3xl p-6 shadow-glass-card">
            <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">
              EMAIL
            </div>
            <a
              className="text-sm font-bold text-ink hover:text-[#7C6FE8] transition-colors break-all"
              href="mailto:niteshsinghsrajput1205@gmail.com"
            >
              niteshsinghsrajput1205@gmail.com
            </a>
          </GlassCard>

          {/* Social Links Icons Row */}
          <GlassCard className="rounded-3xl p-6 shadow-glass-card">
            <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-4">
              CONNECT ON ORBITS
            </div>
            <div className="flex items-center gap-3">
              <a
                className="w-11 h-11 rounded-2xl bg-white/80 border border-white flex items-center justify-center text-ink hover:bg-[#121217] hover:text-white transition-all shadow-sm"
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                title="GitHub"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"></path>
                </svg>
              </a>
              <a
                className="w-11 h-11 rounded-2xl bg-white/80 border border-white flex items-center justify-center text-ink hover:bg-[#0A66C2] hover:text-white transition-all shadow-sm"
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z"></path>
                </svg>
              </a>
              <a
                className="w-11 h-11 rounded-2xl bg-white/80 border border-white flex items-center justify-center text-ink hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                title="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"></path>
                </svg>
              </a>
              <a
                className="w-11 h-11 rounded-2xl bg-white/80 border border-white flex items-center justify-center text-ink hover:bg-[#7C6FE8] hover:text-white transition-all shadow-sm"
                href="#projects"
                title="Projects"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </a>
            </div>
          </GlassCard>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <GlassCard className="rounded-3xl p-8 sm:p-9 shadow-glass-card">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Honeypot field (hidden from users to catch bots) */}
              <input
                type="text"
                name="bot_field"
                value={formData.bot_field}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              
              {/* 2-column: Name | Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-white focus:outline-none focus:ring-2 focus:ring-[#7C6FE8]/40 text-sm text-ink placeholder-muted2 transition-all"
                    placeholder="Ada Lovelace"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-white focus:outline-none focus:ring-2 focus:ring-[#7C6FE8]/40 text-sm text-ink placeholder-muted2 transition-all"
                    placeholder="you@galaxy.com"
                    type="email"
                  />
                </div>
              </div>

              {/* 2-column: Occupation | Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    Occupation
                  </label>
                  <select
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-white focus:outline-none focus:ring-2 focus:ring-[#7C6FE8]/40 text-sm text-muted transition-all"
                  >
                    <option value="" disabled>
                      Select Occupation
                    </option>
                    <option>Recruiter / Hiring Manager</option>
                    <option>Tech Lead / Engineering Lead</option>
                    <option>Founder / Co-founder</option>
                    <option>Student / Peer Collaborator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    Organization
                  </label>
                  <select
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-white focus:outline-none focus:ring-2 focus:ring-[#7C6FE8]/40 text-sm text-muted transition-all"
                  >
                    <option value="" disabled>
                      Select Organization
                    </option>
                    <option>Startup</option>
                    <option>Enterprise</option>
                    <option>University / Research Lab</option>
                    <option>Independent</option>
                  </select>
                </div>
              </div>

              {/* Full-width: Purpose of Contact */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                  Purpose of Contact
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-white focus:outline-none focus:ring-2 focus:ring-[#7C6FE8]/40 text-sm text-muted transition-all"
                >
                  <option value="" disabled>
                    Select Purpose of Contact
                  </option>
                  <option>Full-time / Internship Role</option>
                  <option>Data / ML Project</option>
                  <option>Hackathon Collaboration</option>
                  <option>General Mentorship / Say Hi</option>
                </select>
              </div>

              {/* Full-width: Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-white focus:outline-none focus:ring-2 focus:ring-[#7C6FE8]/40 text-sm text-ink placeholder-muted2 transition-all"
                  placeholder="Tell me about your mission..."
                  rows={4}
                ></textarea>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div className={`p-4 rounded-xl text-sm font-semibold ${statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                  {statusMessage.text}
                </div>
              )}

              {/* Launch Message Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-3.5 rounded-full bg-[#121217] text-white text-xs sm:text-sm font-semibold hover:bg-neutral-800 transition-all hover:scale-[1.01] shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
              >
                <span>{isSubmitting ? 'Transmitting...' : 'Launch message'}</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

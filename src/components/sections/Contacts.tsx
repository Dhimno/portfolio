"use client";

import React, { useState } from "react";
import { Copy, Check, Send, MapPin } from "lucide-react";
import { useI18n } from "../../lib/i18n";
import { BlurReveal } from "../ui/BlurReveal";
import { Orb } from "../ui/Orb";
import { DynamicCompanion } from "../companions/DynamicCompanion";

export function ContactsSection() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const email = "dhimnooo@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    // Simulate swift dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <section
      id="contacts"
      className="relative w-full pt-16 pb-20 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 border-t border-[var(--line)]/50 overflow-x-clip scroll-mt-16"
    >
      {/* Dynamic Companion pacing along the divider line below experience */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <DynamicCompanion slot="experience-divider" defaultCharacter="dog" />
        </div>
      </div>

      <Orb top="20%" right="10%" size={450} delay={1.5} />

      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <BlurReveal delay={0.1}>
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[var(--ink)] tracking-[-0.04em] mb-4">
              {t.contacts.title}
            </h2>
          </BlurReveal>

          <BlurReveal delay={0.2}>
            <p className="text-base sm:text-lg text-[var(--ink-muted)]">
              {t.contacts.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Two Columns: Contact Channels & Clean Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Communication Briefing (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <BlurReveal delay={0.25}>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-[var(--ink-muted)] font-semibold mb-2">
                    {t.contacts.emailLabel}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${email}`}
                      className="font-mono text-base sm:text-lg font-bold text-[var(--ink)] hover:text-[var(--accent)] transition-colors underline decoration-[var(--line)] underline-offset-4"
                    >
                      {email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none border border-[var(--line)] hover:border-[var(--accent)] bg-[var(--surface-2)] hover:bg-[var(--line)] text-[10px] font-pixel text-[var(--ink)] shadow-[2px_2px_0px_var(--line)] transition-colors cursor-pointer"
                      aria-label="Copy Email Address"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500 font-bold">{t.contacts.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
                          <span>{t.contacts.copyEmail}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--line)]/60">
                  <p className="text-xs font-mono uppercase tracking-wider text-[var(--ink-muted)] font-semibold mb-1">
                    Lokasi / Base
                  </p>
                  <p className="text-sm font-medium text-[var(--ink)] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[var(--accent)]" />
                    {t.contacts.location}
                  </p>
                </div>
              </div>
            </BlurReveal>
          </div>

          {/* Right Column: Clean Interactive Message Form (7 cols) */}
          <div className="md:col-span-7">
            <BlurReveal delay={0.35}>
              <div className="p-6 sm:p-8 rounded-none bg-[var(--surface)] border-2 border-[var(--line)] shadow-[5px_5px_0px_var(--line)]">
                {isSubmitted ? (
                  <div className="text-center py-10 space-y-3">
                    <div className="w-12 h-12 rounded-none border-2 border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] shadow-[2px_2px_0px_var(--accent)] flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[var(--ink)]">
                      {t.contacts.sentSuccess}
                    </h3>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-1.5 font-mono"
                      >
                        {t.contacts.namePlaceholder}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder={t.contacts.namePlaceholder}
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-none bg-[var(--surface-2)] border-2 border-[var(--line)] text-sm font-mono text-[var(--ink)] placeholder-[var(--ink-muted)] shadow-[2px_2px_0px_var(--line)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-1.5 font-mono"
                      >
                        {t.contacts.emailPlaceholder}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder={t.contacts.emailPlaceholder}
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-none bg-[var(--surface-2)] border-2 border-[var(--line)] text-sm font-mono text-[var(--ink)] placeholder-[var(--ink-muted)] shadow-[2px_2px_0px_var(--line)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-1.5 font-mono"
                      >
                        {t.contacts.messagePlaceholder}
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        placeholder={t.contacts.messagePlaceholder}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({ ...formState, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-none bg-[var(--surface-2)] border-2 border-[var(--line)] text-sm font-mono text-[var(--ink)] placeholder-[var(--ink-muted)] shadow-[2px_2px_0px_var(--line)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-none border-2 border-[var(--ink)] bg-[var(--accent)] hover:bg-[var(--accent-strong)] text-white text-xs font-pixel tracking-wider shadow-[3px_3px_0px_var(--ink)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_var(--ink)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {isSubmitting ? t.contacts.sending : t.contacts.send}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

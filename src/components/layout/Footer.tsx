"use client";

import React, { useSyncExternalStore } from "react";
import { Mail, Dices, Volume2, VolumeX } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";
import { Logo } from "../ui/Logo";
import { useI18n } from "../../lib/i18n";
import { useRerollCompanions } from "../companions/SpawnContext";
import { DynamicCompanion } from "../companions/DynamicCompanion";
import { playDiceShuffle, isMuted, toggleMute, subscribeMute } from "../../lib/sound";

export function Footer() {
  const { locale } = useI18n();
  const reroll = useRerollCompanions();
  const muted = useSyncExternalStore(subscribeMute, isMuted, () => false);

  const handleReroll = () => {
    playDiceShuffle();
    reroll();
  };

  const handleToggleSound = () => {
    toggleMute();
  };

  return (
    <footer className="relative w-full border-t border-[var(--line)] bg-[var(--surface)] py-12 px-4 sm:px-6 lg:px-8">
      {/* Dynamic Companion pacing along the top border line */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <DynamicCompanion slot="footer-divider" defaultCharacter="sans" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Brand Identity */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <Logo className="w-6 h-6 text-[var(--accent)]" />
            <span className="font-display font-bold text-base text-[var(--ink)] tracking-tight">
              Dhimas Reza Nafi Wahyudi
            </span>
          </div>
          <p className="text-xs text-[var(--ink-muted)] max-w-md">
            {locale === "id"
              ? "S1 Informatika Universitas Diponegoro • Rekayasa Perangkat Lunak, Cybersecurity & Otomasi Sistem"
              : "Informatics Undergrad at Diponegoro University • Software Engineering, Cybersecurity & Systems"}
          </p>
        </div>

        {/* Social / Direct Channels & Re-roll Buddies */}
        <div className="flex flex-col items-center md:items-end gap-2.5">
          {/* Row 1: Mail, GitHub, LinkedIn */}
          <div className="flex items-center gap-2">
            <a
              href="mailto:dhimnooo@gmail.com"
              aria-label="Direct Email"
              className="flex items-center justify-center w-9 h-9 rounded-none bg-[var(--surface-2)] text-[var(--ink)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all border-2 border-[var(--line)] shadow-[2px_2px_0px_var(--line)] hover:shadow-[3px_3px_0px_var(--accent)]"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/Dhimno"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex items-center justify-center w-9 h-9 rounded-none bg-[var(--surface-2)] text-[var(--ink)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all border-2 border-[var(--line)] shadow-[2px_2px_0px_var(--line)] hover:shadow-[3px_3px_0px_var(--accent)]"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/dhimno/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex items-center justify-center w-9 h-9 rounded-none bg-[var(--surface-2)] text-[var(--ink)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all border-2 border-[var(--line)] shadow-[2px_2px_0px_var(--line)] hover:shadow-[3px_3px_0px_var(--accent)]"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Row 2: Acak Karakter & SFX Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReroll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[var(--surface-2)] text-[var(--ink-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all border-2 border-[var(--line)] shadow-[2px_2px_0px_var(--line)] hover:shadow-[3px_3px_0px_var(--accent)] text-xs font-pixel cursor-pointer select-none"
              title="Acak posisi karakter pixel art"
              aria-label="Acak posisi karakter pixel art"
            >
              <Dices className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-[11px] font-semibold">{locale === "id" ? "Acak Karakter" : "Re-roll Buddies"}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleSound}
              className={`flex items-center justify-center w-8 h-8 rounded-none transition-all border-2 border-[var(--line)] shadow-[2px_2px_0px_var(--line)] hover:shadow-[3px_3px_0px_var(--accent)] cursor-pointer select-none ${
                muted
                  ? "bg-[var(--surface-2)] text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  : "bg-[var(--surface-2)] text-[var(--accent)] hover:border-[var(--accent)]"
              }`}
              title={muted ? "Nyalakan efek suara 8-bit" : "Matikan efek suara"}
              aria-label={muted ? "Unmute 8-bit SFX" : "Mute 8-bit SFX"}
            >
              {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-xs font-mono text-[var(--ink-muted)]">
          {locale === "id"
            ? "© 2026 Dhimas Reza Nafi Wahyudi. Semua hak dilindungi."
            : "© 2026 Dhimas Reza Nafi Wahyudi. All rights reserved."}
        </div>
      </div>
    </footer>
  );
}

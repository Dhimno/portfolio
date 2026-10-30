import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono, Silkscreen } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../lib/theme";
import { I18nProvider } from "../lib/i18n";
import { SmoothScrollProvider } from "../lib/lenis";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Dhimas Reza Nafi Wahyudi — Portfolio",
  description:
    "Personal portfolio of Dhimas Reza Nafi Wahyudi — Informatics student at Diponegoro University specializing in software development, cybersecurity, and native systems.",
  keywords: [
    "Dhimas Reza Nafi Wahyudi",
    "Informatika Undip",
    "Portfolio",
    "Software Engineer",
    "Full-stack",
    "Cybersecurity",
  ],
  authors: [{ name: "Dhimas Reza Nafi Wahyudi" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon-64.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable} ${silkscreen.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-body selection:bg-accent selection:text-white">
        <ThemeProvider>
          <I18nProvider>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

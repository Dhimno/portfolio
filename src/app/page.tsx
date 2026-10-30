import { Loader } from "../components/loader/Loader";
import { ScrollProgress } from "../components/layout/ScrollProgress";
import { Navbar } from "../components/layout/Navbar";
import { HomeSection } from "../components/sections/Home";
import { PillarsSection } from "../components/sections/Pillars";
import { ProjectsSection } from "../components/sections/Projects";
import { ExperienceSection } from "../components/sections/Experience";
import { AboutSection } from "../components/sections/About";
import { ContactsSection } from "../components/sections/Contacts";
import { Footer } from "../components/layout/Footer";
import { CompanionProvider } from "../components/companions/SpawnContext";
import { PixelClickSparkles } from "../components/ui/PixelClickSparkles";

export default function Page() {
  return (
    <CompanionProvider>
      <main className="relative min-h-screen w-full flex flex-col bg-[var(--bg)] text-[var(--ink)]">
        <PixelClickSparkles />
        <Loader />
        <ScrollProgress />
        <Navbar />

        <HomeSection />
        <AboutSection />
        <PillarsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactsSection />

        <Footer />
      </main>
    </CompanionProvider>
  );
}

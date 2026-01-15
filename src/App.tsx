import { useMemo, useState } from "react";
import { PROFILE, NAV, HIGHLIGHTS, SKILLS, EXPERIENCE, PROJECTS, type Project } from "./data";
import { useActiveSection, useScrollProgress, useTheme } from "./hooks/usePortfolio";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import FloatingOrbs from "./components/FloatingOrbs";
import ProjectModal from "./components/projectModal";
import UpsideDownScene from "./components/UpsideDownScene";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import WorkSection from "./sections/WorkSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./sections/Footer";

export default function PortfolioPage() {
  const sectionIds = useMemo(() => NAV.map((n) => n.id), []);
  const active = useActiveSection(sectionIds);
  const progress = useScrollProgress();
  const { theme, toggleTheme } = useTheme();

  const [selected, setSelected] = useState<Project | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <UpsideDownScene />

      <ProgressBar progress={progress} />

      <div className="relative">
        <FloatingOrbs />
      </div>

      <Header
        profile={PROFILE}
        nav={NAV}
        activeSection={active}
        theme={theme}
        onThemeToggle={toggleTheme}
        onNavigate={scrollTo}
      />
      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <HeroSection profile={PROFILE} highlights={HIGHLIGHTS} onNavigate={scrollTo} />
        <AboutSection profile={PROFILE} />
        <SkillsSection skills={SKILLS} />
        <WorkSection experience={EXPERIENCE} />
        <ProjectsSection projects={PROJECTS} onProjectSelect={setSelected} />
        <ContactSection profile={PROFILE} />
        <Footer profileName={PROFILE.name} links={PROFILE.links} />
      </main>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

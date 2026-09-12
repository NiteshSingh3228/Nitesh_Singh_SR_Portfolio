import React from "react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { NavigationDock } from "@/components/NavigationDock";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { EducationSection } from "@/components/EducationSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { ActivitySection } from "@/components/ActivitySection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      {/* AMBIENT BACKGROUND BLOBS */}
      <AmbientBackground />

      {/* MAIN WRAPPER: VERTICAL DOCK LAYOUT */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen max-w-[1600px] mx-auto w-full">
        {/* LEFT-SIDE VERTICAL NAVIGATION BAR / DOCK */}
        <NavigationDock />

        {/* MAIN CANVAS / VERTICAL SCROLLING CONTENT */}
        <div className="flex-1 min-w-0 px-4 sm:px-8 lg:px-10 lg:pl-6 pb-20">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <CertificationsSection />
          <AchievementsSection />
          <ActivitySection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </>
  );
}

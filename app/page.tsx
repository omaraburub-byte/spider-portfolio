import HeroSection from '@/components/sections/HeroSection'
import PanelsSection from '@/components/sections/PanelsSection' 
import StatsSection from '@/components/sections/StatsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ComicSection from '@/components/sections/ComicSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <PanelsSection />  {/* Add this line */}
      <StatsSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ComicSection />
      <ContactSection />
    </div>
  )
}
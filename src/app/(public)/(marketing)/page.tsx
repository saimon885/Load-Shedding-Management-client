import CTASection from "@/components/layout/home/CTASection";
import FeaturesSection from "@/components/layout/home/FeaturesSection";
import HeroSection from "@/components/layout/home/HeroSection";
import HowItWorks from "@/components/layout/home/HowItWorks";
import PowerOverview from "@/components/layout/home/PowerOverview";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <PowerOverview />
      <HowItWorks />
      <FeaturesSection />
      <CTASection />
    </main>
  );
};

export default HomePage;

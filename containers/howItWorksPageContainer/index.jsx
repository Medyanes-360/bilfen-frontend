import GuideSection from "@/components/howItWorks/guideSection";
import HeroSection from "@/components/ui/heroSection";

const HowItWorksPageContainer = () => {
  const customPaths = [
    {
      index: 1, 
      name: "Nasıl Çalışır?", // displayin text
      url: "/how-it-works",
      replace: true 
    },
  ];

  return (
    <>
      <HeroSection title="Nasıl Çalışır?" customPaths={customPaths} />
      <GuideSection />
    </>
  );
};

export default HowItWorksPageContainer;
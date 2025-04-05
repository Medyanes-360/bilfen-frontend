import FaqSection from "@/components/faq/faqSection";
import HeroSection from "@/components/ui/heroSection";

const FaqPageContainer = () => {
  const customPaths = [
    {
      index: 1,
      name: "SSS", // displaying text
      url: "/faq",
      replace: true
    }
  ];

  return (
    <>
      <HeroSection title="Sıkça Sorular Sorular" customPaths={customPaths} />
      <FaqSection />
    </>
  );
};

export default FaqPageContainer;

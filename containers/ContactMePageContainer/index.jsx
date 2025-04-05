import ContactMeSection from "@/components/contact";
import HeroSection from "@/components/ui/heroSection";

const ContactMePageContainer = () => {
  const customPaths = [
    {
      index: 1,
      name: "İletişim", // displaying text
      url: "/contact",
      replace: true
    }
  ];
  
  return (
    <>
      <HeroSection title="Bizimle İletişime Geçin" customPaths={customPaths}/>
      <ContactMeSection />
    </>
  );
};

export default ContactMePageContainer;

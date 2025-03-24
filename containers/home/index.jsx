import FeatureSection from "@/components/home/featureSection";
import GallerySection from "@/components/home/gallerySection";
import InfoSection from "@/components/home/infoSection";
import PartyAddOnsSection from "@/components/home/partyAddOnsSection";
import PartyPackagesSection from "@/components/home/partyPackagesSection";
import TopSlideSection from "@/components/home/topSlideSection";
import SlideSection from "@/components/home/slideSection";
import VideoPart from "@/components/home/videoPart";

export default function HomePageContainer() {
  return (
    <>
      <TopSlideSection />
      <SlideSection />
      <InfoSection />
      <PartyPackagesSection />
      <PartyAddOnsSection />
      <VideoPart />
      <FeatureSection />
      <GallerySection />
    </>
  );
}

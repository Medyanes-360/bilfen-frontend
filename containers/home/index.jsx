"use client"
import FeatureSection from "@/components/home/featureSection";
import InfoSection from "@/components/home/infoSection";
import TopSlideSection from "@/components/home/topSlideSection";
import SlideSection from "@/components/home/slideSection";
import VideoPart from "@/components/home/videoPart";

export default function HomePageContainer() {
  return (
    <>
      <TopSlideSection />
      <SlideSection />
      <InfoSection />
      <VideoPart />
      <FeatureSection />
    </>
  );
}

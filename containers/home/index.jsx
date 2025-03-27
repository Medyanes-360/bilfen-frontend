"use client"
import FeatureSection from "@/components/home/featureSection";
import InfoSection from "@/components/home/infoSection";
import TopSlideSection from "@/components/home/topSlideSection";
import SlideSection from "@/components/home/slideSection";
import VideoPart from "@/components/home/videoPart";
import { signOut } from "next-auth/react";

export default function HomePageContainer() {
  // signOut({ redirect: false });
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

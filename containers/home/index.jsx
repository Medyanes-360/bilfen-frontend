import InfoSection from "@/components/home/infoSection";
import PartyAddOnsSection from "@/components/home/partyAddOnsSection";
import PartyPackagesSection from "@/components/home/partyPackagesSection";
import SlideSection from "@/components/home/slideSection";
import VideoPart from "@/components/home/videoPart";

export default function HomePageContainer() {
    return(
        <>
          <SlideSection/>
          <InfoSection/>
          <PartyPackagesSection/>
          <PartyAddOnsSection/>
          <VideoPart/>
        </>
    );
}
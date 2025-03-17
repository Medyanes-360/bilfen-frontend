import InfoSection from "@/components/home/infoSection";
import PartyPackagesSection from "@/components/home/partyPackagesSection";
import SlideSection from "@/components/home/slideSection";

export default function HomePageContainer() {
    return(
        <>
          <SlideSection/>
          <InfoSection/>
          <PartyPackagesSection/>
        </>
    );
}
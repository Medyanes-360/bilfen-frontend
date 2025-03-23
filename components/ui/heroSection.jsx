import BreadCrumbComponent from "@/components/ui/breadCrumbs";

const HeroSection = ({ title }) => {
  return (
    <div className="relative lg:bg-[url(/images/header-slider-home2.jpg)] bg-no-repeat bg-darklila pt-5 pb-7.5 md:py-12 lg:py-[100px] px-8 overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-2.5 sm:gap-6 text-white font-nunito min-h-[150px]">
        <h1 className="text-[24px] leading-[28px] md:text-[50px] md:leading-[56px] lg:text-[3em] lg:leading-[1.2em] md:font-bold">
          {title}
        </h1>
        <BreadCrumbComponent />
      </div>
    </div>
  );
};

export default HeroSection;

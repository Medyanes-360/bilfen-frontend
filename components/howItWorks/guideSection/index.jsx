"use client";
import PageContainer from "@/containers/pageContainer";
import { Parallax } from "@/globalElements/Parallax";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Icons from "@/public/icons/Icons";

// Prevent hydration mismatch warning
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const GuideSection = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className="bg-[#fff6e9]">
      <PageContainer className="px-3 md:px-6">
        <div id="next-section" className="group z-20 relative py-16 xl:py-36">
          <Parallax
            sensitivity={0.05}
            className="absolute md:top-[9%] top-[12%] right-[1%] hidden lg:block"
          >
            <Image src="/images/star4.png" alt="Star" width={36} height={46} />
          </Parallax>
          <Parallax
            sensitivity={0.05}
            className="absolute top-[62%] md:top-[59%] left-[4%] xxl:left-[0.2%] w-14 h-14 transition-transform duration-400 group-hover:-translate-x-2 group-hover:translate-y-2 hidden lg:block"
          >
            <Image src="/images/star4.png" alt="Star" width={36} height={46} />
          </Parallax>
          <Parallax
            sensitivity={0.05}
            className="absolute bottom-[9%] right-[1%] w-14 h-14 hidden xl:block transition-transform duration-400 group-hover:-translate-x-2 group-hover:translate-y-2"
          >
            <Image src="/images/star4.png" alt="Star" width={36} height={46} />
          </Parallax>
          <Parallax
            sensitivity={0.03}
            rotate={6}
            className="absolute top-[23%] 2xl:-left-[19%] -left-8 hidden xxl:block"
          >
            <Image
              src="/images/rocket3.png"
              alt="Rocket"
              width={100}
              height={200}
            />
          </Parallax>
          <div className="flex flex-col lg:flex-row justify-between w-full mb-10 lg:mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-4">
              Nasıl Çalışır?
            </h2>
            <div className="pl-4 border-l border-[#ff621f] lg:max-w-[500px]">
              <p className="text-lg md:text-xl text-[#595959] font-semibold">
                Başlamanın ne kadar kolay olduğunu keşfedin! Videoyu izleyerek
                Bilfen öğrenme deneyimini yaşayın!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 place-items-center">
            {/* Image */}
            <div className="relative md:col-span-2 z-20 order-2 lg:order-1">
              <Image
                src="/images/kid-w-laptop.png"
                width={492}
                height={516}
                alt="kid-w-laptop"
                objectFit="cover"
              />
            </div>

            {/* ReactPlayer Video */}
            <div className="md:col-span-3 w-full h-full max-h-[350px] order-1 lg:order-2">
              <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden w-full ">
                <div className="relative pb-[56.25%] h-0 overflow-hidden w-full">
                  <iframe
                    src="https://player.vimeo.com/video/386232261?autoplay=1&muted=1&loop=1&background=1"
                    className="absolute top-0 left-0 w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/90 to-transparent w-full h-full"></div>
                <div className="absolute top-4 left-4 md:top-6 lg:top-8 sm:left-6 lg:left-8">
                  <div
                    onClick={() => setIsOpen(true)}
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-24 lg:h-24 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                  >
                    <Icons.Play className="w-full h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>

      {/* Custom Video Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="relative z-10 w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl bg-black rounded-xl overflow-hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 z-10 bg-white text-black p-1 rounded-full hover:bg-white/80 transition-colors"
              aria-label="Close video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://player.vimeo.com/video/386232261?autoplay=1"
                className="absolute top-0 left-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideSection;

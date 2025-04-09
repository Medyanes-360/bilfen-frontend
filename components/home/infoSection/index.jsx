"use client"
import PageContainer from "@/containers/pageContainer";
import React from "react";
import TextPart from "./textPart";
import Icons from "@/public/icons/Icons";
import Image from "next/image";
import { Parallax } from "@/globalElements/Parallax";

const InfoSection = () => {
  return (
    <PageContainer className="px-4">
      {/* Star and rocket animate image mouse moving effects */}
      <div
        id="next-section"
        className="group z-20 relative flex flex-col gap-4 sm:gap-6 py-8 xl:py-20"
      >
        <Parallax
          sensitivity={0.05}
          className="absolute md:top-[10%] top-[15%] right-[2%]"
        >
          <Image src="/images/star4.png" alt="Star" width={24} height={30} />
        </Parallax>
        <Parallax
          sensitivity={0.05}
          className="absolute top-[65%] md:top-[60%] left-[5%] xxl:left-[2%] w-10 h-10 block transition-transform duration-400 group-hover:-translate-x-2 group-hover:translate-y-2"
        >
          <Image src="/images/star4.png" alt="Star" width={24} height={30} />
        </Parallax>
        <Parallax
          sensitivity={0.05}
          className="absolute bottom-[10%] right-[2%] w-10 h-10 hidden xl:block transition-transform duration-400 group-hover:-translate-x-2 group-hover:translate-y-2"
        >
          <Image src="/images/star4.png" alt="Star" width={24} height={30} />
        </Parallax>
        <Parallax
          sensitivity={0.03}
          rotate={6}
          className="absolute top-[25%] 2xl:-left-[15%] -left-6 hidden xxl:block"
        >
          <Image
            src="/images/rocket3.png"
            alt="Rocket"
            width={150}
            height={170}
          />
        </Parallax>
        {/* Text Section */}
        <TextPart />
        {/* ImagePart */}
        <div className="hidden sm:block relative z-10 rounded-2xl bg-[url('/images/happy.png')] bg-center bg-no-repeat bg-cover w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex-shrink-0 self-center mt-4 sm:mt-6"/>
      </div>
    </PageContainer>
  );
};

export default InfoSection;
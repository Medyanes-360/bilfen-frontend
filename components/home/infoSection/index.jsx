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
        className="group z-20 relative flex flex-col xxl:flex-row gap-8 py-8 xl:py-20"
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
        <div className="relative z-10 rounded-2xl sm:bg-[url('/images/happy.png')] bg-center bg-no-repeat bg-cover w-full h-[300px]">
          {/* Content */}
          <div className="absolute rounded-xl -top-6 right-0 z-20 bg-orange p-3 md:pr-12 lg:p-4 lg:pr-20 xxl:p-6 shadow-lg w-full sm:w-fit h-[240px]">
            <div className="space-y-1 text-white">
              <Icons.StarBadge className="w-20 h-20 md:w-16 md:h-16 text-light" />
              <h3 className="text-base text-darklila font-poppins">
                Güvenilir Eğitimin Adresi
              </h3>
              <p className="flex md:flex-col gap-1 text-xl md:text-2xl font-bold font-nunito">
                BİLFEN
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default InfoSection;
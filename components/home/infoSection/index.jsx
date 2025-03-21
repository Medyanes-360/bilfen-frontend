"use client"
import PageContainer from "@/containers/pageContainer";
import React from "react";
import TextPart from "./textPart";
import Icons from "@/public/icons/Icons";
import Image from "next/image";
import { Parallax } from "@/globalElements/Parallax";

const InfoSection = () => {
  return (
    <PageContainer className="px-6">
      {/* Star and rocket animate image mouse moving effects */}
      <div
        id="next-section"
        className="group z-20 relative flex flex-col xxl:flex-row gap-12 py-16 xl:py-36"
      >
        <Parallax
          sensitivity={0.05}
          className="absolute md:top-[9%] top-[12%] right-[1%]"
        >
          <Image src="/images/star4.png" alt="Star" width={36} height={46} />
        </Parallax>
        <Parallax
          sensitivity={0.05}
          className="absolute top-[62%] md:top-[59%] left-[4%] xxl:left-[0.2%]  w-14 h-14 block transition-transform duration-400 group-hover:-translate-x-2 group-hover:translate-y-2"
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
            width={216}
            height={246}
          />
        </Parallax>
        {/* Text Section */}
        <TextPart />
        {/* ImagePart */}
        <div className="relative z-10 rounded-3xl sm:bg-[url('/images/happy.png')] bg-center bg-no-repeat bg-cover w-full h-[410px]">
          {/* Content */}
          <div className="absolute rounded-xl -top-8 right-0 z-20 bg-lightGreen p-4 md:pr-16 lg:p-6 lg:pr-32 xxl:p-10 shadow-lg w-full sm:w-fit h-[320px]">
            <div className="space-y-2 text-white">
              <Icons.StarBadge className="w-32 h-32 md:w-20 md:h-20 text-light" />
              <h3 className="text-lg text-darklila font-poppins">
                Most trusted playground
              </h3>
              <p className="flex md:flex-col gap-2 text-2xl md:text-4xl font-bold font-nunito">
                20 Years of<span>Experience</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default InfoSection;

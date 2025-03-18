import PageContainer from "@/containers/pageContainer";
import React from "react";
import TextPart from "./textPart";
import Icons from "@/public/icons/Icons";
import Image from "next/image";

const InfoSection = () => {
  return (
    <PageContainer>
      <div id="next-section" className="group z-20 relative flex flex-col lg:flex-row gap-12 py-16 xl:py-36 lg:h-screen xl:h-full">
      <div className="absolute top-[9%] right-[1%] w-14 h-14 hidden md:block ransition-transform duration-400 group-hover:-translate-x-2 group-hover:translate-y-2">
        <Image src="/images/star4.png" alt="Star" width={36} height={46} />
      </div>
      <div className="absolute top-[59%] left-[4%] w-14 h-14 hidden xl:block ransition-transform duration-400 group-hover:-translate-x-2 group-hover:translate-y-2">
        <Image src="/images/star4.png" alt="Star" width={36} height={46} />
      </div>
      <div className="absolute bottom-[9%] right-[1%] w-14 h-14 hidden xl:block ransition-transform duration-400 group-hover:-translate-x-2 group-hover:translate-y-2">
        <Image src="/images/star4.png" alt="Star" width={36} height={46} />
      </div>
      <div className="absolute top-[39%] -left-64 w-42 h-42 hidden 2xl:block ransition-transform duration-400 group-hover:-translate-x-2 group-hover:translate-y-2">
        <Image src="/images/rocket3.png" alt="Star" width={216} height={246} />
      </div>
        <TextPart />
        {/* ImagePart */}
        <div className="relative z-10 rounded-3xl sm:bg-[url('/images/happy.png')] bg-center bg-no-repeat bg-cover w-full h-[410px]">
          {/* Content */}
          <div className="absolute rounded-xl -top-8 right-0 z-20 bg-lightGreen p-4 lg:p-6 shadow-lg w-full sm:w-fit h-[320px]">
            <div className="space-y-2 text-white">
              <Icons.StarBadge className="w-40 h-40 md:w-20 md:h-20 text-light" />
              <h3 className="text-lg text-darklila font-poppins">
                Most trusted playground
              </h3>
              <p className="flex lg:flex-col gap-2 text-2xl md:text-4xl font-bold font-nunito">20 Years of <span>Experience</span></p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default InfoSection;

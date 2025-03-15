import PageContainer from "@/containers/pageContainer";
import React from "react";
import TextPart from "./textPart";
import Icons from "@/public/icons/Icons";

const InfoSection = () => {
  return (
    <PageContainer>
      <div className="flex flex-col lg:flex-row gap-12 py-12">
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

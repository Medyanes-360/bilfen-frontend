"use client";
import FaqPage from "@/components/faq";
import MainTopicPage from "@/components/mainTopicPage";
import { Parallax } from "@/globalElements/Parallax";
import Image from "next/image";
import { useState } from "react";

const FaqSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <section className="relative py-16 xl:py-26">
      <Parallax
        sensitivity={0.05}
        className="absolute top-[12%] md:top-[9%] right-[1%] hidden lg:block"
      >
        <Image src="/images/star4.png" alt="Star" width={36} height={46} />
      </Parallax>
      <Parallax
        sensitivity={0.05}
        className="absolute top-[22%] md:top-[32%] left-[8%] hidden lg:block"
      >
        <Image src="/images/star4.png" alt="Star" width={36} height={46} />
      </Parallax>
      <Parallax
        sensitivity={0.05}
        className="absolute top-[62%] md:top-[59%] left-[4%] xxl:left-[0.2%] w-32 h-32 rotate-90 transition-transform duration-400 group-hover:-translate-x-2 group-hover:translate-y-2 hidden lg:block"
      >
        <Image src="/images/comet_2.png" alt="Star" width={260} height={256} />
      </Parallax>
      <Parallax
        sensitivity={0.05}
        className="absolute bottom-[9%] right-[1%] w-14 h-14 hidden xl:block transition-transform duration-400 group-hover:-translate-x-2 group-hover:translate-y-2"
      >
        <Image src="/images/star4.png" alt="Star" width={36} height={46} />
      </Parallax>
      <FaqPage onSearch={setSearchTerm} />
      <MainTopicPage searchTerm={searchTerm} />
    </section>
  );
};

export default FaqSection;

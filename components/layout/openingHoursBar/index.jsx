"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Icons from "@/public/icons/Icons";

const OpeningHoursBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBar(true);
      } else {
        setShowBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block transition-opacity duration-300 ${
        showBar ? "opacity-100" : "opacity-0 pointer-events-auto"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Pop-up Panel*/}
        {isExpanded && (
          <div className="-z-20 absolute right-0 mr-6 bg-darklila rounded-4xl py-6 pl-20 pr-28 shadow-lg">
            <h3 className="text-2xl text-center font-poppins font-medium mb-6 text-white">
              Opening Hours
            </h3>
            <div className="space-y-3 text-gray-300 font-normal font-nunito">
              <p className="text-lg">Mon-Fri: 10am – 4.30pm</p>
              <p className="text-lg">Sat: 9.30am – 3.00pm</p>
              <p className="text-lg">Sun: 10.00 am – 3.00pm</p>
              <p className="text-lg">Public Holidays: as advertised</p>
            </div>
            <div className="flex gap-8 mt-8 justify-center">
              <Link
                href="/#"
                className="flex items-center gap-2 text-white transition-colors"
              >
                <div className="text-orange rounded-full p-2">
                  <Icons.Location className="w-[28px] h-[28px]" />
                </div>
                <span className="font-semibold">Find Us</span>
              </Link>
              <Link
                href="/#"
                className="flex items-center gap-2 text-white transition-colors"
              >
                <div className="text-orange rounded-full p-2">
                  <Icons.Facebook className="w-[28px] h-[28px]" />
                </div>
                <span className="font-semibold">Follow Us</span>
              </Link>
            </div>
          </div>
        )}
        {/* Button */}
        <div
          className=" bg-[#4e3d9c] text-white rounded-full py-14 px-2.5 flex flex-col items-center justify-start cursor-pointer shadow-lg"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="bg-darklila rounded-full p-4 mb-5">
            <Icons.Clock className="w-[34px] h-[34px]" />
          </div>
          <div
            className="vertical-text rotate-0 whitespace-nowrap font-medium text-2xl"
            style={{ writingMode: "vertical-rl" }}
          >
            Opening Hours
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningHoursBar;

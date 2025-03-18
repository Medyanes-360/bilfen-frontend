'use client'
import { useState } from "react";
import Link from "next/link";

const OpeningHoursBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="fixed right-12 top-1/2 transform z-40 hidden xl:block">
      <div className="flex flex-col">
        <div 
          className={`bg-darklila/85 text-white ${isExpanded ? "rounded-xl" :"rounded-full"}  py-6 px-6 flex flex-col items-start cursor-pointer transition-all duration-300 shadow-lg ${isExpanded ? 'translate-x-0' : 'translate-x-[calc(100%-60px)]'}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <h3 className="text-3xl font-bold mb-6 text-white">Opening Hours</h3>
              <div className="space-y-3 text-center text-white">
                <p className="text-lg">Mon-Fri: 10am – 4.30pm</p>
                <p className="text-lg">Sat: 9.30am – 3.00pm</p>
                <p className="text-lg">Sun: 10.00 am – 3.00pm</p>
                <p className="text-lg">Public Holidays: as advertised</p>
              </div>
              <div className="flex gap-8 mt-8">
                <Link href="/#" className="text-white flex items-center gap-2 hover:text-orange transition-colors">
                  <div className="bg-orange rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <span className="font-semibold">Find Us</span>
                </Link>
                <Link href="/#" className="text-white flex items-center gap-2 hover:text-orange transition-colors">
                  <div className="bg-orange rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </div>
                  <span className="font-semibold">Follow Us</span>
                </Link>
              </div>
            </>
          ) : (
            <div className="vertical-text rotate-0 whitespace-nowrap font-semibold text-xl" style={{ writingMode: 'vertical-rl' }}>
              Opening Hours
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpeningHoursBar;
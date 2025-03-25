"use client";

import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Icons from "@/public/icons/Icons";
import Link from "next/link";

const slides = [
  {
    image: "/images/img1.webp",
    title: "Okul öncesi keşif dünyası",
    highlight: "",
    venue: "BİLFEN'de",
    description: "Çocuklar için keşfetmeye, öğrenmeye ve eğlenmeye teşvik eden aktiviteler",
    buttonText: "Hakkımızda",
    buttonLink: "/sss",
  },
  {
    image: "/images/img2.webp",
    title: "Öğrenirken eğleniyoruz",
    highlight: "",
    venue: "Büyümek ve keşfetmek için",
    description: "Çocukların yaratıcılığını geliştirecek eğitici etkinlikler mi arıyorsunuz?",
    buttonText: "Tıkla katıl!",
    buttonLink: "/login",
  },
  {
    image: "/images/img3.webp",
    title: "Eğitici etkinlikler",
    highlight: "",
    venue: "BİLFEN'de",
    description: "Öğrenmeyi oluşturan etkinliklerimizin keyfini çıkarın",
    buttonText: "İletişime geçelim",
    buttonLink: "/contact",
  },
];

const SlideSection = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  // Scroll to next section function
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('next-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Set up auto-rotation
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    api.on("select", onSelect);

    const autoRotationInterval = setInterval(() => {
      api.scrollNext();
    }, 15000); 

    return () => {
      api.off("select", onSelect);
      clearInterval(autoRotationInterval);
    };
  }, [api]);

  return (
    <div className="relative lg:bg-[url(/images/header-slider-home2.jpg)] bg-no-repeat bg-darklila py-4 md:py-12 2xl:py-20 px-8 overflow-hidden">
      {/* Social media icons visible only on xxl (1440px) screens*/}
      <div className="z-10 hidden xxl:flex flex-col gap-4 absolute right-12 -bottom-18 -translate-y-1/2">
        <Link href="https://www.instagram.com/themerex_net/#" target="_blank" aria-label="Instagram">
          <div className="bg-[#4a4294] opacity-[1] rounded-full p-3 hover:bg-white hover:opacity-100 transition-colors duration-300 shadow-md">
            <Icons.Instagram className="z-27 w-8 h-8 opacity-100 text-white hover:text-darklila" />
          </div>
        </Link>
        <Link href="https://x.com/ThemerexThemes" target="_blank" aria-label="Twitter">
          <div className="bg-[#4a4294] opacity-[1] rounded-full p-3 hover:bg-white hover:opacity-100 transition-colors duration-300 shadow-md">
            <Icons.Twitter className="z-20 w-8 h-8 opacity-100 text-white hover:text-darklila" />
          </div>
        </Link>
        <Link href="https://www.facebook.com/ThemeRexStudio" target="_blank" aria-label="Facebook">
          <div className="bg-[#4a4294] opacity-[1] rounded-full p-3 hover:bg-white hover:opacity-100 transition-colors duration-300 shadow-md">
            <Icons.Facebook className="z-20 w-8 h-8 opacity-100 text-white hover:text-darklila" />
          </div>
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="group hidden xl:flex flex-col items-center absolute left-3 bottom-8 z-20 cursor-pointer" onClick={scrollToNextSection}>
        <span className="text-white group-hover:text-orange font-nunito text-lg font-bold rotate-90 mb-4">Aşağı Kaydır</span>
        <div className="mt-1">
          <Icons.SlideArrow className="rotate-90 fill-white group-hover:fill-orange w-6 h-6" />
        </div>
      </div>

      <Carousel 
        setApi={setApi}
        className="w-full max-w-7xl mx-auto px-4 md:px-5"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0 px-2">
              <div className="cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-3 md:px-4 xl:px-12 font-poppins">
                <div className="flex items-center justify-center relative overflow-hidden rounded-2xl">
                  <div className={`transition-all duration-1000 ${current === index ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={712}
                      height={464}
                      className="w-full sm:w-[280px] h-auto md:w-[378px] md:h-auto lg:w-[512px] lg:h-auto xl:w-[705px] xl:h-auto object-cover"
                    />
                  </div>
                </div>
                
                <div className="max-w-lg flex flex-col items-center md:items-start gap-2 lg:gap-5 text-white md:max-h-[444px] px-2 lg:px-8">
                  <div className={`transition-all duration-1000 delay-300 ${current === index ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                    <h2 className="text-3xl md:text-[37px] lg:text-5xl xl:text-6xl font-semibold text-center md:text-left">
                      {slide.title}{" "}
                      <span className="text-orange">{slide.highlight}</span>
                      <br />
                      <div className="mt-3 text-orange">{slide.venue}</div>
                    </h2>
                  </div>
                  
                  <div className={`hidden md:flex transition-all duration-1000 delay-500 ${current === index ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                    <p className="text-base md:text-[15px] lg:text-lg xl:text-xl opacity-90 text-center md:text-left">
                      {slide.description}
                    </p>
                  </div>
                  
                  <div className={`transition-all duration-1000 delay-700 ${current === index ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                    <Button 
                      asChild
                      className="bg-orange py-5 md:py-8 hover:bg-white hover:text-black text-white mt-4"
                    >
                      <a href={slide.buttonLink}>{slide.buttonText}</a>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="abolute -left-2 -bottom-4 hidden md:flex gap-1 mt-4 ml-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`focus:outline-none transition-colors duration-300`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <Icons.SlideArrow 
                className={`cursor-pointer hover:fill-orange w-6 h-6 ${current === index ? 'text-orange fill-orange-500' : 'text-white fill-white'}`} 
              />
            </button>
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default SlideSection;
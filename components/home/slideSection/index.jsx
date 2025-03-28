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
    title: "Eğitimle Keşfedin, Geleceği Şekillendirin",
    highlight: "",
    venue: "BİLFEN Online",
    description: "Çocuklarınız için interaktif, eğlenceli ve öğretici online eğitim içerikleriyle öğrenme dünyasını keşfedin.",
    buttonText: "Daha Fazla Bilgi",
    buttonLink: "/faq",
  },
  {
    image: "/images/img2.webp",
    title: "Öğrenirken Eğleniyorlar",
    highlight: "",
    venue: "BİLFEN Online",
    description: "Çocuklarınızın yaratıcılığını geliştirecek eğitici online içerikler ile öğrenme sürecini daha eğlenceli hale getirin.",
    buttonText: "Nasıl Çalıştığını Görün",
    buttonLink: "/how-it-works",
  },
  {
    image: "/images/img3.webp",
    title: "Eğitici Online Etkinlikler",
    highlight: "",
    venue: "BİLFEN Online",
    description: "Bilfen'in eğitici online içerikleri ile çocuklarınızın gelişimini her adımda destekleyin.",
    buttonText: "Bize Ulaşın",
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
    <div className="relative lg:bg-[url(/images/header-slider-home2.jpg)] bg-no-repeat bg-cover bg-center bg-darklila py-6 md:py-14 2xl:py-24 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Social media icons - improved positioning and responsiveness */}
      <div className="z-10 hidden lg:flex flex-col gap-5 absolute right-6 md:right-8 lg:right-12 bottom-10 lg:-translate-y-1/2">
        <Link href="https://www.instagram.com/bilfen" target="_blank" aria-label="Instagram">
          <div className="bg-[#4a4294] hover:bg-white rounded-full p-3 transition-all duration-300 shadow-lg transform hover:scale-110">
            <Icons.Instagram className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white hover:text-darklila transition-colors" />
          </div>
        </Link>
        <Link href="https://x.com/bilfen" target="_blank" aria-label="Twitter">
          <div className="bg-[#4a4294] hover:bg-white rounded-full p-3 transition-all duration-300 shadow-lg transform hover:scale-110">
            <Icons.Twitter className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white hover:text-darklila transition-colors" />
          </div>
        </Link>
        <Link href="https://www.facebook.com/bilfenegitimkurumlari" target="_blank" aria-label="Facebook">
          <div className="bg-[#4a4294] hover:bg-white rounded-full p-3 transition-all duration-300 shadow-lg transform hover:scale-110">
            <Icons.Facebook className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white hover:text-darklila transition-colors" />
          </div>
        </Link>
      </div>

      {/* Scroll indicator - improved animation and visibility */}
      <div className="group hidden md:flex flex-col items-center absolute left-4 sm:left-6 md:left-8 bottom-8 z-20 cursor-pointer animate-bounce hover:animate-none" onClick={scrollToNextSection}>
        <span className="text-white group-hover:text-orange font-nunito text-base sm:text-lg font-bold rotate-90 mb-4 transition-colors duration-300">Aşağı Kaydır</span>
        <div className="mt-1 transform group-hover:translate-y-1 transition-transform duration-300">
          <Icons.SlideArrow className="rotate-90 fill-white group-hover:fill-orange w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      <Carousel
        setApi={setApi}
        className="w-full max-w-7xl mx-auto"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0 px-2">
              <div className="cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-center p-3 md:p-5 lg:p-8 xl:p-12 font-poppins">
                {/* Image container with improved animations and responsiveness */}
                <div className="flex items-center justify-center relative overflow-hidden rounded-2xl shadow-xl">
                  <div className={`transition-all duration-1000 ${current === index ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                    <Image
                      src={slide.image || "/images/img1.svg"}
                      alt={slide.title || "Slide image"}
                      width={712}
                      height={464}
                      className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-700"
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* Content container with improved spacing and animations */}
                <div className="max-w-lg flex flex-col items-center md:items-start gap-3 md:gap-4 lg:gap-5 text-white px-2 sm:px-4 lg:px-8">
                  <div className={`transition-all duration-1000 delay-300 ${current === index ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                    <h2 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left leading-tight">
                      {slide.title}{" "}
                      <span className="text-orange">{slide.highlight}</span>
                      <div className="mt-3 text-orange font-semibold">{slide.venue}</div>
                    </h2>
                  </div>

                  <div className={`transition-all duration-1000 delay-500 ${current === index ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 text-center md:text-left leading-relaxed">
                      {slide.description}
                    </p>
                  </div>

                  {/* Improved button styling */}
                  <div className={`transition-all duration-1000 delay-700 ${current === index ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                    <Button
                      asChild
                      className="bg-orange hover:bg-white text-white hover:text-black mt-5 md:mt-6 lg:mt-8 px-6 sm:px-8 py-3 sm:py-4 md:py-5 lg:py-6 text-base sm:text-lg md:text-xl rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      <a href={slide.buttonLink}>{slide.buttonText}</a>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Improved carousel navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 md:left-12 md:translate-x-0 hidden md:flex gap-3 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`focus:outline-none transition-all duration-300 transform hover:scale-125`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <Icons.SlideArrow
                className={`cursor-pointer w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${current === index
                    ? 'text-orange fill-orange-500 scale-110'
                    : 'text-white fill-white opacity-70 hover:opacity-100'
                  }`}
              />
            </button>
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default SlideSection;
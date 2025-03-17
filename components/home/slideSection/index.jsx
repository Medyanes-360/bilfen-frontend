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

const slides = [
  {
    image: "/images/img1.webp",
    title: "Birthdays",
    highlight: "at",
    venue: "Tediss Park",
    description: "Ideas for Kids Birthday Parties, Private Playdates, and Special Events",
    buttonText: "More About Us",
    buttonLink: "/about",
  },
  {
    image: "/images/img2.webp",
    title: "Fun Events",
    highlight: "to",
    venue: "Remember!",
    description: "Looking for a fun way to raise some money for your cause?",
    buttonText: "Book a Party",
    buttonLink: "/book-party",
  },
  {
    image: "/images/img3.webp",
    title: "Enjoy Our",
    highlight: "",
    venue: "Softplay Area",
    description: "Our indoor softplay area is a unique soft play area for infants and toddlers.",
    buttonText: "View Our Cafe",
    buttonLink: "/cafe",
  },
];

const SlideSection = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  // Set up auto-rotation
  useEffect(() => {
    if (!api) return;

    // Update current slide when the carousel changes
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
    <div className="bg-darklila py-4 md:py-12 px-8">
      <Carousel 
        setApi={setApi}
        className="w-full max-w-6xl mx-auto"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-3 md:p-6 font-poppins">
                <div className="flex items-center justify-center relative overflow-hidden rounded-2xl">
                  <div className={`transition-all duration-1000 ${current === index ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={512}
                      height={337}
                      className="w-full h-[200px] md:h-[400px] object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col items-center md:items-start gap-5 text-white md:h-[337px] px-4 md:px-5 lg:px-12">
                  <div className={`transition-all duration-1000 delay-300 ${current === index ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                    <h2 className="text-4xl md:text-5xl font-semibold">
                      {slide.title}{" "}
                      <span className="text-orange">{slide.highlight}</span>
                      <br />
                      <div className="mt-3 text-orange">{slide.venue}</div>
                    </h2>
                  </div>
                  
                  <div className={`hidden md:flex transition-all duration-1000 delay-500 ${current === index ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                    <p className="text-base md:text-lg opacity-90">
                      {slide.description}
                    </p>
                  </div>
                  
                  <div className={`transition-all duration-1000 delay-700 ${current === index ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                    <Button 
                      asChild
                      className="bg-orange py-8 hover:bg-white hover:text-black text-white mt-4"
                    >
                      <a href={slide.buttonLink}>{slide.buttonText}</a>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="abolute -left-2 -bottom-4 hidden md:flex gap-1 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`focus:outline-none transition-colors duration-300`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <Icons.SlideArrow 
                className={`hover:fill-orange w-6 h-6 ${current === index ? 'text-orange fill-orange-500' : 'text-white fill-white'}`} 
              />
            </button>
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default SlideSection;
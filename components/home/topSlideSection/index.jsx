'use client';

import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/images/top-slide-1.jpg',
  },
  {
    image: '/images/top-slide-2.jpg',
  },
  {
    image: '/images/top-slide-3.jpg',
  },
];

export default function TopSlideSection() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    const autoRotationInterval = setInterval(() => {
      api.scrollNext();
    }, 10000);

    return () => {
      api.off('select', onSelect);
      clearInterval(autoRotationInterval);
    };
  }, [api]);

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';

    return () => {
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);

  const goPrev = () => api && api.scrollPrev();
  const goNext = () => api && api.scrollNext();

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] overflow-hidden">
      {/* Slide Container */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              current === index ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
            }`}
          >
            <Image
              src={slide.image || "/top-slide-1.jpg"}
              alt={`Slide ${index + 1}`}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent opacity-60" />
          </div>
        ))}
      </div>

      {/* Carousel for Controls */}
      <Carousel
        opts={{
          loop: true,
          align: 'start',
          containScroll: 'trimSnaps',
        }}
        setApi={setApi}
        className="relative z-20 w-full h-full"
      >
        <CarouselContent className="invisible">
          {slides.map((_, i) => (
            <CarouselItem key={i} className="w-full" />
          ))}
        </CarouselContent>

        {/* Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full p-2 backdrop-blur-md bg-white/30 hover:bg-white/70 transition-all duration-200 shadow-lg border border-white/40 hover:scale-105 cursor-pointer"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </button>

        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full p-2 backdrop-blur-md bg-white/30 hover:bg-white/70 transition-all duration-200 shadow-lg border border-white/40 hover:scale-105 cursor-pointer"
        >
          <ChevronRight className="h-6 w-6 text-gray-800" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                current === index ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
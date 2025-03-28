"use client";

import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    image: "/images/dijital_egitim_1.png",
    buttonLink: "/faq",
  },
  {
    image: "/images/dijital_egitim_2.png",
    buttonLink: "/how-it-works",
  },
  {
    image: "/images/dijital_egitim_3.png",
    buttonLink: "/contact",
  },
];

export default function TopSlideSection() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  // Auto-switching
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    api.on("select", onSelect);

    const autoRotationInterval = setInterval(() => {
      api.scrollNext();
    }, 10000);

    return () => {
      api.off("select", onSelect);
      clearInterval(autoRotationInterval);
    };
  }, [api]);

  return (
    <div className="relative w-full overflow-hidden">
      <style jsx global>{`
        .carousel-reset {
          margin: 0 !important;
          padding: 0 !important;
        }
        .carousel-reset > * {
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>

      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        setApi={setApi}
        className="w-full carousel-reset"
      >
        <CarouselContent className="w-full carousel-reset">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative w-full p-0 m-0 carousel-reset">
              <Link href={slide.buttonLink} className="block w-full cursor-pointer">
                <div
                  className={`transition-all duration-1000 ease-in-out transform ${
                    current === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
                  }`}
                >
                  <div className="relative w-full h-[calc(100vh-80px)]">
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt={`Slide ${index + 1}`}
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent opacity-60"></div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
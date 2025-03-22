"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const slides = [
    {
      image: "/images/dijital_egitim_1.webp",
      title: "Dijital Eğitim Altyapısı",
      description:
        "Bilfen Okulları olarak öğrenci ve öğretmenlere özel dijital materyallere erişim sağlıyoruz.",
      buttonText: "Platformu Keşfedin",
      buttonLink: "/sss",
    },
    {
      image: "/images/dijital_egitim_2.webp",
      title: "Öğretmen ve Öğrenci Odaklı",
      description:
        "İhtiyaç duyulan materyalleri admin panelinden ekleyip yayın saatlerini planlayabilirsiniz.",
      buttonText: "Nasıl Çalışır?",
      buttonLink: "/how-it-works", 
    },
    {
      image: "/images/dijital_egitim_3.webp",
      title: "Geleceğe Hazırlık",
      description:
        "8 aylık bir eğitim sürecinde hangi gün hangi içerik gösterilecek, planlayabilir ve yönetebilirsiniz.",
      buttonText: "Daha Fazla Bilgi",
      buttonLink: "/contact", 
    },
  ];
  
export default function TopSlideSection() {
  const [api, setApi] = React.useState(null);
  const [current, setCurrent] = React.useState(0);

  // auto-switching
  React.useEffect(() => {
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
      <Carousel
        opts={{
          loop: true,
        }}
        setApi={setApi}
        className="w-full h-full max-w-screen-2xl mx-auto"
      >
        <CarouselContent className="w-full my-2">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative w-full">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-4">
                {/* Image */}
                <div className="relative w-full max-w-3xs overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={800}
                    height={400}
                    className={`h-auto min-h-[200px] max-h-[300px] object-cover transition-all duration-700 ${
                      current === index
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                  />
                </div>

                {/*Text and Button*/}
                <div
                  className={`max-w-lg transition-all duration-500 ${
                    current === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <p className="text-antrasit font-poppins text-base md:text-[15px] lg:text-lg xl:text-xl opacity-90 mb-4">{slide.description}</p>
                  <Button className="cursor-pointer hover:bg-darklila">
                    <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Slider navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-2 h-2 rounded-full ${
                current === index ? "bg-orange" : "bg-gray-300"
              }`}
              aria-label={`Görsel ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}

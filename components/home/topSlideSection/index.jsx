"use client"

import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const slides = [
  {
    image: "/images/dijital_egitim_1.webp",
    title: "Dijital Eğitim Altyapısı",
    description: "Bilfen Okulları olarak öğrenci ve öğretmenlere özel dijital materyallere erişim sağlıyoruz.",
    buttonText: "Platformu Keşfedin",
    buttonLink: "/sss",
  },
  {
    image: "/images/dijital_egitim_2.webp",
    title: "Öğretmen ve Öğrenci Odaklı",
    description: "İhtiyaç duyulan materyalleri admin panelinden ekleyip yayın saatlerini planlayabilirsiniz.",
    buttonText: "Nasıl Çalışır?",
    buttonLink: "/how-it-works",
  },
  {
    image: "/images/dijital_egitim_3.webp",
    title: "Geleceğe Hazırlık",
    description: "8 aylık bir eğitim sürecinde hangi gün hangi içerik gösterilecek, planlayabilir ve yönetebilirsiniz.",
    buttonText: "Bizimle İletişime Geçin",
    buttonLink: "/contact",
  },
]

export default function TopSlideSection() {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)

  // Auto-switching
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }
    api.on("select", onSelect)

    const autoRotationInterval = setInterval(() => {
      api.scrollNext()
    }, 10000)

    return () => {
      api.off("select", onSelect)
      clearInterval(autoRotationInterval)
    }
  }, [api])

  return (
    <div className="relative w-full overflow-hidden bg-[color:var(--color-darklila)] py-4 md:py-8 lg:py-12">
      <Carousel
        opts={{
          loop: true,
        }}
        setApi={setApi}
        className="w-full h-full max-w-7xl mx-auto px-4 md:px-6"
      >
        <CarouselContent className="w-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center p-3 md:p-6">
                {/* Image */}
                <div className="flex items-center justify-center relative overflow-hidden rounded-2xl order-1">
                  <div
                    className={`transition-all duration-1000 ${current === index ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={712}
                      height={464}
                      className="w-full h-[300px] object-cover rounded-lg shadow-md"
                      style={{ height: "300px" }}
                    />
                  </div>
                </div>

                {/* Text and Button */}
                <div className="flex flex-col items-center md:items-start gap-4 lg:gap-6 text-white px-2 lg:px-4 order-2">
                  <div
                    className={`transition-all duration-1000 delay-300 ${current === index ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
                  >
                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-center md:text-left mb-3">
                      {slide.title}
                    </h2>
                  </div>

                  <div
                    className={`transition-all duration-1000 delay-500 ${current === index ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
                  >
                    <p className="text-base md:text-lg lg:text-xl opacity-90 text-center md:text-left">
                      {slide.description}
                    </p>
                  </div>

                  <div
                    className={`transition-all duration-1000 delay-700 ${current === index ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
                  >
                    <Button
                      asChild
                      className="bg-orange hover:bg-white hover:text-[color:var(--color-darklila)] text-white mt-4 py-4 px-6"
                    >
                      <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Slider navigation dots - hidden on small screens, visible on medium and up */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                current === index ? "bg-orange" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Görsel ${index + 1}`}
            />
          ))}
        </div>

      </Carousel>
    </div>
  )
}
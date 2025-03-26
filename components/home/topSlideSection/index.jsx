"use client"

import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"

const slides = [
  {
    image: "/images/dijital_egitim_1.webp",
    buttonLink: "/faq",
  },
  {
    image: "/images/dijital_egitim_2.webp",
    buttonLink: "/how-it-works",
  },
  {
    image: "/images/dijital_egitim_3.webp",
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
    <div className="relative w-full h-[300px] flex items-center justify-center bg-orange py-2 md:py-4 lg:py-6">
      <Carousel
        opts={{
          loop: true,
        }}
        setApi={setApi}
        className="w-full h-full max-w-5xl mx-auto px-4 md:px-6"
      >
        <CarouselContent className="w-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative w-full flex items-center justify-center">
              {/* Image with Link */}
              <Link href={slide.buttonLink}>
                <div
                  className={`transition-all duration-1000 ${
                    current === index ? "scale-100 opacity-100" : "scale-90 opacity-0"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title || "Slide image"}
                    width={600}
                    height={350}
                    className="w-auto h-[250px] object-cover rounded-lg shadow-md cursor-pointer"
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Slider navigation dots - hidden on small screens, visible on medium and up */}
        <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 hidden md:flex gap-2 z-10">
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
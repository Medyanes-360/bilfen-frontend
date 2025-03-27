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
    <div className="relative w-screen h-auto flex flex-col items-center justify-center bg-darklila overflow-hidden">
      <Carousel
        opts={{
          loop: true,
        }}
        setApi={setApi}
        className="w-full h-auto"
      >
        <CarouselContent className="w-full flex justify-center">
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="relative w-full max-w-[90%] sm:max-w-[80%] flex items-center justify-center mx-auto"
            >
              {/* Image with Link */}
              <Link href={slide.buttonLink}>
                <div
                  className={`transition-all duration-1000 ${current === index ? "scale-100 opacity-100" : "scale-90 opacity-0"
                    }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title || "Slide image"}
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer"
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="hidden lg:block w-full bg-darklila h-20"></div>
    </div>
  );
}
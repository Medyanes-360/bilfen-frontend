"use client"

import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"

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

  // Add effect to force prevent horizontal scrolling
  useEffect(() => {
    // Force body to have no horizontal scroll
    document.body.style.overflowX = "hidden"
    document.documentElement.style.overflowX = "hidden"
    document.body.style.width = "100%"
    document.documentElement.style.width = "100%"

    return () => {
      // Cleanup if component unmounts
      document.body.style.overflowX = ""
      document.documentElement.style.overflowX = ""
      document.body.style.width = ""
      document.documentElement.style.width = ""
    }
  }, [])

  return (
    <div className="relative w-full" style={{ overflowX: "hidden", maxWidth: "100vw" }}>
      <style jsx global>{`
        /* Aggressive reset to prevent horizontal scrolling */
        html, body {
          overflow-x: hidden !important;
          max-width: 100vw !important;
          position: relative;
        }
        
        /* Force all carousel elements to stay within bounds */
        .embla {
          overflow: hidden !important;
          max-width: 100vw !important;
        }
        
        .embla__container {
          max-width: 100vw !important;
        }
        
        .embla__slide {
          max-width: 100vw !important;
        }
        
        /* Ensure no element can cause horizontal overflow */
        * {
          max-width: 100vw;
          box-sizing: border-box;
        }
        
        /* Ensure transforms don't cause overflow */
        .scale-effect {
          transform-origin: center;
          overflow: hidden;
        }
      `}</style>

      <Carousel
        opts={{
          loop: true,
          align: "start",
          containScroll: "trimSnaps",
        }}
        setApi={setApi}
        className="w-full"
        style={{ maxWidth: "100vw", overflowX: "hidden" }}
      >
        <CarouselContent className="w-full" style={{ maxWidth: "100vw", margin: 0, padding: 0 }}>
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="relative w-full p-0 m-0"
              style={{ maxWidth: "100vw", overflowX: "hidden" }}
            >
              <Link href={slide.buttonLink} className="block w-full cursor-pointer">
                <div className="overflow-hidden w-full" style={{ maxWidth: "100vw" }}>
                  <div
                    className={`scale-effect transition-all duration-1000 ease-in-out ${
                      current === index ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      transform: current === index ? "scale(1)" : "scale(1.05)",
                      maxWidth: "100vw",
                      overflow: "hidden",
                    }}
                  >
                    <div className="relative w-full h-[calc(100vh-80px)]">
                      <Image
                        src={slide.image || "/dijitai_egitim_1.png"}
                        alt={`Slide ${index + 1}`}
                        fill
                        priority={index === 0}
                        sizes="100vw"
                        className="object-cover object-center"
                        style={{ maxWidth: "100%" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent opacity-60"></div>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
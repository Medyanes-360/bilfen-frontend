'use client'

import { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'

const slides = [
  {
    image: '/images/dijital_egitim_1.png',
    buttonLink: '/faq',
  },
  {
    image: '/images/dijital_egitim_2.png',
    buttonLink: '/how-it-works',
  },
  {
    image: '/images/dijital_egitim_3.png',
    buttonLink: '/contact',
  },
]

export default function TopSlideSection() {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', onSelect)

    const autoRotationInterval = setInterval(() => {
      api.scrollNext()
    }, 10000)

    return () => {
      api.off('select', onSelect)
      clearInterval(autoRotationInterval)
    }
  }, [api])

  useEffect(() => {
    document.body.style.overflowX = 'hidden'
    document.documentElement.style.overflowX = 'hidden'

    return () => {
      document.body.style.overflowX = ''
      document.documentElement.style.overflowX = ''
    }
  }, [])

  return (
    <div className="relative w-full overflow-hidden">
      <Carousel
        opts={{
          loop: true,
          align: 'start',
          containScroll: 'trimSnaps',
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="flex snap-x snap-mandatory overflow-hidden">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="w-full flex-shrink-0 snap-start">
              <Link href={slide.buttonLink} className="block w-full h-full">
                <div className="relative w-full h-[calc(100vh-80px)]">
                  <div
                    className={`transition-all duration-1000 ease-in-out ${
                      current === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    } w-full h-full`}
                  >
                    <Image
                      src={slide.image}
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
  )
}

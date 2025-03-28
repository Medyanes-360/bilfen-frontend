"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Icons from "@/public/icons/Icons";
import { Parallax } from "@/globalElements/Parallax";

const VideoPart = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative py-12 md:py-16 lg:py-28 xl:py-46 px-4 sm:px-6 md:px-8 bg-[#b2eaee] overflow-hidden group">
      {/* Stars and the moon will move */}
      <Parallax
        sensitivity={0.05}
        className="absolute top-1 left-10 w-12 h-12"
      >
        <Image src="/images/star_2.png" alt="Star" width={48} height={48} />
      </Parallax>

      <Parallax
        sensitivity={0.05}
        className="absolute bottom-20 left-[15%] w-16 h-16"
      >
        <Image src="/images/star_3.png" alt="Star" width={84} height={64} />
      </Parallax>

      <Parallax className="absolute top-[20%] right-[10%] w-14 h-14">
        <Image src="/images/star_4.png" alt="Star" width={56} height={56} />
      </Parallax>

      <Parallax className="absolute bottom-[32%] right-[9%] w-10 h-10">
        <Image src="/images/star_5.png" alt="Star" width={40} height={40} />
      </Parallax>

      <Parallax className="absolute top-[79%] right-[5%] w-40 h-40">
        <Image
          sensitivity={0.04}
          src="/images/moon.png"
          alt="Moon"
          width={180}
          height={180}
        />
      </Parallax>

      <div className="container mx-auto relative z-10 xxl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Video Preview Section */}
          <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden w-full max-w-[580px] mx-auto">
            <div className="relative pb-[56.25%] h-0 overflow-hidden">
              <iframe
                src="https://player.vimeo.com/video/386232261?autoplay=1&muted=1&loop=1&background=1"
                className="absolute top-0 left-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/90 to-transparent w-full h-full"></div>
            <div className="absolute top-8 left-4 sm:left-6 md:left-8">
              <div
                onClick={() => setIsOpen(true)}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 flex items-center justify-center"
              >
                <Icons.Play className="w-full h-full" />
              </div>
            </div>

            <div className="absolute bottom-2 left-12 md:bottom-2 md:left-0 p-4 sm:p-5 md:p-6">
              <h3 className="font-nunito text-5xl font-bold text-white">
                BİLFEN
                <br />
                EĞİTİM
              </h3>
            </div>
          </div>

          {/* Text Section */}
          <div className="text-[#341c77] w-full max-w-lg mx-auto md:mx-0 mt-6 md:mt-0">
            <h2 className="text-3xl lg:text-5xl font-nunito font-bold mb-4 sm:mb-5 md:mb-6">
              Değerlerimize
              <br className="hidden sm:block" /> Bağlıyız
            </h2>
            <p className="text-antrasit font-extralight text-base sm:text-lg mb-6 sm:mb-7 md:mb-8">
              Merkezimiz, çocuklarınızın güvenli bir şekilde oynayıp öğrenebileceği,
              verimli vakit geçirebileceği ve yeni arkadaşlar edinebileceği,
              uzman gözetiminde pozitif bir eğitim ortamı sunmak için tasarlanmıştır.
            </p>
            <Button
              className="px-6 py-8 xl:px-8 xl:py-9 text-base sm:text-lg bg-darklila hover:bg-orange text-white"
              onClick={() => (window.location.href = "/faq")}
            >
              Hakkımızda bilgi alın
            </Button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] md:max-w-4xl p-0 bg-transparent border-none">
          <DialogTitle className="hidden">Modal</DialogTitle>
          <div className="relative pb-[56.25%] h-0 overflow-hidden">
            <iframe
              src={
                isOpen
                  ? "https://player.vimeo.com/video/386232261?autoplay=1"
                  : "#"
              }
              className="absolute top-0 left-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoPart;

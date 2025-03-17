"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Icons from '@/public/icons/Icons';

const VideoPart = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (   
      <div className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-[#b2eaee] overflow-hidden group">
      {/* stars and the moon will move */}
      <div className="absolute top-10 left-10 w-12 h-12 transition-transform duration-300 group-hover:translate-x-2 group-hover:animate-out group-hover:-translate-y-2">
        <Image src="/images/star_2.png" alt="Star" width={48} height={48} />
      </div>
      
      <div className="absolute bottom-20 left-[15%] w-16 h-16 transition-transform duration-300 group-hover:-translate-x-2 group-hover:animate-out group-hover:translate-y-2">
        <Image src="/images/star_3.png" alt="Star" width={64} height={64} />
      </div>
      
      <div className="absolute top-[20%] right-[10%] w-14 h-14 transition-transform duration-300 group-hover:translate-x-2 group-hover:animate-out group-hover:translate-y-2">
        <Image src="/images/star_4.png" alt="Star" width={56} height={56} />
      </div>
      
      <div className="absolute bottom-10 right-[20%] w-10 h-10 transition-transform duration-300 group-hover:-translate-x-2 group-hover:animate-out group-hover:-translate-y-2">
        <Image src="/images/star_5.png" alt="Star" width={40} height={40} />
      </div>
      
      <div className="absolute top-[40%] right-[5%] w-20 h-20 transition-transform duration-300 group-hover:-translate-x-3 group-hover:animate-out group-hover:translate-y-3">
        <Image src="/images/moon.png" alt="Moon" width={80} height={80} />
      </div>


      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden w-full max-w-[500px] mx-auto md:mx-0">
            <Image 
              src="/images/img-7-copyright.jpg" 
              alt="Birthday Party Video" 
              width={500}
              height={350}
              className="w-full h-[337px] md:h-[354px] lg:h-[338px] object-cover"
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-tr from-black/90 to-transparent w-full h-full'></div>
            <div className="absolute top-8 left-4 sm:left-6 md:left-8">
              <div 
                onClick={() => setIsOpen(true)}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 flex items-center justify-center"
              >
                <Icons.Play className="w-full h-full" />
              </div>
            </div>
            
            <div className="absolute bottom-2 left-12 md:left-0 p-4 sm:p-5 md:p-6">
              <h3 className="font-nunito text-5xl font-bold text-white">
                Birthday<br />Parties
              </h3>
              <Button 
                className="mt-3 md:mt-4 py-2 px-4 sm:py-3 sm:px-5 md:py-6 bg-orange hover:bg-darklila text-white text-sm sm:text-base md:text-lg"
                onClick={() => window.location.href = '/#'}
              >
                Book A Party
              </Button>
            </div>
          </div>

          <div className="text-darklila w-full max-w-lg mx-auto md:mx-0 mt-6 md:mt-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-nunito font-bold mb-4 sm:mb-5 md:mb-6">
              We're Committed to<br className="hidden sm:block" /> Our Values
            </h2>
            <p className="text-antrasit font-extralight text-base sm:text-lg mb-6 sm:mb-7 md:mb-8">
              Our center was built as a safe place for your children to play and learn, 
              celebrate Birthdays and meet new friends in the positive environment 
              under the professional supervision.
            </p>
            <Button 
              className="py-2 px-4 md:py-7 text-base sm:text-lg bg-darklila hover:bg-orange text-white"
              onClick={() => window.location.href = '/#'}
            >
              More About Services
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
              src={isOpen ? "https://player.vimeo.com/video/141557554?autoplay=1" : "#"} 
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
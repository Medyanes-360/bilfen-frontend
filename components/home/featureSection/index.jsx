"use client";

import React from 'react';
import Image from 'next/image';
import Icons from '@/public/icons/Icons';

const FeatureSection = () => {
  const features = [
    {
      icon: Icons.Shield,
      title: 'Safe'
    },
    {
      icon: Icons.Clean,
      title: 'Clean'
    },
    {
      icon: Icons.Wifi,
      title: 'Free Wi-Fi'
    },
    {
      icon: Icons.NutFree,
      title: 'Nut-Free'
    },
    {
      icon: Icons.EcoFriendly,
      title: 'Eco-Friendly'
    }
  ];

  return (
    <div className="relative text-white py-16 md:py-32 xl:py-44 lg:h-screen xl:h-full">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-4-copyright.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-nunito font-bold text-center mb-16 max-w-5xl mx-auto">
          Enjoy Unlimited Fun at Tediss Park 
          <div className='md:pt-4'>Playland & Cafe!</div>
        </h2>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 justify-items-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 mb-4 relative">
                <feature.icon className="w-full h-full font-light stroke-orange" />
              </div>
              <span className="text-xl md:text-2xl font-medium text-center">
                {feature.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
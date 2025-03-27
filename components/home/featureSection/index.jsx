"use client";

import React from "react";
import Image from "next/image";
import Icons from "@/public/icons/Icons";

const FeatureSection = () => {
  const features = [
    {
      icon: Icons.Shield,
      title: "Güvenli",
    },
    {
      icon: Icons.Clean,
      title: "Nezih",
    },
    {
      icon: Icons.EcoFriendly,
      title: "Çevre Dostu",
    },
  ];

  return (
    <div className="relative text-white py-16 md:py-32 xl:py-46">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-4-copyright.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-[0.3] transition"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-nunito font-bold text-center mb-16 max-w-5xl mx-auto">
          ÖZGÜN EĞİTİMİN TADINI ÇIKARIN
          <div className="md:pt-4">Eğlen & Öğren</div>
        </h2>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 justify-items-center items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              {/* 3D Icon */}
              <div className="w-20 h-20 md:w-24 md:h-24 mb-4 relative transform transition-transform duration-300 hover:rotate-6 hover:scale-110">
                <feature.icon className="w-full h-full font-light stroke-orange drop-shadow-lg" />
              </div>
              <span className="text-xl md:text-2xl font-medium">
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
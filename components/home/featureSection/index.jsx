"use client";

import React from "react";
import Image from "next/image";
import Icons from "@/public/icons/Icons";

const features = [
  {
    icon: Icons.Shield,
    title: "Güvenli",
    description: "Çocuklarınız için maksimum güvenlik standartları.",
  },
  {
    icon: Icons.Clean,
    title: "Nezih",
    description: "Hijyenik, düzenli ve özenle tasarlanmış ortamlar.",
  },
  {
    icon: Icons.EcoFriendly,
    title: "Çevre Dostu",
    description: "Doğaya saygılı, sürdürülebilir uygulamalar.",
  },
];

const FeatureSection = () => {
  return (
    <section className="relative py-20 md:py-32 bg-black text-white overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-4-copyright.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-nunito font-bold text-center mb-20 tracking-tight leading-tight">
          ÖZGÜN EĞİTİMİN TADINI ÇIKARIN
          <div className="pt-3 text-orange text-2xl md:text-3xl font-light tracking-wide">
            Eğlen & Öğren
          </div>
        </h2>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-2xl duration-300"
            >
              {/* 3D Icon */}
              <div className="w-20 h-20 md:w-24 md:h-24 mb-4 relative transform transition-transform duration-300 hover:rotate-6 hover:scale-110">
                <feature.icon className="w-full h-full font-light stroke-orange drop-shadow-lg" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-200 max-w-xs">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

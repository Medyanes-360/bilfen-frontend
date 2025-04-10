"use client";

import { useEffect } from "react";
import Image from "next/image";

const features = [
  {
    icon: "ogjpwrxe", // digital icon
    title: "Bilfen Dijital",
    description: "Çocuklarınız, Bilfen’in özel online portalında kaliteli ve dopdolu içeriklerle öğrenmenin keyfini çıkarıyor.",
  },
  {
    icon: "xmaezqzk", // contents icon
    title: "Hazır İçerikler",
    description: "Bilfen’in dijital portalında ödevler ve ek materyaller her zaman erişilebilir ve eğitim sürecine tam entegre şekilde sunulur.",
  },
  {
    icon: "vvyxyrur", // school icon
    title: "Eğitimde Yenilikçi Yaklaşım",
    description:
      "Bilfen'in zengin online eğitim içerikleriyle çocuklarınızın gelişimini her adımda destekliyoruz.",
  },
];

const FeatureSection = () => {
  // Load the lordicon script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.defer = true;

    // Make sure we don't add the script multiple times
    if (
      !document.querySelector(
        'script[src="https://cdn.lordicon.com/lordicon.js"]'
      )
    ) {
      document.body.appendChild(script);
    }

    return () => {
      // Clean up is optional since the script might be used elsewhere
    };
  }, []);

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
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-nunito font-bold text-center mb-20 tracking-tight leading-tight">
          ÖZGÜN EĞİTİMLE GELECEĞE GÜVENLE!
          <div className="pt-3 text-orange text-xl sm:text-2xl md:text-3xl font-light tracking-wide">
            🎉 Eğlenerek Öğrenin{" "}
          </div>
        </h2>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-2xl duration-300 p-6 rounded-xl"
            >
              {/* Lordicon using web component */}
              <div className="w-24 h-24 mb-6 flex items-center justify-center">
                <lord-icon
                  src={`https://cdn.lordicon.com/${feature.icon}.json`}
                  trigger="hover"
                  stroke="bold"
                  colors="primary:#ffffff,secondary:#fb5c38"
                  style={{ width: "100px", height: "100px" }}
                ></lord-icon>
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

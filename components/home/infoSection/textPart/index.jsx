import Icons from "@/public/icons/Icons";
import React from "react";

const TextPart = () => {
  return (
    <div className="z-30 px-4 sm:px-6 md:px-8 mx-auto py-8 sm:py-10 md:py-16">
      {/* Headline + Text */}
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-14 md:mb-16 ">
        <h2 className="font-nunito text-antrasit font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
          Erken eğitimin en keyifli yolu
        </h2>
        <p className="font-light text-base sm:text-lg md:text-xl text-darkGray leading-relaxed mx-auto sm:mx-0 ">
          Çocuğunuzun eğitim yolculuğunu unutulmaz kılmaya ne dersiniz? Merak
          eden, keşfeden ve öğrenen mutlu çocuklar için özel bir ortam
          sunuyoruz! Bilimden sanata, oyunlardan dil gelişimine kadar zengin
          eğitim programlarımızla çocuğunuzun geleceğine değer katın.
        </p>
      </div>

      {/* Icon Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3 p-5 rounded-lg hover:bg-gray-50 transition duration-300">
          <Icons.birthdayCake className="w-12 h-12 md:w-16 md:h-16 text-darklila" />
          <span className="font-medium text-lg md:text-xl text-antrasit">
            Çocuğunuza <br className="hidden sm:block" /> Özel!
          </span>
        </div>

        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3 p-5 rounded-lg hover:bg-gray-50 transition duration-300">
          <Icons.person className="w-12 h-12 md:w-16 md:h-16 text-darklila" />
          <span className="font-medium text-lg md:text-xl text-antrasit">
            Birebir <br className="hidden sm:block" /> Öğrenim Kalitesi
          </span>
        </div>

        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3 p-5 rounded-lg hover:bg-gray-50 transition duration-300">
          <Icons.fun className="w-12 h-12 md:w-16 md:h-16 text-darklila" />
          <span className="font-medium text-lg md:text-xl text-antrasit">
            Kolay, Etkili ve <br className="hidden sm:block" /> Eğlenceli Öğrenme!
          </span>
        </div>
      </div>
    </div>
  );
};


export default TextPart;

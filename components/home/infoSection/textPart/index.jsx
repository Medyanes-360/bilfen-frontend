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
      <div className="grid grid-cols-3 gap-3 sm:gap-6">
        <div className="flex flex-col items-center text-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition duration-300">
          <Icons.birthdayCake className="w-10 h-10 sm:w-12 sm:h-12 text-darklila" />
          <span className="font-medium text-sm sm:text-lg text-antrasit">
            Çocuğunuza Özel!
          </span>
        </div>

        <div className="flex flex-col items-center text-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition duration-300">
          <Icons.person className="w-10 h-10 sm:w-12 sm:h-12 text-darklila" />
          <span className="font-medium text-sm sm:text-lg text-antrasit">
            Birebir Öğrenim Kalitesi
          </span>
        </div>

        <div className="flex flex-col items-center text-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition duration-300">
          <Icons.fun className="w-10 h-10 sm:w-12 sm:h-12 text-darklila" />
          <span className="font-medium text-sm sm:text-lg text-antrasit">
            Kolay, Etkili ve Eğlenceli Öğrenme!
          </span>
        </div>
      </div>
    </div>
  );
};


export default TextPart;

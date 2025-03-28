import Icons from "@/public/icons/Icons";
import React from "react";

const TextPart = () => {
  return (
    <div className="z-30 my-4 sm:my-5 md:my-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
        <div>
          <h2 className="font-nunito text-antrasit font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl break-words leading-tight">
            Erken eğitimin en keyifli yolu
          </h2>
        </div>
        <div>
          <p className="font-light text-base sm:text-lg md:text-xl text-darkGray leading-relaxed">
          Çocuğunuzun eğitim yolculuğunu unutulmaz kılmaya ne dersiniz?
Merak eden, keşfeden ve öğrenen mutlu çocuklar için özel bir ortam sunuyoruz!
Bilimden sanata, oyunlardan dil gelişimine kadar zengin eğitim programlarımızla çocuğunuzun geleceğine değer katın.
          </p>
        </div>
      </div>

      {/* IconSection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-6 lg:gap-8 xxl:gap-10">
        <div className="flex flex-col items-center sm:items-start sm:text-start text-center gap-3 p-4 sm:p-5 rounded-lg hover:bg-gray-50 transition-colors duration-300">
          <Icons.birthdayCake className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-darklila" />
          <span className="font-medium text-base sm:text-lg md:text-xl text-antrasit">
            Çocuğunuza <br className="hidden sm:block" /> Özel!
          </span>
        </div>

        <div className="flex flex-col items-center sm:items-start sm:text-start text-center gap-3 p-4 sm:p-5 rounded-lg hover:bg-gray-50 transition-colors duration-300">
          <Icons.person className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-darklila" />
          <span className="font-medium text-base sm:text-lg md:text-xl text-antrasit">
            Birebir <br className="hidden sm:block" /> Öğrenim Kalitesi
          </span>
        </div>

        <div className="flex flex-col items-center sm:items-start sm:text-start text-center gap-3 p-4 sm:p-5 rounded-lg hover:bg-gray-50 transition-colors duration-300 sm:col-span-2 md:col-span-1">
          <Icons.fun className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-darklila" />
          <span className="font-medium text-base sm:text-lg md:text-xl text-antrasit">
            Kolay, Etkili ve <br className="hidden sm:block" /> Eğlenceli Öğrenme!
          </span>
        </div>
      </div>
    </div>
  );
};

export default TextPart;
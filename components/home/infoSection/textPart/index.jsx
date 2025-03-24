import Icons from "@/public/icons/Icons";
import React from "react";

const TextPart = () => {
  return (
    <div className="z-30 my-5">
      <div className="flex flex-col gap-8 mb-12">
        <div>
          <h2 className="font-nunito text-antrasit font-bold text-3xl md:text-6xl break-words">
            Erken eğitimin en keyifli yolu
          </h2>
        </div>
        <div>
          <p className="font-light text-lg md:text-xl text-darkGray">
            Çocuğunuzun öğrenme yolculuğunu özel kılmak ister misiniz?
            Çocukların özgürce keşfedip öğrenebileceği bir ortam mı arıyorsunuz?
            Anaokulumuzda bilimden sanata, oyunlardan dil gelişimine kadar birçok eğitici program sunuyoruz!
          </p>
        </div>
      </div>

      {/* IconSection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xxl:gap-1 ">
        <div className="flex flex-col items-center md:items-start md:text-start text-center gap-2">
          <Icons.birthdayCake className="w-16 h-16" />
          <span className="font-medium text-lg text-antrasit">
            Çocuğunuza <br /> Özel!
          </span>
        </div>


        <div className="flex flex-col items-center md:items-start md:text-start text-center gap-2">
          <Icons.person className="w-16 h-16" />
          <span className="font-medium text-lg text-antrasit">
            Birebir <br /> Öğrenim Kalitesi
          </span>
        </div>

        <div className="flex flex-col items-center md:items-start md:text-start text-center gap-2">
          <Icons.fun className="w-16 h-16" />
          <span className="font-medium text-lg text-antrasit">
            Kolay, <br /> Etkili ve Eğlenceli Öğrenme!
          </span>
        </div>
      </div>
    </div>
  );
};

export default TextPart;

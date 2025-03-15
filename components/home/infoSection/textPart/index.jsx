import Icons from "@/public/icons/Icons";
import React from "react";

const TextPart = () => {
  return (
    <div className="my-5">
      <div className="flex flex-col gap-8 mb-12">
        <div>
          <h2 className="font-nunito text-antrasit font-bold text-3xl md:text-5xl break-words">
            The Great Way to Celebrate a Birthday
          </h2>
        </div>
        <div>
          <p className="font-light text-lg md:text-xl text-darkGray">
            Want to make a special gift to your child? Looking for a place to
            let the kids do whatever they want, but do no want to worry every
            minute? We are happy to help and offer our Birthday Party programs!
          </p>
        </div>
      </div>

      {/* IconSection */}
      <div className="flex flex-col sm:flex-row items-center justify-start gap-8">
        <div className="flex flex-col items-center text-center gap-2">
          <Icons.birthdayCake className="w-16 h-16"/>
          <span className="font-medium text-lg text-antrasit">
            Customized <br /> for You!
          </span>
        </div>

        
        <div className="flex flex-col items-center text-center gap-2">
          <Icons.person className="w-16 h-16"/>
          <span className="font-medium text-lg text-antrasit">
            In a 100% <br /> Private Space
          </span>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <Icons.fun className="w-16 h-16"/>
          <span className="font-medium text-lg text-antrasit">
            Easy, <br /> Fast, Fun
          </span>
        </div>
      </div>
    </div>
  );
};

export default TextPart;

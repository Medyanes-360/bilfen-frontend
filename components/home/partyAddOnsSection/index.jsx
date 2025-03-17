import React from "react";
import Icons from "@/public/icons/Icons";
import PageContainer from "@/containers/pageContainer";

const addOns = [
  {
    id: 1,
    title: "Baloons",
    price: 3,
    icon: "Ballons",
    description:
      "Kids love colorful balloons, and we can help you prepare those!",
  },
  {
    id: 2,
    title: "Candy Bar",
    price: 13,
    icon: "Candy",
    description:
      "The largest selection of candy at the candy bar at our center.",
  },
  {
    id: 3,
    title: "Extra Pizza",
    price: 8,
    icon: "Pizza",
    description: "Always enough for everyone, so no one ever leaves hungry!",
  },
  {
    id: 4,
    title: "Party Invites",
    price: 7,
    icon: "PartyInvite",
    description: "Choose among multiple invitations and we will send them out.",
  },
  {
    id: 5,
    title: "Extra Time",
    price: null,
    icon: "TimeSand",
    description:
      "The option is available in case children get too excited playing.",
  },
  {
    id: 6,
    title: "Extra Guests",
    price: null,
    icon: "Guests",
    description:
      "We always prepare an extra set of dishes and toys just in case.",
  },
];

const PartyAddOnsSection = () => {
  return (
    <PageContainer>
      <div className="mx-auto flex flex-col items-center justify-center max-w-8xl py-16 px-6 ">
          <h2 className="text-3xl md:text-5xl font-bold font-nunito text-center text-orange mb-20">
            Our Party Add-Ons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
            {addOns.map((addon) => (
              <div
                key={addon.id}
                className="flex flex-col gap-2 items-center text-center"
              >
                <div className="relative mb-4 z-10">
                  {addon.price && (
                    <div className="z-20 absolute -top-2 -right-4 w-10 h-10 rounded-full bg-darklila text-white flex items-center justify-center font-semibold text-sm">
                      ${addon.price}
                    </div>
                  )}
                  <div className="w-20 h-20 text-orange">
                    {Icons[addon.icon] &&
                      React.createElement(Icons[addon.icon], {
                        className: "w-full h-full",
                      })}
                  </div>
                </div>

                <h3 className="text-xl font-normal font-poppins text-gray-800 mb-2">
                  {addon.title}
                </h3>

                <div className="max-w-52 px-3 font-light text-lg text-gray-600">{addon.description}</div>
              </div>
            ))}
          </div>
        </div>
    </PageContainer>
  );
};

export default PartyAddOnsSection;

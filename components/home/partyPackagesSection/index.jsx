import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Parallax } from '@/globalElements/Parallax';

const partyPackages = [
  {
    id: 1,
    title: 'Mini Party',
    price: 199,
    image: '/images/Cardimg3.jpg',
    features: [
      '1 1/2 Hour Event',
      'Tediss Themed Paper Goods',
      'Coffee & Tea Service',
      'Juice Box per Child'
    ]
  },
  {
    id: 2,
    title: 'Big Party',
    price: 240,
    image: '/images/Cardimg2.jpg',
    features: [
      '2 Hour Event',
      'Tediss Themed Invites',
      'TedissThemed Paper Goods',
      'Bottled Water for the Adults',
      'Water or Juice Box per Child'
    ]
  },
  {
    id: 3,
    title: 'Super Party',
    price: 375,
    image: '/images/Cardimg1.jpg',
    features: [
      '3 Hour Event',
      'Tediss Themed Invites',
      'TedissThemed Paper Goods',
      'Bottled Water for the Adults',
      'Coffee & Tea Service',
      'Craft Time'
    ]
  }
];

const PartyPackagesSection = () => {
  return (
    <div className="bg-[#fff6e9] py-16 px-4 xxl:px-16 relative group overflow-hidden"> 
       <Parallax sensitivity={0.05} className="hidden xl:block absolute top-[2%] left-[4%] w-20 h-14">
        <Image src="/images/star4.png" alt="Star" width={56} height={56} />
      </Parallax>
       <Parallax sensitivity={0.05} className="hidden xl:block absolute top-[5%] right-[4%] w-20 h-14">
        <Image src="/images/star4.png" alt="Star" width={56} height={56} />
      </Parallax>
      <Parallax sensitivity={0.05} className="hidden xl:block absolute bottom-[1%] left-[4%] w-20 h-14">
        <Image src="/images/star4.png" alt="Star" width={56} height={56} />
      </Parallax>
      <Parallax sensitivity={0.1} className="hidden xl:block absolute bottom-[1%] right-[4%] w-44 h-44">
        <Image src="/images/rocket2.png" alt="Star" width={300} height={366} />
      </Parallax>
      
      <div className="relative z-20 xxl:container mx-auto">
        <h2 className="text-[34px] sm:text-4xl md:text-5xl font-nunito font-bold text-center text-[#312F30] mb-12">
          Her seviyeye uygun eğitimler
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {partyPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              className="bg-white h-fit rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative">
                <Image 
                  src={pkg.image} 
                  alt={pkg.title}
                  width={500}
                  height={550}
                  className="w-full md:h-48 h-44 object-cover"
                  quality={90}
                />
                <div className="w-20 h-20 lg:w-24 lg:h-24 absolute flex items-center justify-center top-3/4 right-4 rounded-full bg-orange text-2xl text-white">
                  <div className='relative'> <span className='text-base text-light absolute bottom-2 -left-2 '>$</span>
                    <span className='font-semibold'>{pkg.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-start px-8 py-5 xxl:px-12 gap-2 md:p-6">
                <h3 className="font-poppins text-center text-2xl font-normal text-darkGray mb-4">{pkg.title}</h3>
                <ul className="space-y-1 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="text-gray-700 font-light text-base md:text-lg flex items-center">
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="bg-darklila xxl:text-lg py-7 hover:bg-orange text-white"
                  asChild
                >
                  <a href="/#">Book a Party</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartyPackagesSection;
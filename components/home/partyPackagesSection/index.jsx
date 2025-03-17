import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const partyPackages = [
  {
    id: 1,
    title: 'Mini Party',
    price: 199,
    image: '/images/PartyCardimg3.jpg',
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
    image: '/images/PartyCardimg2.jpg',
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
    image: '/images/PartyCardimg1.jpg',
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
    <div className="bg-[#fff6e9] py-16 px-8 relative overflow-hidden"> 
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-nunito font-bold text-center text-antrasit mb-16">
          Children Party Packages
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partyPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              className="bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative">
                <Image 
                  src={pkg.image} 
                  alt={pkg.title}
                  width={400}
                  height={250}
                  className="w-full md:h-48 h-44 object-cover"
                />
                <div className="w-24 h-24 absolute flex items-center justify-center top-3/4 right-4 rounded-full bg-orange text-2xl text-white">
                  <div className='relative'> <span className='text-base text-light absolute bottom-2 -left-2 '>$</span>
                    <span className='font-semibold'>{pkg.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-start px-8 py-5 md:items-center gap-2 md:p-6">
                <h3 className="text-center text-2xl font-semibold text-darkGray mb-4">{pkg.title}</h3>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="text-gray-700 text-base md:text-lg flex items-center">
                      <span className="text-orange-500 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="bg-darklila py-7 hover:bg-orange text-white"
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
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const galleryItems = [
    {
      id: 1,
      src: '/images/post-2-copyright.jpg',
      alt: 'Child climbing ropes',
      categories: ['main'],
      size: 'small',
      priority: true
    },
    {
      id: 2,
      src: '/images/post-14-copyright.jpg',
      alt: 'Birthday cake',
      categories: ['baby'],
      size: 'small',
      priority: true
    },
    {
      id: 3,
      src: '/images/post-15-copyright.jpg',
      alt: 'Child climbing wall',
      categories: ['toddler'],
      size: 'large',
      priority: true
    },
    {
      id: 4,
      src: '/images/post-16-copyright.jpg',
      alt: 'Child in ball pit',
      categories: ['baby'],
      size: 'large',
      priority: false
    },
    {
      id: 5,
      src: '/images/post-17-copyright.jpg',
      alt: 'Indoor playground',
      categories: ['toddler'],
      size: 'small',
      priority: false
    },
    {
      id: 6,
      src: '/images/post-18-copyright.jpg',
      alt: 'Children on inflatable slide',
      categories: ['main'],
      size: 'small',
      priority: false
    }
  ];

  const filters = [
    { id: 'all', label: 'All Zones', color: 'bg-darklila' },
    { id: 'baby', label: 'Baby Area', color: 'bg-lightGreen' },
    { id: 'toddler', label: 'Toddler Zone', color: 'bg-lightYellow' },
    { id: 'main', label: 'Main Arena', color: 'bg-orange' }
  ];

  const getFilteredItems = () => {
    let items = activeFilter === 'all' 
      ? galleryItems 
      : galleryItems.filter(item => item.categories.includes(activeFilter));
    
    // On mobile screen and with All Zones selected, show only the top 3 prioritized images
    if (isMobile && activeFilter === 'all') {
      items = galleryItems.filter(item => item.priority);
    }
    
    return items;
  };

  const filteredItems = getFilteredItems();

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  return (
    <div className="relative py-16 px-8 bg-[#fff6e9] overflow-hidden group">
      {/* Diğer arka plan elementleri  */}
      <div className="absolute top-[25%] left-[5%] w-12 h-12 transition-transform duration-400 group-hover:translate-x-4 group-hover:-translate-y-2">
        <Image src="/images/star2.png" alt="Star" width={48} height={48} />
      </div>
      
      <div className="absolute top-[45%] left-[8%] w-10 h-10 transition-transform duration-400 group-hover:-translate-x-2 group-hover:translate-y-2">
        <Image src="/images/star2.png" alt="Star" width={40} height={40} />
      </div>
      
      <div className="absolute top-[85%] left-[3%] w-14 h-14 transition-transform duration-400 group-hover:translate-x-2 group-hover:translate-y-2">
        <Image src="/images/star4.png" alt="Star" width={56} height={56} />
      </div>
      
      <div className="absolute bottom-20 left-[15%] w-16 h-16 transition-transform duration-400 group-hover:-translate-x-2 group-hover:translate-y-2">
        <Image src="/images/star4-1.png" alt="Star" width={64} height={64} />
      </div>
          
      <div className="absolute top-10 right-[80%] w-10 h-10 transition-transform duration-400 group-hover:-translate-x-2 group-hover:-translate-y-2">
        <Image src="/images/star2.png" alt="Star" width={40} height={40} />
      </div>
      
      <div className="absolute top-[4%] right-[15%] w-44 h-44 transition-transform duration-400 group-hover:-translate-x-3 group-hover:translate-y-3">
        <Image src="/images/comet_2.png" alt="Cornet" width={380} height={280} />
      </div>

      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-nunito font-bold text-center mb-10 text-darkGray">
          Our Featured Gallery
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-5 mb-12">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`${activeFilter === filter.id ? 'bg-darklila' : filter.color} hover:bg-darklila font-poppins text-lg font-medium text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all`}
            >
              <span className="w-3 h-3 bg-white rounded-full"></span>
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className={`relative rounded-xl overflow-hidden group/item cursor-pointer ${
                item.size === 'large' ? 'lg:col-span-1 lg:row-span-2' : ''
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.size === 'large' ? 700 : 650}
                height={item.size === 'large' ? 650 : 300}
                className="w-full h-full object-cover"
                priority={item.priority}
                quality={90}
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#fcc953] opacity-0 group-hover/item:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
                <div className="mb-4">
                  <Image src='/Icons/eye-svgrepo-com.svg' width={90} height={80} alt='eye'/>
                </div>
                <Button 
                  onClick={() => openImageModal(item)}
                  className="bg-white font-fredoka text-darklila font-old hover:text-white px-6 py-2 rounded-full hover:bg-darklila transition-colors"
                >
                  View More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTitle className="hidden">Modal</DialogTitle>
        <DialogContent className="max-w-[90vw] md:max-w-4xl p-0 bg-transparent border-none">
          {selectedImage && (
            <div className="relative">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={900}
                className="w-full h-auto object-contain max-h-[80vh]"
                quality={100}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GallerySection;
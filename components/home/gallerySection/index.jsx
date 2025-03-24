"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Parallax } from "@/globalElements/Parallax";

// Galeri item bileşeni
const GalleryItem = ({ item, openImageModal }) => {
  if (!item) return null;
  return (
    <div className="relative rounded-xl overflow-hidden group/item cursor-pointer h-full">
      <Image
        src={item.src}
        alt={item.alt}
        width={800}
        height={800}
        className="w-full h-full object-cover"
        priority={item.priority}
        quality={90}
      />
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#fcc953] opacity-0 group-hover/item:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
        <div className="mb-4">
          <Image src='/Icons/eye-svgrepo-com.svg' width={85} height={85} alt='eye'/>
        </div>
        <Button 
          onClick={() => openImageModal(item)}
          className="bg-white font-fredoka text-darklila hover:text-white px-6 py-2 rounded-full hover:bg-darklila transition-colors"
        >
          View More
        </Button>
      </div>
    </div>
  );
};

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const galleryItems = [
    {
      id: 1,
      src: "/images/post-2-copyright.jpg",
      alt: "Child climbing ropes",
      categories: ["main"],
      size: "small",
      priority: true,
    },
    {
      id: 2,
      src: "/images/post-14-copyright.jpg",
      alt: "Birthday cake",
      categories: ["baby"],
      size: "small",
      priority: true,
    },
    {
      id: 3,
      src: "/images/post-15-copyright.jpg",
      alt: "Child climbing wall",
      categories: ["toddler"],
      size: "large",
      priority: true,
    },
    {
      id: 4,
      src: "/images/post-16-copyright.jpg",
      alt: "Child in ball pit",
      categories: ["baby"],
      size: "large",
      priority: false,
    },
    {
      id: 5,
      src: "/images/post-17-copyright.jpg",
      alt: "Indoor playground",
      categories: ["toddler"],
      size: "small",
      priority: false,
    },
    {
      id: 6,
      src: "/images/post-18-copyright.jpg",
      alt: "Children on inflatable slide",
      categories: ["main"],
      size: "small",
      priority: false,
    },
  ];

  const filters = [
    { id: "all", label: "Eğitim", color: "bg-darklila" },
    { id: "baby", label: "Her yaşa uygun", color: "bg-lightGreen" },
    { id: "toddler", label: "Oyun Alanları", color: "bg-lightYellow" },
    { id: "main", label: "Kalite", color: "bg-orange" },
  ];

  const getFilteredItems = () => {
    let items =
      activeFilter === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.categories.includes(activeFilter));

    // On mobile screen and with All Zones selected, show only the top 3 prioritized images
    if (isMobile && activeFilter === "all") {
      items = galleryItems.filter((item) => item.priority);
    }

    return items;
  };

  const filteredItems = getFilteredItems();

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  return (
    <div className="relative py-4 xxl:py-12 px-8 bg-[#fff6e9] overflow-hidden group">
      {/* Diğer arka plan elementleri  */}
      <Parallax className="absolute top-[25%] left-[5%] w-10 h-10">
        <Image src="/images/star5.png" alt="Star" width={48} height={48} />
      </Parallax>

      <Parallax className="absolute top-[45%] left-[8%] w-10 h-10 ">
        <Image src="/images/star2.png" alt="Star" width={40} height={40} />
      </Parallax>

      <Parallax className="absolute top-[85%] left-[3%] w-14 h-14 ">
        <Image src="/images/star4.png" alt="Star" width={56} height={56} />
      </Parallax>

      <Parallax className="absolute top-10 right-[80%] w-10 h-10 ">
        <Image src="/images/star2.png" alt="Star" width={40} height={40} />
      </Parallax>

      <Parallax className="absolute top-[17%] right-[3%] w-32 h-32 lg:w-44 lg:h-44 ">
        <Image
          src="/images/comet_2.png"
          alt="Cornet"
          width={380}
          height={280}
        />
      </Parallax>

      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-nunito font-bold text-center mb-10 text-darkGray">
          Derslerimizden Kareler
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`${
                activeFilter === filter.id ? "bg-darklila" : filter.color
              } hover:bg-darklila font-poppins text-lg font-medium text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all`}
            >
              <span className="w-3 h-3 bg-white rounded-full"></span>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Büyük ekranlar için grid (lg ve üzeri) */}
        <div className="hidden lg:grid grid-cols-4 grid-rows-3 gap-4 max-w-6xl mx-auto">
          {filteredItems.length > 0 && (
            <>
              <div>
                <GalleryItem item={filteredItems[0]} openImageModal={openImageModal} />
              </div>
              <div>
                <GalleryItem item={filteredItems[1]} openImageModal={openImageModal} />
              </div>
              <div className="col-span-2 row-span-2">
                <GalleryItem item={filteredItems[2]} openImageModal={openImageModal} />
              </div>
              <div className="col-span-2 row-span-2 row-start-2">
                <GalleryItem item={filteredItems[3]} openImageModal={openImageModal} />
              </div>
              <div className="col-start-3 row-start-3">
                <GalleryItem item={filteredItems[4]} openImageModal={openImageModal} />
              </div>
              <div className="col-start-4 row-start-3">
                <GalleryItem item={filteredItems[5]} openImageModal={openImageModal} />
              </div>
            </>
          )}
        </div>

        {/* Orta ekranlar için grid (md) */}
        <div className="hidden md:grid lg:hidden grid-cols-2 grid-rows-3 gap-4 max-w-4xl mx-auto">
          {filteredItems.length > 0 && (
            <>
              <div>
                <GalleryItem item={filteredItems[0]} openImageModal={openImageModal} />
              </div>
              <div>
                <GalleryItem item={filteredItems[1]} openImageModal={openImageModal} />
              </div>
              <div className="col-span-2 row-span-2 row-start-2">
                <GalleryItem item={filteredItems[2]} openImageModal={openImageModal} />
              </div>
            </>
          )}
        </div>

        {/* Küçük ekranlar için grid (sm ve altı) */}
        <div className="md:hidden grid grid-cols-2 grid-rows-4 gap-4 max-w-xl mx-auto">
          {filteredItems.length > 0 && (
            <>
              <div className="col-span-2">
                <GalleryItem item={filteredItems[0]} openImageModal={openImageModal} />
              </div>
              <div className="col-span-2 row-start-2">
                <GalleryItem item={filteredItems[1]} openImageModal={openImageModal} />
              </div>
              <div className="col-span-2 row-span-2 row-start-3">
                <GalleryItem item={filteredItems[2]} openImageModal={openImageModal} />
              </div>
            </>
          )}
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

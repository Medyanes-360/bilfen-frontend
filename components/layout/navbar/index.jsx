"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Icons from "@/public/icons/Icons";

import ScrollToTopButton from "./scrollToTopButton";

import MobileNav from "./mobileNav";
import { DesktopNav } from "./desktopNav.jsx";
import LoginPopup from "@/components/LoginPopup";

// const menuItems = [
//   {
//     title: "Ana Sayfa",
//     items: [
//       { title: "Ana Sayfa", href: "/#" },
//     ]
//   },
//   {
//     title: "Sıkça Sorulan Sorular",
//     items: [
//       { title: "Sıkça Sorulan Sorular", href: "/faq" },
//     ],
//   },
//   {
//     title: "İletişim",
//     items: [
//       { title: "İletişim", href: "/contact" },
//     ],
//   },
// ];

const menuItems = [
  {
    title: "Ana Sayfa",
    url: "/",
  },
  {
    title: "Sıkça Sorulan Sorular",
    url: "/faq",
  },
  {
    title: "Nasıl Çalışır?",
    url: "/how-it-works",
  },
  {
    title: "İletişim",
    url: "/contact",
  },
];

const Navbar = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="w-full bg-darklila sticky top-0 lg:relative z-40">
        <div className="container mx-auto px-4 py-3 sm:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-white.webp"
                alt="BİLFEN"
                width={135}
                height={80}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-between gap-7">
              <DesktopNav menuItems={menuItems} />

              {/* Show login only if NOT logged in */}
              {!session && (
                <div className="hidden lg:block text-orange hover:text-white font-poppins text-base font-semibold">
                  <button onClick={() => setIsOpen(true)} className="cursor-pointer relative flex items-center gap-2">
                    Giriş Yap
                    <Icons.Sparkles className="absolute top-1/2 translate-x-0 -translate-y-1/2 w-40 h-22 -right-11 hover:scale-85 transition duration-300" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <MobileNav menuItems={menuItems} setActiveModal={setIsOpen} />
          </div>
        </div>
      </nav>

      {/* Scroll to Top Button */}
      <ScrollToTopButton show={showScrollTop} />

      {/* login pop-up */}
      <LoginPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;

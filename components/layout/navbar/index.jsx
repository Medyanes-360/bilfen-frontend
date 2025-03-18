"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Icons from "@/public/icons/Icons";

import ScrollToTopButton from "./scrollToTopButton";
import DesktopNav from "./desktopNav.jsx";
import MobileNav from "./mobileNav";


const menuItems = {
  pages: [
    { title: "Typography", href: "/typography" },
    { title: "Shortcodes", href: "/shortcodes" },
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Service Plus", href: "/service-plus" },
  ],
  about: [
    { title: "About Us", href: "/about-us" },
    { title: "Prices", href: "/prices" },
    { title: "Rules of Play", href: "/rules" },
    { title: "Cafe", href: "/cafe" },
    { title: "Book a Party", href: "/book-party" },
  ],
  news: [
    { title: "All Posts", href: "/posts" },
    { title: "Classic Style", href: "/classic-style", hasSubmenu: true, 
      submenu: [
        { title: "2 Columns", href: "/classic-style/2-columns" },
        { title: "3 Columns", href: "/classic-style/3-columns" },
      ] 
    },
    { title: "Portfolio", href: "/portfolio", hasSubmenu: true },
    { title: "Chess Style", href: "/chess-style", hasSubmenu: true },
  ],
};

const Navbar = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

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
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.webp"
                alt="Tediss Park"
                width={135}
                height={80}
              />
            </Link>

            {/* Desktop Navigation */}
            <DesktopNav menuItems={menuItems} />

            <div className="hidden lg:block text-orange hover:text-white font-poppins text-base font-semibold">
              <Link href="/book-party" className="flex items-center gap-2">
                Book A Party
                <div className="relative">
                  <Icons.Sparkles className="absolute w-40 h-22 -top-10 -right-5 hover:scale-90 transition duration-300"/>
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <MobileNav menuItems={menuItems} />
          </div>
        </div>
      </nav>

      {/* Scroll to Top Button */}
      <ScrollToTopButton show={showScrollTop} />
    </>
  );
};

export default Navbar;

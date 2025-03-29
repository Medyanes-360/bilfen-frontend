"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Icons from "@/public/icons/Icons";
import { signOut, useSession } from "next-auth/react";

const MobileNav = ({ menuItems, setActiveModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <div className="p-2 text-orange hover:bg-transparent flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="2" x="3" y="6" rx="1"></rect>
            <rect width="18" height="2" x="3" y="12" rx="1"></rect>
            <rect width="18" height="2" x="3" y="18" rx="1"></rect>
          </svg>
        </div>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-screen h-screen p-0 bg-[#fff6e9] max-w-none inset-0 m-0 rounded-none border-none"
      >
        <div className="hidden">
          <SheetTitle>Menu Title</SheetTitle>
        </div>
        <div className="flex flex-col h-full">
          {/* Top Bar with X */}
          <div className="flex justify-end p-4">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-darklila">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
            </SheetTrigger>
          </div>

          {/* Centered Logo */}
          <div className="flex justify-center items-center py-4">
            <Link
              href="/"
              className="flex items-center"
              onClick={handleLinkClick}
            >
              <Image
                src="/images/logo.webp"
                alt="BİLFEN"
                width={120}
                height={60}
              />
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 h-full px-6 flex items-center justify-center">
            <ul className="space-y-6 uppercase font-poppins font-semibold text-darklila text-center max-w-xs w-full">
              {menuItems.map((menu, index) => (
                <li key={index}>
                  <Collapsible>
                    <div className="flex items-center justify-between">
                      <Link
                        href={menu.url || `/#`}
                        className="block w-full py-2"
                        onClick={handleLinkClick}
                      >
                        {menu.title}
                      </Link>
                    </div>
                  </Collapsible>
                </li>
              ))}

              {session ? (
                <li>
                  <Collapsible>
                    <button
                      onClick={() =>
                        signOut({ redirect: true, callbackUrl: "/" })
                      }
                      className="cursor-pointer text-orange font-poppins text-base font-semibold block w-full py-2"
                    >
                      Çıkış Yap
                    </button>
                  </Collapsible>
                </li>
              ) : (
                <li>
                  <Collapsible>
                    <button
                      onClick={() => {
                        setActiveModal(true);
                        handleLinkClick();
                      }}
                      className="cursor-pointer text-orange font-poppins text-base font-semibold block w-full py-2"
                    >
                      Giriş Yap
                    </button>
                  </Collapsible>
                </li>
              )}
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-4 p-6">
            {[
              {
                href: "https://www.facebook.com/bilfenegitimkurumlari",
                icon: (
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                ),
              },
              {
                href: "https://x.com/bilfen",
                icon: (
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                ),
              },
              {
                href: "https://www.instagram.com/bilfen",
                icon: (
                  <>
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </>
                ),
              },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-darklila shadow-md hover:text-orange transition"
                onClick={handleLinkClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {item.icon}
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

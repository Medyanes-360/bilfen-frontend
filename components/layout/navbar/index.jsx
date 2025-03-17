"use client";

import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import Icons from "@/public/icons/Icons";

const StarIcon = ({ className }) => (
  <div className={`${className} -top-3 -left-9 z-0`}>
    <Icons.NavStar className="fill-orange w-36 h-16" />
  </div>
);

const menuItems = {
  pages: [
    { title: "Typography", href: "/https://tediss.themerex.net/typography/" },
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
    { title: "Classic Style", href: "/classic-style", hasSubmenu: true },
    { title: "Portfolio", href: "/portfolio", hasSubmenu: true },
    { title: "Chess Style", href: "/chess-style", hasSubmenu: true },
  ],
};

const Navbar = () => {
  return (
    <nav className="w-full bg-darklila">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.webp"
              alt="Tediss Park"
              width={135}
              height={80}
            />
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="hidden lg:flex items-center gap-6">
              <NavigationMenuItem className="relative">
                <StarIcon className="absolute z-0" />
                <NavigationMenuTrigger className="relative z-10 hover:text-white active:text-white font-poppins font-medium text-base text-[#8c898a] bg-transparent hover:bg-transparent">
                  Home
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[240px] p-4 bg-white rounded-md">
                    <li>
                      <Link
                        href="/soft-play"
                        className="block p-2 text-gray-700 hover:text-orange-500"
                      >
                        Home #1 - Soft Play Area
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/birthday-party"
                        className="block p-2 text-gray-700 hover:text-orange-500"
                      >
                        Home #2 - Birthday Party
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/child-care"
                        className="block p-2 text-gray-700 hover:text-orange-500"
                      >
                        Home #3 - Child Care Center
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/home-boxed"
                        className="block p-2 text-gray-700 hover:text-orange-500"
                      >
                        Home Boxed
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {Object.entries(menuItems).map(([key, items]) => (
                <NavigationMenuItem key={key} className="relative">
                  <StarIcon className="absolute hidden hover:block z-0" />
                  <NavigationMenuTrigger className="relative z-20 hover:text-white active:text-white font-poppins font-medium text-base text-[#8c898a] ">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[240px] p-4 bg-white rounded-lg">
                      {items.map((item) => (
                        <li
                          key={item.href}
                          className="flex items-center justify-between"
                        >
                          <Link
                            href={item.href}
                            className="block p-2 text-gray-700 hover:text-orange-500"
                          >
                            {item.title}
                          </Link>
                          {item.hasSubmenu && (
                            <span className="text-gray-400">›</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <Link
                  href="/"
                  className="active:text-white hover:text-white font-poppins font-medium text-base text-[#8c898a] "
                >
                  Events
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/"
                  className="active:text-white hover:text-white font-poppins font-medium text-base text-[#8c898a] "
                >
                  Contacts
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div
            className="hidden lg:block text-orange hover:text-white font-poppins text-base font-semibold"
          >
            <Link href="/book-party" className="flex items-center gap-2">
              Book A Party
              <div className="relative">
                  <Icons.Sparkles className="absolute w-40 h-22 -top-10 -right-5 hover:scale-90 transition duration-300"/>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

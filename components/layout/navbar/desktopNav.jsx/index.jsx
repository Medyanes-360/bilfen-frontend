import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from "@/components/ui/navigation-menu";
  import Link from "next/link";
import StarIcon from "../starIcon";

  const DesktopNav = ({ menuItems }) => {
    return (
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList className="flex items-center gap-8">
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className="group/home cursor-pointer hover:text-white active:text-white font-poppins font-medium text-base text-[#8c898a] bg-transparent hover:bg-transparent focus:bg-transparent hover:opacity-100">
              <span className="z-20">Home</span>
              <StarIcon className="absolute left-1/2 translate-y-0 -translate-x-1/2 -z-0 opacity-0 group-hover/home:opacity-100 transition-opacity duration-500" />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="left-1/2 -translate-x-1/2">
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
            <NavigationMenuItem key={key} >
              <NavigationMenuTrigger className="group/others cursor-pointer relative z-20 hover:text-white active:text-white font-poppins font-medium text-base text-[#8c898a] bg-transparent hover:bg-transparent focus:bg-transparent">
                <span className="z-20">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <StarIcon className="absolute left-1/2 translate-y-0 -translate-x-1/2 -z-0 opacity-0 group-hover/others:opacity-100 transition-opacity duration-500" />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="left-1/2 -translate-x-1/2">
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
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className="group/events cursor-pointer relative z-20 hover:text-white active:text-white font-poppins font-medium text-base text-[#8c898a] bg-transparent hover:bg-transparent focus:bg-transparent">
              <span className="z-20">Events</span>
              <StarIcon className="absolute left-1/2 translate-y-0 -translate-x-1/2 -z-0 opacity-0 group-hover/events:opacity-100 transition-opacity duration-500" />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="left-1/2 -translate-x-1/2">
              <ul className="w-[240px] p-4 bg-white rounded-lg">
                <li>
                  <Link
                    href="/events"
                    className="block p-2 text-gray-700 hover:text-orange-500"
                  >
                    All Events
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className="group/contacts cursor-pointer relative z-20 hover:text-white active:text-white font-poppins font-medium text-base text-[#8c898a] bg-transparent hover:bg-transparent focus:bg-transparent">
              <span className="z-20">Contacts</span>
              <StarIcon className="absolute left-1/2 translate-y-0 -translate-x-1/2 -z-0 opacity-0 group-hover/contacts:opacity-100 transition-opacity duration-500" />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="left-1/2 -translate-x-1/2">
              <ul className="w-[240px] p-4 bg-white rounded-lg">
                <li>
                  <Link
                    href="/contacts"
                    className="block p-2 text-gray-700 hover:text-orange-500"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  };
  
  export default DesktopNav;
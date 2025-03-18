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
        <NavigationMenuList className="flex items-center gap-6">
          <NavigationMenuItem className="relative">
            <StarIcon className="absolute z-0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <NavigationMenuTrigger className="relative z-10 hover:text-white active:text-white font-poppins font-medium text-base text-[#8c898a] bg-transparent hover:bg-transparent focus:bg-transparent hover:opacity-100">
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
              <StarIcon className="absolute z-0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <NavigationMenuTrigger className="relative z-20 hover:text-white active:text-white font-poppins font-medium text-base text-[#8c898a] bg-transparent hover:bg-transparent focus:bg-transparent">
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
          <NavigationMenuItem className="relative">
            <StarIcon className="absolute z-0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <Link
              href="/events"
              className="relative z-10 hover:text-white active:text-white font-poppins font-medium text-base text-[#8c898a]"
            >
              Events
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="relative">
            <StarIcon className="absolute z-0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <Link
              href="/contacts"
              className="relative z-10 hover:text-white active:text-white font-poppins font-medium text-base text-[#8c898a]"
            >
              Contacts
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  };
  
  export default DesktopNav;
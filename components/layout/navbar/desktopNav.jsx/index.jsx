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
      <NavigationMenuList className="flex items-center gap-2">
        {Object.entries(menuItems).map(([key, items], index) => (
          <NavigationMenuItem key={`${key}-${index}`} className="mx-auto relative">
            <div>
            <NavigationMenuTrigger
              className={`group/key cursor-pointer relative z-20 hover:text-white active:text-white font-fredoka font-medium text-base text-[#8c898a] bg-transparent hover:bg-transparent focus:bg-transparent`}
            >
              <span className="z-20">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <StarIcon
                className={`absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover/key:opacity-100 transition-opacity duration-500`}
              />
            </NavigationMenuTrigger>
            {items.length > 0 && (
              <NavigationMenuContent className="absolute !left-1/2 transform !-translate-x-1/2 mt-2 min-w-[260px] max-w-[320px] w-fit
             bg-white rounded-xl shadow-lg z-50">
                <ul className="p-8 space-y-2">
                  {items.map((item, subIndex) => (
                    <li key={`${key}-${subIndex}`} className="flex justify-between items-center">
                      <Link
                        href={item.href}
                        className="block w-full text-base font-fredoka font-medium text-[#1e1e1e] hover:text-orange-500 transition"
                      >
                        {item.title}
                      </Link>
                      {item.hasSubmenu && <span className="text-gray-400">›</span>}
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            )}
            </div>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNav;

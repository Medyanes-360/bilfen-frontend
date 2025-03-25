"use client";
import Link from "next/link";
import StarIcon from "../starIcon";

export function DesktopNav({ menuItems, className = "" }) {
  return (
    // <div className={`flex items-center gap-1 ${className}`}>
    //   {menuItems &&
    //     menuItems.map((menu, index) => (
    //       <div key={index} className="relative group">
    //         <button className="cursor-pointer flex items-center justify-center px-4 py-2 text-[#8E89C0] hover:text-white font-fredoka font-medium transition-colors relative">
    //           <span className="relative z-10">{menu.title}</span>
    //           <StarIcon className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
    //         </button>
    //         {menu.items && menu.items.length > 0 && (
    //           <div className="absolute left-0 mt-8 w-64 cursor-pointer rounded-md shadow-lg bg-white text-darklila opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
    //             <div className="flex flex-col rounded-md p-8 gap-2">
    //               {menu.items?.map((item, idx) => (
    //                 <Link
    //                   key={idx}
    //                   href={item.href || "#"}
    //                   className="block w-full text-base font-fredoka font-medium text-[#1e1e1e] hover:text-orange-500 transition"
    //                 >
    //                   {item.title}
    //                 </Link>
    //               ))}
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     ))}
    // </div>

    <div className={`flex items-center gap-1 ${className}`}>
      {menuItems &&
        menuItems.map((menu, index) => (
          <Link
            key={index}
            href={menu.url}
            className="cursor-pointer flex items-center justify-center px-4 py-2 text-[#8E89C0] hover:text-white font-fredoka font-medium transition-colors relative"
          >
            {menu.title}
          </Link>
        ))}
    </div>
  );
}

"use client";
import Link from "next/link";
import StarIcon from "../starIcon";

export function DesktopNav({ menuItems, className = "" }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {menuItems &&
        menuItems.map((menu, index) => (
          <Link
            key={index}
            href={menu.url}
            className="cursor-pointer flex items-center justify-center px-4 py-2 text-[14px] lg:text-base text-[#8E89C0] hover:text-white font-fredoka font-medium transition-colors relative"
          >
            {menu.title}
          </Link>
        ))}
    </div>
  );
}

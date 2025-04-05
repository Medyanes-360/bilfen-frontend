"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// Function to capitalize each word in a string
const capitalizeWords = (str) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function BreadCrumbComponent({ customPaths = [] }) {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  if (pathNames.length === 0) {
    return null;
  }

  const breadCrumbData = [];
  // Add default paths to breadCrumbData
  pathNames.forEach((elem, index) => {
    breadCrumbData.push({
      name: capitalizeWords(elem), // Apply capitalizeWords function here
      url: `/${pathNames.slice(0, index + 1).join("/")}`,
    });
  });

  // Handle customPaths
  customPaths.forEach((elem) => {
    if (elem.replace) {
      breadCrumbData[elem.index - 1] = {
        name: elem.name,
        url: elem.url,
      };
    } else {
      breadCrumbData.splice(elem.index, 0, {
        name: elem.name,
        url: elem.url,
      });
    }
  });

  return (
    <div className="flex justify-center items-center pb-2 text-sm w-full">
      <ul className="flex justify-center items-center gap-4 sm:gap-2 flex-wrap">
        <li className="hover:text-[#8E89C0] transition-colors duration-200">
          <Link
            href={"/"}
            className="text-base sm:text-[18px] leading-[30px] font-thin md:font-normal"
          >
            Ana Sayfa
          </Link>
        </li>
        {pathNames.length > 0 && (
          <span className="flex  items-center justify-center">
            {" "}
            <svg
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2" cy="2" r="2" fill="#919EAB" />
            </svg>
          </span>
        )}
        {breadCrumbData.map((elem, index) => {
          let url = elem.url;

          let name = elem.name;
          let itemClasses =
            paths === url
              ? `text-black-disabled truncate [&_a]:cursor-default `
              : "hover:underline mx-2 truncate";

          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                <Link
                  className="text-base sm:text-[18px] leading-[30px] font-thin md:font-normal"
                  href={url}
                >
                  {name}
                </Link>
              </li>
              {breadCrumbData.length !== index + 1 && (
                <span className="flex items-center justify-center">
                  {" "}
                  <svg
                    width="4"
                    height="4"
                    viewBox="0 0 4 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="2" cy="2" r="2" fill="#919EAB" />
                  </svg>
                </span>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}

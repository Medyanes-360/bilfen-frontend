import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const buildUrl = (
  baseURL = process.env.NEXT_PUBLIC_BACKEND_URL,
  options = {}
) => {
  const defaultParams = {
    isPublished: true,
  };

  const allParams = {
    ...defaultParams,
    ...options,
  };

  const params = new URLSearchParams();

  Object.entries(allParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value);
    }
  });

  return `${baseURL}/api/contents?${params.toString()}`;
};

export const getFileExtension = (fileUrl) => {
  if (!fileUrl) return "";

  try {
    // If it's a full URL, use URL object to get pathname
    const url = new URL(fileUrl, window.location.origin);
    const pathname = url.pathname;
    const fileName = pathname.split("/").pop();
    const extension = fileName?.split(".").pop();

    // Prevent edge case where there's no extension (e.g., file ends with a slash)
    if (fileName === extension) return "";
    return extension?.toLowerCase() || "";
  } catch (e) {
    // Fallback for plain filenames or malformed URLs
    const fileName = fileUrl.split("/").pop();
    const extension = fileName?.split(".").pop();
    if (fileName === extension) return "";
    return extension?.toLowerCase() || "";
  }
};



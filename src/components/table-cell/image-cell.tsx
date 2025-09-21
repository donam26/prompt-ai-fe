"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ImageCellProps {
  src?: string | null;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  placeholder?: string;
}

const SIZE_CONFIG = {
  sm: {
    container: "w-8 h-8 sm:w-10 sm:h-10",
    image: "w-8 h-8 sm:w-10 sm:h-10",
  },
  md: {
    container: "w-12 h-12 sm:w-14 sm:h-14",
    image: "w-12 h-12 sm:w-14 sm:h-14",
  },
  lg: {
    container: "w-16 h-16 sm:w-20 sm:h-20",
    image: "w-16 h-16 sm:w-20 sm:h-20",
  },
};

export function ImageCell({
  src,
  alt = "",
  size = "md",
  className,
  placeholder = "No Image",
}: ImageCellProps) {
  const sizeConfig = SIZE_CONFIG[size];

  if (!src) {
    return (
      <div className="flex justify-center items-center">
        <div
          className={cn(
            "flex justify-center items-center bg-gray-100 border border-gray-200 rounded-full",
            sizeConfig.container,
            className
          )}
        >
          <span className="hidden sm:block font-medium text-gray-400 text-xs">
            {placeholder}
          </span>
          <span className="sm:hidden font-medium text-gray-400 text-xs">-</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          "relative flex-shrink-0 shadow-sm mx-auto border border-gray-200 rounded-full overflow-hidden",
          sizeConfig.container,
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
        />
      </div>
    </div>
  );
}

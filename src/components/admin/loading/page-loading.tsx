import Image from "next/image";
import React from "react";

/**
 * Page loading component with logo and animated dots
 * Used for full-page loading states in admin section
 */
const PageLoading: React.FC = () => {
  return (
    <div className="z-50 fixed inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-md">
      <div className="flex flex-col items-center space-y-8 animate-in duration-700 fade-in-0">
        <div className="relative">
          <Image
            src="/icons/logos/logo-final-1.svg"
            alt="Admin Logo"
            width={120}
            height={120}
            className="drop-shadow-lg object-contain"
            priority
          />
        </div>

        <div className="flex space-x-1">
          <div className="bg-primary/40 rounded-full w-2 h-2 animate-bounce [animation-delay:-0.3s]" />
          <div className="bg-primary/60 rounded-full w-2 h-2 animate-bounce [animation-delay:-0.15s]" />
          <div className="bg-primary/80 rounded-full w-2 h-2 animate-bounce" />
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_50%)] opacity-[0.015]" />
    </div>
  );
};

export default PageLoading;

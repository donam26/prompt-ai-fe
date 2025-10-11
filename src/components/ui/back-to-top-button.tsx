"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./button";

export const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show button when scrolled down more than 300px
      setIsVisible(scrollTop > 300);

      // Check if user is near bottom (within 100px of bottom)
      setIsAtBottom(documentHeight - scrollTop - windowHeight < 100);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Only show when visible and at bottom
  if (!isVisible || !isAtBottom) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="back-to-top-button right-6 bottom-10 z-50 fixed bg-gradient-to-r from-[#5700C6] to-[#4a00a8] shadow-2xl backdrop-blur-sm p-4 border-2 border-white/20 rounded-full text-white transition-all duration-300 transform"
      aria-label="Back to top"
      style={{
        minWidth: "56px",
        minHeight: "56px",
        boxShadow:
          "0 8px 32px rgba(87, 0, 198, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      }}
    >
      <ArrowUp className="drop-shadow-sm w-7 h-7" />
    </Button>
  );
};

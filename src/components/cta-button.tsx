"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "gradient" | "hero";
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  target?: "_blank" | "_self";
}

const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  onClick,
  href,
  variant = "gradient",
  size = "md",
  className,
  disabled = false,
  loading = false,
  icon,
  iconPosition = "right",
  fullWidth = false,
  target = "_self",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold text-white transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 shadow-lg hover:shadow-xl",
    secondary:
      "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-white text-white hover:bg-white hover:text-gray-900 focus:ring-white",
    gradient:
      "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:ring-purple-500 shadow-lg hover:shadow-xl",
    hero: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:ring-purple-500 shadow-[inset_0px_0px_12px_rgba(255,255,255,0.6)] border border-white/20 hover:shadow-[inset_0px_0px_16px_rgba(255,255,255,0.8)]",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
    xl: "px-10 py-5 text-xl rounded-2xl",
    hero: "px-6 py-4 text-lg rounded-full w-[330px] h-[53.5px]",
  };

  const widthClasses = fullWidth ? "w-full" : "";

  const hoverClasses = !disabled && !loading ? "hover:scale-105" : "";

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClasses,
    hoverClasses,
    className
  );

  const content = (
    <>
      {loading && (
        <div className="mr-2 border-white border-b-2 rounded-full w-4 h-4 animate-spin" />
      )}
      {icon && iconPosition === "left" && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={buttonClasses}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Button
      className={cn(
        "flex justify-center items-center shadow-[inset_0px_0px_12px_rgba(255,255,255,0.6)] border rounded-full w-fit h-[53.5px] font-semibold text-white text-lg hover:scale-105 transition-all duration-300 hero-button-gradient",
        className
      )}
      style={{ padding: "16px" }}
      onClick={onClick}
    >
      {content}
    </Button>
  );
};

export default CTAButton;

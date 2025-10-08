"use client";

import { useEffect, useRef, useState } from "react";

interface ToggleButtonGroupProps {
  options: Array<{
    id: number;
    name: string;
    value: string;
  }>;
  active: string;
  setActive: (value: string) => void;
  customBackground?: string;
}

export const ToggleButtonGroup = ({
  options,
  active,
  setActive,
  customBackground,
}: ToggleButtonGroupProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bgStyle, setBgStyle] = useState({ left: 0, width: 0 });
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const index = options.findIndex(opt => opt.value === active);
    const button = buttonRefs.current[index];
    if (button) {
      const { offsetLeft, offsetWidth } = button;
      setBgStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [active, options]);

  // Sử dụng màu tùy chỉnh nếu có, không thì giữ màu cũ
  const backgroundStyle = customBackground || "#5700C6";

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center bg-[#F6F6F6] p-1 rounded-full w-fit"
    >
      <div
        className="top-1 bottom-1 z-0 absolute rounded-full transition-all duration-300 ease-in-out"
        style={{
          left: bgStyle.left,
          width: bgStyle.width,
          background: backgroundStyle,
        }}
      />
      {options.map((type, index) => (
        <button
          key={type.id}
          ref={el => {
            buttonRefs.current[index] = el;
          }}
          onClick={() => setActive(type.value)}
          className={`relative z-10 px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
            active === type.value ? "text-white" : "text-gray-600"
          }`}
        >
          {type.name}
        </button>
      ))}
    </div>
  );
};

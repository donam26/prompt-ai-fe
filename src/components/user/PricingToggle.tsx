"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingToggleProps {
  readonly isYearly: boolean;
  readonly onToggle: (isYearly: boolean) => void;
  readonly className?: string;
}

export const PricingToggle = ({
  isYearly,
  onToggle,
  className,
}: PricingToggleProps) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div className="relative flex justify-center items-center bg-[#F5F5F5] mx-auto p-2 rounded-[300px] w-fit overflow-hidden">
        {/* Background slider */}
        <div
          className={cn(
            "top-[5px] absolute bg-[#DACDFF] rounded-[300px] h-[80%] transition-all duration-300 ease-in-out",
            isYearly ? "left-[calc(50%+4px)]" : "left-2"
          )}
          style={{
            width: "calc(50% - 12px)",
          }}
        />

        <Button
          variant="ghost"
          onClick={() => onToggle(false)}
          className={cn(
            "z-[2] relative flex flex-1 justify-center items-center bg-none px-10 py-[15px] border-none rounded-[300px] min-w-[120px] font-semibold text-base transition-colors duration-300 cursor-pointer",
            !isYearly ? "text-[#5700C6]" : "text-[#333] hover:text-[#5700C6]"
          )}
        >
          Hàng tháng
        </Button>
        <Button
          variant="ghost"
          onClick={() => onToggle(true)}
          className={cn(
            "z-[2] relative flex flex-1 justify-center items-center bg-none px-10 py-[15px] border-none rounded-[300px] min-w-[120px] font-semibold text-base transition-colors duration-300 cursor-pointer",
            isYearly ? "text-[#5700C6]" : "text-[#333] hover:text-[#5700C6]"
          )}
        >
          Hàng năm
        </Button>
      </div>
    </div>
  );
};

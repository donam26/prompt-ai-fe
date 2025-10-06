"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { FREE_SUBSCRIPTION_TYPES } from "@/constants/subscription";
import { Product } from "@/types";

interface Props {
  product: Product;
  notionLogo?: string;
  onUpgradeClick?: () => void;
  onLoginClick?: () => void;
}

export const ProductCard = ({
  product,
  notionLogo = "/images/logos/notion-logo.png",
  onUpgradeClick,
  onLoginClick,
}: Props) => {
  const { user } = useAuth();

  const handleAccessClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    if (
      !user ||
      (user?.userSub?.subscription?.type &&
        FREE_SUBSCRIPTION_TYPES.includes(user.userSub.subscription.type as any))
    ) {
      e.preventDefault();
      if (user) {
        onUpgradeClick?.();
      } else {
        onLoginClick?.();
      }
    }
  };

  const isAccessible =
    user &&
    user?.userSub?.subscription?.type &&
    !FREE_SUBSCRIPTION_TYPES.includes(user.userSub.subscription.type as any);

  return (
    <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg p-4 sm:p-6 rounded-2xl transition-all hover:-translate-y-1 duration-300">
      {/* Top Section - Icon and Premium Badge */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        {/* Left - Icon */}
        <div className="flex justify-center items-center bg-white shadow-sm border border-gray-200 rounded-lg w-10 sm:w-12 h-10 sm:h-12">
          <Image
            src="/images/ai-tools/gpt.png"
            alt="AI Tool"
            width={24}
            height={24}
            className="w-5 sm:w-6 h-5 sm:h-6"
          />
        </div>

        <div className="flex justify-center items-center gap-2 bg-white px-2 py-1 rounded-full w-16 h-10">
          {" "}
          Pro
        </div>
      </div>

      {/* Main Content - Responsive Layout */}
      <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          {/* Thumbnail Image */}
          <div className="flex-shrink-0 mx-auto sm:mx-0 w-16 sm:w-20 h-16 sm:h-20">
            <Image
              src={product.image || "/images/ai-tools/default.png"}
              alt={product.name}
              width={80}
              height={80}
              className="rounded-lg w-full h-full object-cover"
            />
          </div>

          {/* Text Description */}
          <div className="flex-1 min-w-0 text-left">
            <h3 className="mb-1 font-bold text-gray-900 text-base sm:text-lg leading-tight">
              {product.name}
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">
              {product.description}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          {isAccessible ? (
            <a
              href={product.link}
              className="flex justify-center items-center gap-2 bg-purple-700 hover:bg-purple-600 px-4 py-3 rounded-lg w-full sm:w-auto font-semibold text-white text-sm no-underline transition-all duration-300 cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={notionLogo}
                alt="Notion"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>Truy cập Notion</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <button
              onClick={handleAccessClick}
              className="flex justify-center items-center gap-2 bg-purple-700 hover:bg-purple-600 px-4 py-3 rounded-full w-full sm:w-auto font-semibold text-white text-sm transition-all duration-300 cursor-pointer"
            >
              <Image
                src={notionLogo}
                alt="Notion"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>{user ? "Truy cập Notion" : "Đăng nhập"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

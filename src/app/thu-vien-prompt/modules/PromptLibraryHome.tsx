"use client";

import { useState, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { ToggleButtonGroup } from "./ToggleButtonGroup";
import { CategoryCard } from "./CategoryCard";
import { useCategoriesSimple } from "@/hooks/admin/useCategory/useCategoriesSimple";

interface PromptLibraryHomeProps {
  limit?: number;
}

export const enumType = { FREE: "free", PREMIUM: "premium" };

export const PromptLibraryHome = ({ limit }: PromptLibraryHomeProps) => {
  const [type, setType] = useState(enumType.PREMIUM);

  // Memoize filters to prevent unnecessary re-renders
  const filters = useMemo(
    () => ({
      type: type,
    }),
    [type]
  );

  const { categories, isFetching, error } = useCategoriesSimple({
    pagination: {
      pageIndex: 0,
      pageSize: 100,
    },
    filters,
  });

  const handleTypeChange = (newType: string) => {
    setType(newType);
  };

  const optionsTypes = [
    {
      id: 1,
      name: "Free",
      value: "free",
    },
    {
      id: 2,
      name: "Premium",
      value: "premium",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold text-gray-900 text-4xl">
            Thư Viện Prompt AI
          </h1>
          <p className="mx-auto max-w-3xl text-gray-600 text-sm sm:text-lg">
            Khám phá những Prompt AI chuyên sâu được thiết kế, tổng hợp và điều
            chỉnh từ các chuyên gia trong ngành, giúp tăng tốc và nâng cao hiệu
            suất làm việc của bạn.
          </p>
        </div>

        {/* Type Toggle */}
        <div className="flex flex-wrap justify-center items-center gap-2 mx-auto mb-8 w-full">
          <ToggleButtonGroup
            options={optionsTypes}
            active={type}
            setActive={handleTypeChange}
            customBackground="linear-gradient(90deg, #000000 0%, #A8A8A8 100%)"
          />
        </div>

        {/* Categories Grid */}
        <div className="mt-6">
          {isFetching ? (
            <div className="flex justify-center items-center py-20">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                <p className="text-gray-500">Đang tải danh mục...</p>
              </div>
            </div>
          ) : categories.length > 0 ? (
            <div className="justify-items-center gap-6 grid grid-cols-2 lg:grid-cols-3">
              {(limit ? categories.slice(0, limit) : categories).map(
                category => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    link={`/thu-vien-prompt/${category.name}/${category.id}?type=${type}`}
                    isPremium={category.type === "premium"}
                  />
                )
              )}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-gray-500 text-lg">Không có danh mục nào!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

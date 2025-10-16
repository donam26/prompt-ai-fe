"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  getPromptDetailUrlWithTab,
  getMidjourneyPromptDetailUrlWithTab,
} from "@/constants/routes-url";
import { Pagination } from "@/components/ui/pagination";
import { PromptCardV2 } from "./modules";
import { MenuItem } from "../[id]/modules/Sidebar";
import {
  usePrompts,
  useTopicsByCategory,
  useIndustriesByCategories,
  useFavoritePrompts,
  useNewestPrompts,
} from "@/hooks/lib-category-prompt";
import { categoryService } from "@/services/admin/categories";
import { Category } from "@/types";

export default function ListPromptsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract slug and ID from params
  const slug = params.slug as string[];
  const categoryId = slug?.[slug.length - 1] || "";
  const categoryName = slug?.[0] || "";

  // URL parameters
  const urlType = searchParams.get("type");

  // State
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [topicIds, setTopicIds] = useState<string[]>([]);
  const [industryIds, setIndustryIds] = useState<string[]>([]);
  const [subType] = useState<number | undefined>(
    urlType ? (urlType === "premium" ? 2 : 1) : undefined
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(12);

  // Fetch category
  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryId) return;

      try {
        setIsLoadingCategory(true);
        const response = await categoryService.getCategory(categoryId);
        setCategory(response.data as Category);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setIsLoadingCategory(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  // Memoized industry and topic strings
  const industryIdsString = useMemo(() => industryIds.join(","), [industryIds]);
  const topicIdsString = useMemo(() => topicIds.join(","), [topicIds]);

  // Memoized filters for prompts
  const promptFilters = useMemo(
    () => ({
      searchTerm: searchText,
      categoryId: categoryId,
      industryIds: industryIdsString || undefined,
      topicIds: topicIdsString || undefined,
      isType: "1",
      subType: subType,
    }),
    [searchText, categoryId, industryIdsString, topicIdsString, subType]
  );

  const promptPagination = useMemo(
    () => ({
      page: currentPage + 1,
      pageSize,
    }),
    [currentPage, pageSize]
  );

  // Fetch prompts
  const {
    prompts = [],
    isLoading: isLoadingPrompts,
    totalPages = 1,
  } = usePrompts({
    filters: promptFilters,
    pagination: promptPagination,
    enabled: !!categoryId,
  });

  // Fetch topics
  const { topics = [] } = useTopicsByCategory({
    categoryId: categoryId,
    enabled: !!categoryId,
  });

  // Memoized categoryIds array
  const categoryIdsArray = useMemo(
    () => (categoryId ? [categoryId] : []),
    [categoryId]
  );

  // Fetch industries
  const { industries = [] } = useIndustriesByCategories({
    categoryIds: categoryIdsArray,
    enabled: !!categoryId,
  });

  // Fetch favorite prompts
  const {
    favoritePrompts = [],
    favoriteIdsMap = {},
    refetch: refetchFavorites,
  } = useFavoritePrompts();

  // Fetch newest prompts
  const { newestPrompts = [] } = useNewestPrompts({
    categoryId: categoryId,
    enabled: !!categoryId,
  });

  // Handle favorite change
  const handleFavoriteChange = useCallback(() => {
    refetchFavorites();
  }, [refetchFavorites]);

  // Handlers
  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(0);
  };

  const handleTopicChange = (values: string[]) => {
    setTopicIds(values);
    setCurrentPage(0);
  };

  const handleIndustryChange = (values: string[]) => {
    setIndustryIds(values);
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClickMasterPrompter = () => {
    // Check user subscription and navigate accordingly
    window.open(
      "https://chatgpt.com/g/g-6826e0c336548191b5f0c520217ff3a3-prom-s-master-prompter",
      "_blank"
    );
  };

  const handleClickNangCapPrompt = () => {
    if (prompts.length === 0) {
      return;
    }

    const isMidjourney = category?.section?.name === "Midjourney";
    const baseUrl = isMidjourney
      ? getMidjourneyPromptDetailUrlWithTab(
          prompts[0].id,
          MenuItem.PROMPT_OPTIMIZER
        )
      : getPromptDetailUrlWithTab(prompts[0].id, MenuItem.PROMPT_OPTIMIZER);

    router.push(baseUrl);
  };

  // Handle prompt card click
  const handlePromptClick = (promptId: string | number) => {
    const isMidjourney = category?.section?.name === "Midjourney";
    const detailUrl = isMidjourney
      ? getMidjourneyPromptDetailUrlWithTab(promptId, MenuItem.MY_PROMPT)
      : getPromptDetailUrlWithTab(promptId, MenuItem.MY_PROMPT);

    router.push(detailUrl);
  };

  return (
    <div className="bg-white mx-auto px-4 py-8 min-h-screen container">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-bold text-gray-900 text-4xl">
            Prompt AI{" "}
            {isLoadingCategory
              ? "Loading..."
              : category?.name || categoryName || "Not Found"}
          </h1>
          <p className="mx-auto max-w-3xl text-gray-600 text-lg">
            Khám phá các Prompt AI tốt nhất cho ChatGPT được thiết kế để tăng
            cường doanh nghiệp của bạn và nâng cao năng suất làm việc.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mx-auto mb-6 max-w-2xl">
          <Search className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Tìm kiếm prompts"
            value={searchText}
            onChange={e => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 mb-6">
          {/* Industry Filter */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Ngành nghề
            </label>
            <MultiSelect
              options={industries.map(industry => ({
                label: industry.name,
                value: String(industry.id),
              }))}
              value={industryIds}
              onValueChange={handleIndustryChange}
              placeholder="Chọn ngành nghề"
              className="w-full"
            />
          </div>

          {/* Topic Filter */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Chủ đề
            </label>
            <MultiSelect
              options={topics.map(topic => ({
                label: topic.name,
                value: String(topic.id),
              }))}
              value={topicIds}
              onValueChange={handleTopicChange}
              placeholder="Chọn chủ đề"
              className="w-full"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          <button
            disabled={prompts.length === 0}
            onClick={handleClickNangCapPrompt}
            className="bg-purple-700 hover:bg-purple-600 disabled:opacity-50 px-6 py-2 rounded-full font-semibold text-white text-sm transition-colors disabled:cursor-not-allowed"
          >
            Nâng cấp Prompt
          </button>
          <button
            onClick={handleClickMasterPrompter}
            className="bg-purple-700 hover:bg-purple-600 px-6 py-2 rounded-full font-semibold text-white text-sm transition-colors"
          >
            Master Prompter
          </button>
        </div>

        {/* Prompts Grid */}
        <div className="mb-8">
          {isLoadingPrompts ? (
            <div className="flex justify-center items-center py-20">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                <p className="text-gray-500">Đang tải prompts...</p>
              </div>
            </div>
          ) : prompts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-gray-500 text-lg">Không tìm thấy prompt nào</p>
            </div>
          ) : (
            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 xl:grid-cols-4">
              {prompts.map(prompt => (
                <PromptCardV2
                  key={prompt.id}
                  prompt={prompt}
                  favoriteList={favoritePrompts}
                  favoriteIdsMap={favoriteIdsMap}
                  onPromptClick={handlePromptClick}
                  onFavoriteChange={handleFavoriteChange}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        )}

        {/* Newest Prompts Section */}
        {!isLoadingCategory && newestPrompts && newestPrompts.length > 0 && (
          <div className="mt-16">
            <div className="mb-8 text-center">
              <h2 className="font-bold text-gray-900 text-3xl">
                Các Prompt AI Mới Nhất Cho{" "}
                {category?.name || categoryName || ""}
              </h2>
            </div>

            <div className="relative">
              <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 xl:grid-cols-4">
                {newestPrompts.map(prompt => (
                  <PromptCardV2
                    key={prompt.id}
                    prompt={prompt}
                    favoriteList={favoritePrompts}
                    favoriteIdsMap={favoriteIdsMap}
                    onPromptClick={handlePromptClick}
                    onFavoriteChange={handleFavoriteChange}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

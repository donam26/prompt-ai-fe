"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { promptService, categoryService, industryService } from "@/services";
import { Prompt, Category, Industry, Section } from "@/types";
import { toast } from "sonner";

interface PromptLibraryFilters {
  searchTerm: string;
  categoryId: string;
  industryId: string;
  isType?: string;
  subType?: number;
}

interface PromptLibraryPagination {
  page: number;
  pageSize: number;
}

interface UsePromptLibraryOptions {
  filters?: Partial<PromptLibraryFilters>;
  pagination?: PromptLibraryPagination;
  enabled?: boolean;
}

export const usePromptLibrary = (options: UsePromptLibraryOptions = {}) => {
  const {
    filters = {},
    pagination = { page: 1, pageSize: 12 },
    enabled = true,
  } = options;

  const isInitialRender = useRef(true);
  const isFetchingRef = useRef(false);

  // State
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string>("");

  // Memoized values
  const memoizedFilters = useMemo(
    () => filters,
    [
      filters.searchTerm,
      filters.categoryId,
      filters.industryId,
      filters.isType,
      filters.subType,
    ]
  );
  const memoizedPagination = useMemo(
    () => pagination,
    [pagination.page, pagination.pageSize]
  );

  // Fetch prompts
  const fetchPrompts = useCallback(async () => {
    if (isFetchingRef.current || !enabled) return;

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const response = await promptService.getPromptsByCategoryId({
        page: memoizedPagination.page,
        pageSize: memoizedPagination.pageSize,
        categoryId: memoizedFilters.categoryId || "",
        industryId: memoizedFilters.industryId || undefined,
        searchText: memoizedFilters.searchTerm || undefined,
        isType: memoizedFilters.isType ? Number(memoizedFilters.isType) : 1,
        subType: memoizedFilters.subType || 2,
      });

      setPrompts((response.data.data as Prompt[]) || []);
      setTotalPages(response.data.pagination?.total || 1);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Có lỗi xảy ra khi tải prompts";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, [memoizedFilters, memoizedPagination, enabled]);

  // Fetch prompts when filters or pagination change
  useEffect(() => {
    if (enabled) {
      fetchPrompts();
    }
  }, [memoizedFilters, memoizedPagination, enabled, fetchPrompts]);

  return {
    prompts,
    isLoading,
    error,
    totalPages,
    fetchPrompts,
    refetch: fetchPrompts,
  };
};

export const usePromptLibraryData = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [favoritePrompts, setFavoritePrompts] = useState<string[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const { user } = useAuth();

  // Load categories
  const loadCategories = useCallback(async () => {
    try {
      const response = await categoryService.getCategories();
      setCategories(
        (response.data.data as unknown as Category[]) ||
          (response.data as unknown as Category[]) ||
          []
      );
    } catch {
      // Error loading categories - could be logged to monitoring service
    }
  }, []);

  // Load industries
  const loadIndustries = useCallback(async () => {
    try {
      const response = await industryService.getIndustries();
      setIndustries(
        (response.data.data as unknown as Industry[]) ||
          (response.data as unknown as Industry[]) ||
          []
      );
    } catch {
      // Error loading industries - could be logged to monitoring service
    }
  }, []);

  // Load sections
  const loadSections = useCallback(async () => {
    try {
      // Assuming there's a section service, if not we'll create mock data
      const mockSections: Section[] = [
        {
          id: 1,
          name: "ChatGPT",
          description: "/images/ai-tools/gpt.png",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Midjourney",
          description: "/images/ai-tools/mid.png",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setSections(mockSections);
    } catch {
      // Error loading sections - could be logged to monitoring service
    }
  }, []);

  // Load favorite prompts
  const loadFavoritePrompts = useCallback(async () => {
    if (!user) return;

    try {
      const response = await promptService.getFavoritePrompts(user.id);
      const favoriteIds = (
        (response.data as unknown as Prompt[]) ||
        (response.data as unknown as Prompt[]) ||
        []
      ).map((fav: Prompt) => fav.id);
      setFavoritePrompts(favoriteIds as string[]);
    } catch (error) {
      // Error loading favorite prompts - could be logged to monitoring service
      console.warn("Failed to load favorite prompts:", error);
      setFavoritePrompts([]);
    }
  }, [user]);

  // Load all data
  const loadAllData = useCallback(async () => {
    setIsLoadingData(true);
    try {
      await Promise.all([
        loadCategories(),
        loadIndustries(),
        loadSections(),
        loadFavoritePrompts(),
      ]);
    } finally {
      setIsLoadingData(false);
    }
  }, [loadCategories, loadIndustries, loadSections, loadFavoritePrompts]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return {
    categories,
    industries,
    sections,
    favoritePrompts,
    setFavoritePrompts,
    isLoadingData,
    loadAllData,
    loadFavoritePrompts,
  };
};

export const usePromptActions = () => {
  const { user } = useAuth();

  const handleFavorite = useCallback(
    async (
      promptId: string,
      favoritePrompts: string[],
      setFavoritePrompts: (fn: (prev: string[]) => string[]) => void
    ) => {
      if (!user) {
        toast.error("Vui lòng đăng nhập để thêm vào yêu thích");
        return;
      }

      try {
        if (favoritePrompts.includes(promptId)) {
          // Remove from favorites
          await promptService.removeFavoritePrompt(promptId);
          setFavoritePrompts(prev => prev.filter(id => id !== promptId));
          toast.success("Đã xóa khỏi yêu thích");
        } else {
          // Add to favorites
          await promptService.addFavoritePrompt({
            promptId,
            userId: user.id.toString(),
          });
          setFavoritePrompts(prev => [...prev, promptId]);
          toast.success("Đã thêm vào yêu thích");
        }
      } catch {
        toast.error("Có lỗi xảy ra");
      }
    },
    [user]
  );

  const handleCopyPrompt = useCallback((content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Đã sao chép prompt");
  }, []);

  return {
    handleFavorite,
    handleCopyPrompt,
  };
};

"use client";

import type { Category } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import {
  useCategoryDetail,
  useUpsertCategory,
} from "@/hooks/admin/useCategory";
import { useIndustries } from "@/hooks/admin/useIndustry";
import { FormSkeleton } from "@/components/ui/skeleton";
import { showToast } from "@/components/ui/toast";
import { CATEGORY_CONSTANTS } from "@/constants/category";
import { FormMode } from "@/constants/common";
import { CategoryForm } from "./modules/category-form";
import type { IndustryFilterState } from "@/types/admin/industry";
import type { PaginationParams } from "@/types/base";
import { debounce } from "@/lib/utils";
import { useDeepMemo } from "@/hooks/useDeepMemo";

export default function CategoryDetailsPage() {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();

  const formMode = id === "create" ? FormMode.CREATE : FormMode.EDIT;
  const isCreateMode = formMode === FormMode.CREATE;
  const categoryIdToUpdate = isCreateMode ? undefined : id;

  const {
    category: categoryData,
    isLoading,
    error: categoryDetailError,
  } = useCategoryDetail(categoryIdToUpdate);
  const {
    mutate: upsertCategory,
    isUpserting,
    error: upsertCategoryError,
  } = useUpsertCategory();

  // Industries state management for infinite scroll and search
  const [industriesSearch, setIndustriesSearch] = useState<string>("");
  const [industriesPagination, setIndustriesPagination] =
    useState<PaginationParams>({
      pageIndex: 0,
      pageSize: 10,
    });
  const [allIndustries, setAllIndustries] = useState<any[]>([]);

  // Debounced search handler - update industriesSearch after 1 second
  const debouncedSetSearch = useRef(
    debounce((search: string) => {
      setIndustriesSearch(search);
    }, 1000)
  ).current;

  // Build filters for industries
  const industriesFilters = useMemo<IndustryFilterState | undefined>(() => {
    const hasCategoryId = !!categoryIdToUpdate;
    const hasSearch = !!industriesSearch.trim();

    // Always return filters object, even if empty, to allow loading all industries
    const filters: IndustryFilterState = {
      ...(hasCategoryId && { categoryIds: [categoryIdToUpdate!] }),
      ...(hasSearch && { searchTerm: industriesSearch.trim() }),
    };

    return filters;
  }, [categoryIdToUpdate, industriesSearch]);

  // Fetch industries with pagination and search
  const { industriesWithPagination, isFetching: industriesLoading } =
    useIndustries({
      pagination: industriesPagination,
      filters: industriesFilters,
      enabled: true,
    });

  // Reset pagination when search changes (don't clear data yet, wait for API response)
  useEffect(() => {
    setIndustriesPagination(prev => ({ ...prev, pageIndex: 0 }));
  }, [industriesSearch]);

  // Memoize industries data to ensure stable reference and prevent dependency array size changes
  const industriesDataRaw = industriesWithPagination?.data || [];
  const industriesData = useDeepMemo(industriesDataRaw);

  const currentPageIndex = industriesPagination.pageIndex;

  // Accumulate industries data for infinite scroll
  // When pageIndex is 0, replace all data (this handles search reset)
  // When pageIndex > 0, append new data for infinite scroll
  useEffect(() => {
    if (currentPageIndex === 0) {
      // Replace all data when starting fresh (new search or initial load)
      setAllIndustries(industriesData);
    } else if (industriesData.length > 0) {
      // Append new data for infinite scroll
      setAllIndustries(prev => {
        const existingIds = new Set(prev.map(i => i.id));
        const newItems = industriesData.filter(i => !existingIds.has(i.id));
        return [...prev, ...newItems];
      });
    }
  }, [industriesData, currentPageIndex]);

  // Handle search change with debounce
  const handleIndustriesSearch = useCallback(
    (search: string) => {
      // Update immediately for UI feedback, but debounce the actual API call
      debouncedSetSearch(search);
    },
    [debouncedSetSearch]
  );

  // Extract stable values to prevent infinite loops
  const industriesTotalPages = industriesWithPagination?.totalPages || 1;
  const industriesCurrentPageIndex = industriesPagination.pageIndex;

  // Handle scroll to bottom (load more)
  const handleIndustriesScrollToBottom = useCallback(() => {
    if (industriesCurrentPageIndex + 1 < industriesTotalPages) {
      setIndustriesPagination(prev => ({
        ...prev,
        pageIndex: prev.pageIndex + 1,
      }));
    }
  }, [industriesTotalPages, industriesCurrentPageIndex]);

  // Check if there are more items to load
  const hasMoreIndustries = useMemo(() => {
    return industriesCurrentPageIndex + 1 < industriesTotalPages;
  }, [industriesTotalPages, industriesCurrentPageIndex]);

  const handleSave = useCallback(
    async (data: Partial<Category>) => {
      const result = await upsertCategory(data, categoryIdToUpdate);
      if (result) {
        showToast.success(
          categoryIdToUpdate
            ? "Category updated successfully"
            : "Category created successfully"
        );
        router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_LIST);
      }
    },
    [categoryIdToUpdate, upsertCategory, router]
  );

  const handleCancel = useCallback(() => {
    router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_LIST);
  }, [router]);

  useEffect(() => {
    const errorMessage = categoryDetailError || upsertCategoryError;
    if (!errorMessage) {
      return;
    }
    showToast.error(errorMessage);
    if (categoryDetailError) {
      router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_LIST);
    }
  }, [categoryDetailError, upsertCategoryError, router]);

  if (isLoading) {
    return <FormSkeleton />;
  }

  if (isUpserting) {
    return <FormSkeleton />;
  }

  return (
    <CategoryForm
      category={categoryData}
      mode={formMode}
      onSave={handleSave}
      onCancel={handleCancel}
      isSaving={isUpserting}
      isLoading={isLoading}
      industries={allIndustries}
      industriesLoading={industriesLoading}
      industriesSearch={industriesSearch}
      onIndustriesSearch={handleIndustriesSearch}
      onIndustriesScrollToBottom={handleIndustriesScrollToBottom}
      hasMoreIndustries={hasMoreIndustries}
    />
  );
}

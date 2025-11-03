"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Feedback } from "@/types/entities/feedback";
import type { PaginationParams } from "@/types/base";
import type { ApiCallResult } from "@/types/services/common";
import { feedbackService } from "@/services/admin/feedbacks/feedbackService";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import type { FeedbackFilterState } from "@/types/admin/feedback";
import { useDeepMemo } from "@/hooks/useDeepMemo";
import {
  applyNonEmptyFiltersToQuery,
  buildQueryString,
} from "@/utils/common-helper";
import { mapFeedbackStatusToDbValue } from "@/types/enums/feedback-filter";

interface Props {
  readonly refetch?: () => void;
  readonly filters?: FeedbackFilterState;
  readonly pagination?: PaginationParams;
  readonly enabled?: boolean;
}

export function useFeedbacks(options: Props = {}) {
  const {
    filters = {},
    pagination = DEFAULT_PAGINATION,
    enabled = true,
  } = options;
  const isInitialRender = useRef(true);
  const isFetchingRef = useRef(false);

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [feedbacksWithPagination, setFeedbacksWithPagination] = useState<
    ApiCallResult<Feedback[]>
  >({
    data: [],
    total: DEFAULT_TOTAL,
    totalPages: DEFAULT_TOTAL_PAGES,
  });
  const [error, setError] = useState<string>("");

  const memoizedPageIndex = useMemo(
    () => pagination.pageIndex,
    [pagination.pageIndex]
  );
  const memoizedPageSize = useMemo(
    () => pagination.pageSize,
    [pagination.pageSize]
  );
  const memoizedFilters = useDeepMemo(filters);

  const fetchFeedbacks = useCallback(async () => {
    if (isFetchingRef.current || !enabled) {
      return;
    }

    isFetchingRef.current = true;
    setIsFetching(true);

    try {
      const query: Record<string, unknown> = {
        pageIndex: memoizedPageIndex + 1,
        pageSize: memoizedPageSize,
        ...memoizedFilters,
      };

      buildQueryString(query);
      applyNonEmptyFiltersToQuery(
        memoizedFilters as Record<string, unknown>,
        query
      );

      const response = await feedbackService.getFeedbacksPage({
        pageIndex: memoizedPageIndex + 1,
        pageSize: memoizedPageSize,
        status: mapFeedbackStatusToDbValue((memoizedFilters as any).status),
      });

      const responseData = response.data.data || [];
      const total = response.data.pagination.total || DEFAULT_TOTAL;
      const totalPages =
        response.data.pagination.totalPages || DEFAULT_TOTAL_PAGES;

      setFeedbacks(responseData);
      setFeedbacksWithPagination({
        data: responseData,
        total,
        totalPages,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      isFetchingRef.current = false;
      setIsFetching(false);
    }
  }, [memoizedPageIndex, memoizedPageSize, memoizedFilters, enabled]);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (Object.keys(filters).length > 0 && enabled) {
      fetchFeedbacks();
    }
  }, [filters, fetchFeedbacks, enabled]);

  return {
    feedbacks,
    isFetching,
    error,
    feedbacksWithPagination,
    fetchFeedbacks,
    refetch: fetchFeedbacks,
  };
}

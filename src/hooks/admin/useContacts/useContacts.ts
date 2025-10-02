"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Contact } from "@/types/entities/contact";
import type { PaginationParams } from "@/types/base";
import type { ApiCallResult } from "@/types/services/common";
import { contactService } from "@/services/admin/contacts/contactService";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import type { ContactFilterState } from "@/types/admin/contact";
import { useDeepMemo } from "@/hooks/useDeepMemo";
import {
  applyNonEmptyFiltersToQuery,
  buildQueryString,
} from "@/utils/common-helper";
import {
  mapStatusToDbValue,
  mapTypeToDbValue,
} from "@/types/enums/contact-filter";

interface Props {
  refetch?: () => void;
  filters?: ContactFilterState;
  pagination?: PaginationParams;
  enabled?: boolean;
}

export function useContacts(options: Props = {}) {
  const {
    filters = {},
    pagination = DEFAULT_PAGINATION,
    enabled = true,
  } = options;
  const isInitialRender = useRef(true);
  const isFetchingRef = useRef(false);

  // Contacts state
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [contactsWithPagination, setContactsWithPagination] = useState<
    ApiCallResult<Contact[]>
  >({
    data: [],
    total: DEFAULT_TOTAL,
    totalPages: DEFAULT_TOTAL_PAGES,
  });
  const [error, setError] = useState<string>("");

  // Memoize pagination values individually to prevent unnecessary re-renders
  const memoizedPageIndex = useMemo(
    () => pagination.pageIndex,
    [pagination.pageIndex]
  );
  const memoizedPageSize = useMemo(
    () => pagination.pageSize,
    [pagination.pageSize]
  );
  const memoizedFilters = useDeepMemo(filters);

  // Manual refetch function that doesn't cause infinite loops
  const fetchContacts = useCallback(async () => {
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

      // Build query string for API call with proper array handling
      const queryString = buildQueryString(query);
      applyNonEmptyFiltersToQuery(
        memoizedFilters as Record<string, unknown>,
        query
      );

      // Map frontend filter values to database values using enum functions

      const response = await contactService.getContactsPage({
        pageIndex: memoizedPageIndex + 1,
        pageSize: memoizedPageSize,
        status: mapStatusToDbValue((memoizedFilters as any).status),
        type: mapTypeToDbValue((memoizedFilters as any).type) || 1,
      });

      // Extract data from the response structure
      const responseData = response.data.data || [];
      const total = response.data.pagination.total || DEFAULT_TOTAL;
      const totalPages =
        response.data.pagination.totalPages || DEFAULT_TOTAL_PAGES;

      setContacts(responseData);
      setContactsWithPagination({
        data: responseData,
        total,
        totalPages,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      // Keep existing contacts on error
    } finally {
      isFetchingRef.current = false;
      setIsFetching(false);
    }
  }, [memoizedPageIndex, memoizedPageSize, memoizedFilters, enabled]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Handle filters changes - only after initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Only fetch when filters are provided and not empty
    if (Object.keys(filters).length > 0 && enabled) {
      fetchContacts();
    }
  }, [filters, fetchContacts, enabled]);

  return {
    // Contacts data
    contacts,
    isFetching,
    error,
    contactsWithPagination,

    // Utilities
    fetchContacts,
    refetch: fetchContacts,
  };
}

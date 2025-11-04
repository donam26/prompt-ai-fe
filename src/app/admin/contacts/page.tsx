"use client";

import { useState, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  ContactFilters,
  ContactHeader,
  useContactColumns,
  adaptColumnsForDataTable,
} from "@/app/admin/contacts/modules";
import { useContacts } from "@/hooks/admin/useContacts";
import type { ContactFilterState, Contact } from "@/types";
import type { PaginationParams as IPagination } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
  CONTACTS_CONSTANTS,
} from "@/constants";
import { DataTable } from "@/components/data-table";

function ContactManagementContent(): React.JSX.Element {
  const router = useRouter();

  const [filters, setFilters] = useState<ContactFilterState>(
    CONTACTS_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] = useState<IPagination>(DEFAULT_PAGINATION);

  const { contactsWithPagination, isFetching: contactsLoading } = useContacts({
    pagination,
    filters,
  });

  const handlePaginationChange = useCallback(
    (newPagination: IPagination) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = contactsLoading;

  const handleViewContact = (contact: Contact) => {
    router.push(CONTACTS_CONSTANTS.ROUTES.CONTACT_VIEW(contact.id));
  };

  const handleFilterChange = useCallback(
    (newFilters: ContactFilterState): void => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
    },
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(CONTACTS_CONSTANTS.INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  // Create columns with handlers
  const tanstackColumns = useContactColumns({
    onViewAction: handleViewContact,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <ContactHeader />

        <ContactFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <DataTable<Contact>
          columns={columns}
          data={contactsWithPagination?.data || []}
          pageCount={contactsWithPagination?.totalPages || DEFAULT_TOTAL_PAGES}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalItems={contactsWithPagination?.total || DEFAULT_TOTAL}
          onPaginationChangeAction={handlePaginationChange}
          loading={isLoading}
        />
      </div>
    </AdminContentCard>
  );
}

// Dynamically import to avoid SSR issues with useSearchParams
const ContactManagementContentDynamic = dynamic(
  () => Promise.resolve(ContactManagementContent),
  {
    ssr: false,
    loading: () => (
      <AdminContentCard>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="mx-auto mb-4 border-purple-600 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
            <p className="text-gray-600">Đang tải trang quản lý liên hệ...</p>
          </div>
        </div>
      </AdminContentCard>
    ),
  }
);

export default function ContactManagementPage(): React.JSX.Element {
  return (
    <Suspense
      fallback={
        <AdminContentCard>
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="mx-auto mb-4 border-purple-600 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
              <p className="text-gray-600">Đang tải trang quản lý liên hệ...</p>
            </div>
          </div>
        </AdminContentCard>
      }
    >
      <ContactManagementContentDynamic />
    </Suspense>
  );
}

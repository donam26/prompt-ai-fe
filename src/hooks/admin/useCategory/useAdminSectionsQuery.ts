import { useQuery } from "@tanstack/react-query";
import { sectionService } from "@/services";
import { queryKeys } from "@/types/shared/types";

interface UseAdminSectionsQueryResult {
  data: any;
  isLoading: boolean;
  error: any;
  refetch: () => void;
}

export const useAdminSectionsQuery = (): UseAdminSectionsQueryResult => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [...queryKeys.admin.categories, "sections"],
    queryFn: sectionService.getSections,
    enabled: true,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

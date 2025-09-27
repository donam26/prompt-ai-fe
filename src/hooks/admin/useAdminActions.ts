import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface UseAdminActionsProps {
  createRoute: string;
  editRoute: (id: string | number) => string;
  viewRoute?: (id: string | number) => string;
}

interface UseAdminActionsReturn<T> {
  handleCreate: () => void;
  handleEdit: (item: T) => void;
  handleView?: (item: T) => void;
}

export function useAdminActions<T extends { id: string | number }>({
  createRoute,
  editRoute,
  viewRoute,
}: UseAdminActionsProps): UseAdminActionsReturn<T> {
  const router = useRouter();

  const handleCreate = useCallback(() => {
    router.push(createRoute);
  }, [router, createRoute]);

  const handleEdit = useCallback(
    (item: T) => {
      router.push(editRoute(item.id));
    },
    [router, editRoute]
  );

  const handleView = useCallback(
    (item: T) => {
      if (viewRoute) {
        router.push(viewRoute(item.id));
      }
    },
    [router, viewRoute]
  );

  return {
    handleCreate,
    handleEdit,
    handleView: viewRoute ? handleView : undefined,
  };
}

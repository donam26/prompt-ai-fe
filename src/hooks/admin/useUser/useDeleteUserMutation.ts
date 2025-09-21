/**
 * Delete user mutation hook
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/users/userService";
import { queryKeys } from "@/types/shared/types";
import { toast } from "sonner";

/**
 * Hook for deleting a user
 *
 * @returns Delete user mutation
 */
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.users,
      });
      toast.success("Xóa người dùng thành công");
    },
    onError: (_error: any) => {
      toast.error("Có lỗi xảy ra khi xóa người dùng");
      // console.error("Delete user error:", _error);
    },
  });
};

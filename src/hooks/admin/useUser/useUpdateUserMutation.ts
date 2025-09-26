/**
 * Update user mutation hook
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/users/userService";
import { queryKeys } from "@/types/shared/types";
import { toast } from "sonner";
import { ApiSingleResponse } from "@/types/api";

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  phone?: string;
  avatar?: string;
}

/**
 * Hook for updating a user
 *
 * @returns Update user mutation
 */
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiSingleResponse<any>,
    Error,
    {
      id: string | number;
      userData: UpdateUserData;
    }
  >({
    mutationFn: ({
      id,
      userData,
    }: {
      id: string | number;
      userData: UpdateUserData;
    }) => userService.updateUser(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.users,
      });
      toast.success("Cập nhật người dùng thành công");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi cập nhật người dùng");
    },
  });
};

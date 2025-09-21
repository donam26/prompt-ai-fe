/**
 * Create user mutation hook
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/users/userService";
import { queryKeys } from "@/types/shared/types";
import { toast } from "sonner";

export interface CreateUserData {
  name: string;
  email: string;
  role: string;
  status: string;
  phone?: string;
  avatar?: string;
}

/**
 * Hook for creating a new user
 *
 * @returns Create user mutation
 */
export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateUserData) => userService.createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.users,
      });
      toast.success("Tạo người dùng thành công");
    },
    onError: (_error: any) => {
      toast.error("Có lỗi xảy ra khi tạo người dùng");
      // console.error("Create user error:", _error);
    },
  });
};

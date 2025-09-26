"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "@/services";
import { toast } from "sonner";

/**
 * Hook for deleting a payment
 *
 * @returns Mutation object for deleting payments
 */
export const useDeletePaymentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number): Promise<void> => {
      await paymentService.deletePayment(id);
    },
    onSuccess: () => {
      // Invalidate and refetch payments queries
      queryClient.invalidateQueries({
        queryKey: ["admin-payments"],
      });

      toast.success("Xóa payment thành công");
    },
    onError: (error: Error) => {
      // Error handling - could be logged to monitoring service
      toast.error(`Lỗi khi xóa payment: ${error.message}`);
    },
  });
};

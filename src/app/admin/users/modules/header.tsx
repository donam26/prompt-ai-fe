"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
interface UserHeaderProps {
  onAddUser: () => void;
}

/**
 * User page header component
 *
 * @param props - The component props
 * @returns The user header JSX
 */
export const UserHeader = ({
  onAddUser,
}: UserHeaderProps): React.JSX.Element => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="font-bold text-gray-900 text-3xl">Quản lý Người dùng</h1>
      <p className="mt-2 text-gray-600">
        Quản lý tài khoản người dùng trong hệ thống
      </p>
    </div>
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={onAddUser}
          className="bg-primary-600 hover:bg-primary-700 shadow-sm text-white"
        >
          <Plus className="mr-2 w-4 h-4" />
          Thêm người dùng
        </Button>
      </DialogTrigger>
    </Dialog>
  </div>
);

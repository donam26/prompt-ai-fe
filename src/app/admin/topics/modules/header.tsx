"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { TopicFilterState } from "@/types/admin/topic";

interface TopicHeaderProps {
  onAddTopic: () => void;
  filters: TopicFilterState;
  disabled: boolean;
}

export const TopicHeader = ({
  onAddTopic,
}: TopicHeaderProps): React.JSX.Element => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="font-bold text-gray-900 text-3xl">Quản lý Topic</h1>
      <p className="mt-2 text-gray-600">Quản lý các topic trong hệ thống</p>
    </div>
    <div className="flex items-center gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={onAddTopic}
            className="bg-primary-600 hover:bg-primary-700 shadow-sm text-white"
          >
            <Plus className="mr-2 w-4 h-4" />
            Thêm topic
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  </div>
);

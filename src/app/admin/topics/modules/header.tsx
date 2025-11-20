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
  <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-4">
    <div className="sm:text-left text-center">
      <h1 className="font-bold text-gray-900 text-2xl sm:text-3xl">
        Quản lý Topic
      </h1>
      <p className="mt-1 sm:mt-2 text-gray-600">
        Quản lý các topic trong hệ thống
      </p>
    </div>
    <div className="flex items-center gap-3 w-full sm:w-auto">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={onAddTopic}
            className="bg-primary-600 hover:bg-primary-700 shadow-sm text-white justify-center w-full sm:w-auto"
          >
            <Plus className="mr-2 w-4 h-4" />
            Thêm topic
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  </div>
);

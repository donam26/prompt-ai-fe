import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { Section } from "@/lib/types";

export interface FilterState {
  searchTerm: string;
  sectionId: string; // "all" means no filter
  status: string; // "all" means no filter
}

interface CategoryFilterProps {
  sections: Section[];
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  initialFilters?: Partial<FilterState>;
  className?: string;
  showActiveFilters?: boolean;
}

export const CategoryFilter = ({
  sections,
  onFilterChange,
  onClearFilters,
  initialFilters = {},
  className,
  showActiveFilters = true,
}: CategoryFilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    sectionId: "all",
    status: "all",
    ...initialFilters,
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      searchTerm: "",
      sectionId: "all",
      status: "all",
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const handleRemoveFilter = (key: keyof FilterState) => {
    const newFilters = { ...filters, [key]: key === "searchTerm" ? "" : "all" };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === "searchTerm") return value !== "";
    return value !== "all";
  });

  const getActiveFilters = () => {
    const activeFilters: Array<{
      key: keyof FilterState;
      label: string;
      value: string;
    }> = [];

    if (filters.searchTerm) {
      activeFilters.push({
        key: "searchTerm",
        label: "Tìm kiếm",
        value: filters.searchTerm,
      });
    }

    if (filters.sectionId && filters.sectionId !== "all") {
      const section = sections.find(s => String(s.id) === filters.sectionId);
      activeFilters.push({
        key: "sectionId",
        label: "Phân loại",
        value: section?.name || "Không xác định",
      });
    }

    if (filters.status && filters.status !== "all") {
      const statusLabel =
        filters.status === "active" ? "Hoạt động" : "Sắp ra mắt";
      activeFilters.push({
        key: "status",
        label: "Trạng thái",
        value: statusLabel,
      });
    }

    return activeFilters;
  };

  const activeFilters = getActiveFilters();

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span className="flex items-center">
              <Filter className="mr-2 w-4 h-4" />
              Tìm kiếm và lọc
            </span>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="mr-1 w-3 h-3" />
                Xóa bộ lọc
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            {/* Search Input */}
            <div className="space-y-2">
              <Label htmlFor="search">Tìm kiếm</Label>
              <div className="relative">
                <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform" />
                <Input
                  id="search"
                  placeholder="Tìm kiếm danh mục..."
                  value={filters.searchTerm}
                  onChange={e =>
                    handleFilterChange("searchTerm", e.target.value)
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {/* Section Filter */}
            <div className="space-y-2">
              <Label htmlFor="section">Phân loại</Label>
              <Select
                value={filters.sectionId}
                onValueChange={value => handleFilterChange("sectionId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả phân loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả phân loại</SelectItem>
                  {sections.map(section => (
                    <SelectItem key={section.id} value={String(section.id)}>
                      {section.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={filters.status}
                onValueChange={value => handleFilterChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="coming_soon">Sắp ra mắt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {showActiveFilters && activeFilters.length > 0 && (
        <div className="space-y-2 mt-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-muted-foreground text-sm">
              Bộ lọc đang áp dụng:
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="px-2 h-6 text-muted-foreground hover:text-foreground"
            >
              Xóa tất cả
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(filter => (
              <Badge
                key={filter.key}
                variant="secondary"
                className="flex items-center gap-1 pr-1"
              >
                <span className="text-xs">
                  {filter.label}: <strong>{filter.value}</strong>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFilter(filter.key)}
                  className="hover:bg-transparent p-0 w-4 h-4"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

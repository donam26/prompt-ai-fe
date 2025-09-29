"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  promptService,
  categoryService,
  topicService,
  industryService,
} from "@/services";
import { Prompt, Category, Topic, Industry } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BaseSelect } from "@/components/ui/base-select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Search, Copy, Heart } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function PromptLibraryPage() {
  const { user } = useAuth();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [favoritePrompts, setFavoritePrompts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("all");

  const loadPrompts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await promptService.getPromptsByCategoryId({
        page: currentPage,
        pageSize: 12,
        categoryId: selectedCategory || "",
        topicId: selectedTopic || undefined,
        industryId: selectedIndustry || undefined,
        searchText: searchTerm || undefined,
        isType: 1,
        subType: 2,
      });

      setPrompts((response.data.data as Prompt[]) || []);
      setTotalPages(response.data.pagination.total);
    } catch {
      // Error loading prompts - could be logged to monitoring service
      toast.error("Có lỗi xảy ra khi tải prompts");
    } finally {
      setIsLoading(false);
    }
  }, [
    currentPage,
    selectedCategory,
    selectedTopic,
    selectedIndustry,
    searchTerm,
  ]);

  const loadCategories = useCallback(async () => {
    try {
      const response = await categoryService.getCategories();
      setCategories(
        (response.data.data as unknown as Category[]) ||
          (response.data as unknown as Category[]) ||
          []
      );
    } catch {
      // Error loading categories - could be logged to monitoring service
    }
  }, []);

  const loadTopics = useCallback(async () => {
    try {
      const response = await topicService.getTopics();
      setTopics(
        (response.data.data as unknown as Topic[]) ||
          (response.data as unknown as Topic[]) ||
          []
      );
    } catch {
      // Error loading topics - could be logged to monitoring service
    }
  }, []);

  const loadIndustries = useCallback(async () => {
    try {
      const response = await industryService.getIndustries();
      setIndustries(
        (response.data.data as unknown as Industry[]) ||
          (response.data as unknown as Industry[]) ||
          []
      );
    } catch {
      // Error loading industries - could be logged to monitoring service
    }
  }, []);

  const loadFavoritePrompts = useCallback(async () => {
    if (!user) return;

    try {
      const response = await promptService.getFavoritePrompts(user.id);
      const favoriteIds = (
        (response.data as unknown as Prompt[]) ||
        (response.data as unknown as Prompt[]) ||
        []
      ).map((fav: Prompt) => fav.id);
      setFavoritePrompts(favoriteIds as string[]);
    } catch {
      // Error loading favorite prompts - could be logged to monitoring service
    }
  }, [user]);

  const handleSearch = () => {
    setCurrentPage(1);
    loadPrompts();
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
    loadPrompts();
  };

  const handleFavorite = async (promptId: string) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thêm vào yêu thích");
      return;
    }

    try {
      if (favoritePrompts.includes(promptId)) {
        // Remove from favorites
        await promptService.removeFavoritePrompt(promptId);
        setFavoritePrompts(prev => prev.filter(id => id !== promptId));
        toast.success("Đã xóa khỏi yêu thích");
      } else {
        // Add to favorites
        await promptService.addFavoritePrompt({
          promptId,
          userId: user.id.toString(),
        });
        setFavoritePrompts(prev => [...prev, promptId]);
        toast.success("Đã thêm vào yêu thích");
      }
    } catch {
      // Error toggling favorite - could be logged to monitoring service
      toast.error("Có lỗi xảy ra");
    }
  };

  const handleCopyPrompt = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Đã sao chép prompt");
  };

  useEffect(() => {
    loadCategories();
    loadTopics();
    loadIndustries();
    loadFavoritePrompts();
  }, [user, loadCategories, loadTopics, loadIndustries, loadFavoritePrompts]);

  useEffect(() => {
    loadPrompts();
  }, [
    currentPage,
    selectedCategory,
    selectedTopic,
    selectedIndustry,
    searchTerm,
    loadPrompts,
  ]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="mx-auto px-4 py-6 container">
          <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4">
            <div>
              <h1 className="font-bold text-gray-900 text-3xl">
                Thư viện Prompt
              </h1>
              <p className="mt-1 text-gray-600">
                Khám phá hàng nghìn prompt AI chuyên nghiệp
              </p>
            </div>
            {user && (
              <Link href="/user-information">
                <Button variant="outline">Thông tin cá nhân</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 py-8 container">
        {/* Search and Filters */}
        <div className="bg-white shadow-sm mb-8 p-6 border rounded-lg">
          <div className="flex lg:flex-row flex-col gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm prompt..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                  onKeyPress={e => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>

            <div className="flex sm:flex-row flex-col gap-4">
              <BaseSelect
                items={[
                  { id: "", name: "Tất cả danh mục" },
                  ...categories.map(category => ({
                    id: String(category.id),
                    name: category.name,
                  })),
                ]}
                value={selectedCategory}
                onValueChange={value => {
                  setSelectedCategory(value);
                  handleFilterChange();
                }}
                placeholder="Chọn danh mục"
                triggerClassName="w-full sm:w-[200px]"
              />

              <BaseSelect
                items={[
                  { id: "", name: "Tất cả chủ đề" },
                  ...topics.map(topic => ({
                    id: String(topic.id),
                    name: topic.name,
                  })),
                ]}
                value={selectedTopic}
                onValueChange={value => {
                  setSelectedTopic(value);
                  handleFilterChange();
                }}
                placeholder="Chọn chủ đề"
                triggerClassName="w-full sm:w-[200px]"
              />

              <BaseSelect
                items={[
                  { id: "", name: "Tất cả ngành nghề" },
                  ...industries.map(industry => ({
                    id: String(industry.id),
                    name: industry.name,
                  })),
                ]}
                value={selectedIndustry}
                onValueChange={value => {
                  setSelectedIndustry(value);
                  handleFilterChange();
                }}
                placeholder="Chọn ngành nghề"
                triggerClassName="w-full sm:w-[200px]"
              />

              <Button onClick={handleSearch} className="w-full sm:w-auto">
                <Search className="mr-2 w-4 h-4" />
                Tìm kiếm
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="chatgpt">ChatGPT</TabsTrigger>
            <TabsTrigger value="midjourney">Midjourney</TabsTrigger>
            <TabsTrigger value="favorites">Yêu thích</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <PromptGrid
              prompts={prompts}
              isLoading={isLoading}
              favoritePrompts={favoritePrompts}
              onFavorite={handleFavorite}
              onCopy={handleCopyPrompt}
            />
          </TabsContent>

          <TabsContent value="chatgpt" className="mt-6">
            <PromptGrid
              prompts={prompts.filter(p => p.is_type == "1")}
              isLoading={isLoading}
              favoritePrompts={favoritePrompts}
              onFavorite={handleFavorite}
              onCopy={handleCopyPrompt}
            />
          </TabsContent>

          <TabsContent value="midjourney" className="mt-6">
            <PromptGrid
              prompts={prompts.filter(p => p.is_type == "2")}
              isLoading={isLoading}
              favoritePrompts={favoritePrompts}
              onFavorite={handleFavorite}
              onCopy={handleCopyPrompt}
            />
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <PromptGrid
              prompts={prompts.filter(p =>
                favoritePrompts.includes(p.id.toString())
              )}
              isLoading={isLoading}
              favoritePrompts={favoritePrompts}
              onFavorite={handleFavorite}
              onCopy={handleCopyPrompt}
            />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Trước
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage(prev => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Sau
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface PromptGridProps {
  prompts: Prompt[];
  isLoading: boolean;
  favoritePrompts: string[];
  onFavorite: (promptId: string) => void;
  onCopy: (content: string) => void;
}

function PromptGrid({
  prompts,
  isLoading,
  favoritePrompts,
  onFavorite,
  onCopy,
}: PromptGridProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (prompts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">Không tìm thấy prompt nào</p>
      </div>
    );
  }

  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {prompts.map(prompt => (
        <Card
          key={prompt.id}
          className="group hover:shadow-lg transition-all duration-300"
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <Badge variant="secondary">
                {prompt.is_type == "1" ? "ChatGPT" : "Midjourney"}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFavorite(prompt.id.toString())}
                className={
                  favoritePrompts.includes(prompt.id.toString())
                    ? "text-red-500"
                    : "text-gray-400"
                }
              >
                <Heart
                  className={`h-4 w-4 ${
                    favoritePrompts.includes(prompt.id.toString())
                      ? "fill-current"
                      : ""
                  }`}
                />
              </Button>
            </div>
            <CardTitle className="text-lg line-clamp-2">
              {prompt.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4 line-clamp-3">
              {prompt.description || prompt.content}
            </CardDescription>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCopy(prompt.content)}
                className="flex-1"
              >
                <Copy className="mr-2 w-4 h-4" />
                Sao chép
              </Button>
              <Link href={`/thu-vien-prompt/detail-prompts/${prompt.id}`}>
                <Button size="sm" className="flex-1">
                  Xem chi tiết
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

"use client";

import { usePrompts, useCategories, useCreatePrompt } from "@/hooks/useApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus } from "lucide-react";

/**
 * Example component demonstrating React Query usage
 * This shows how to use the custom hooks for data fetching and mutations
 */
export const ReactQueryExample = () => {
  // Fetch prompts with React Query
  const {
    data: prompts,
    isLoading: promptsLoading,
    error: promptsError,
    refetch: refetchPrompts,
  } = usePrompts({ limit: 5 });

  // Fetch categories with React Query
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  // Create prompt mutation
  const createPromptMutation = useCreatePrompt();

  const handleCreatePrompt = () => {
    createPromptMutation.mutate({
      title: "Example Prompt",
      content: "This is an example prompt created with React Query",
      categoryId: 1,
      tags: ["example", "react-query"],
    });
  };

  if (promptsLoading || categoriesLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center p-6">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="ml-2">Loading...</span>
        </CardContent>
      </Card>
    );
  }

  if (promptsError || categoriesError) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500">
            Error loading data:{" "}
            {promptsError?.message || categoriesError?.message}
          </p>
          <Button onClick={() => refetchPrompts()} className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            React Query Example
            <Button
              onClick={handleCreatePrompt}
              disabled={createPromptMutation.isPending}
              size="sm"
            >
              {createPromptMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Create Prompt
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">
                Categories ({categories?.length || 0})
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories?.map(category => (
                  <Badge key={category.id} variant="secondary">
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">
                Recent Prompts ({prompts?.length || 0})
              </h3>
              <div className="space-y-2">
                {prompts?.map(prompt => (
                  <div
                    key={prompt.id}
                    className="hover:bg-gray-50 p-3 border rounded-lg transition-colors"
                  >
                    <h4 className="font-medium">{prompt.title}</h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {prompt.content}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {prompt.tags?.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

"use client";

import { useCallback, useEffect, useState } from "react";
import { Section } from "@/types";

export const useSections = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Load sections (mock data for now)
  const loadSections = useCallback(async () => {
    try {
      setIsLoading(true);
      // Mock sections data
      const mockSections: Section[] = [
        {
          id: 1,
          name: "ChatGPT",
          description: "/images/ai-tools/gpt.png",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Midjourney",
          description: "/images/ai-tools/mid.png",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setSections(mockSections);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Có lỗi xảy ra khi tải sections";
      setError(errorMessage);
      console.error("Failed to load sections:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  return {
    sections,
    isLoading,
    error,
    loadSections,
    refetch: loadSections,
  };
};

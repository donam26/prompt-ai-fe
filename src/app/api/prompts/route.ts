import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/prompts - Get prompts with pagination and filters
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const search = searchParams.get("search_text") || "";
    const categoryId = searchParams.get("category_id") || "";
    const status = searchParams.get("status") || "";
    const isType = searchParams.get("is_type") || "";
    const tags = searchParams.getAll("tags") || [];

    // Mock data for now - replace with actual database query
    const mockPrompts = [
      {
        id: 1,
        title: "AI Writing Assistant",
        content: "Help me write a professional email...",
        categoryId: 1,
        tags: ["ai", "writing"],
        isPublic: true,
        isPremium: false,
        description: "AI-powered writing assistant",
        image: null,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
      {
        id: 2,
        title: "Code Review Helper",
        content: "Review this code for best practices...",
        categoryId: 2,
        tags: ["coding", "review"],
        isPublic: true,
        isPremium: true,
        description: "Code review assistance",
        image: null,
        createdAt: "2024-01-02T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      {
        id: 3,
        title: "Marketing Copy Generator",
        content: "Create compelling marketing copy...",
        categoryId: 3,
        tags: ["marketing", "copywriting"],
        isPublic: false,
        isPremium: true,
        description: "Marketing copy generation",
        image: null,
        createdAt: "2024-01-03T00:00:00Z",
        updatedAt: "2024-01-03T00:00:00Z",
      },
    ];

    // Apply filters
    let filteredPrompts = mockPrompts;

    if (search) {
      filteredPrompts = filteredPrompts.filter(
        prompt =>
          prompt.title.toLowerCase().includes(search.toLowerCase()) ||
          prompt.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryId && categoryId !== "all") {
      filteredPrompts = filteredPrompts.filter(
        prompt => prompt.categoryId.toString() === categoryId
      );
    }

    if (status && status !== "all") {
      filteredPrompts = filteredPrompts.filter(prompt =>
        status === "active" ? prompt.isPublic : !prompt.isPublic
      );
    }

    if (isType && isType !== "all") {
      filteredPrompts = filteredPrompts.filter(prompt =>
        isType === "premium" ? prompt.isPremium : !prompt.isPremium
      );
    }

    if (tags.length > 0) {
      filteredPrompts = filteredPrompts.filter(prompt =>
        tags.some(tag => prompt.tags.includes(tag))
      );
    }

    // Apply pagination
    const total = filteredPrompts.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPrompts = filteredPrompts.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedPrompts,
      total,
      totalPages,
      page,
      pageSize,
    });
  } catch {
    // Error fetching prompts - could be logged to monitoring service
    return NextResponse.json(
      { error: "Failed to fetch prompts" },
      { status: 500 }
    );
  }
}

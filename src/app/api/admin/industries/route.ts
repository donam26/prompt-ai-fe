import { NextRequest, NextResponse } from "next/server";

// Mock data for industries - replace with actual API call to your backend
const mockIndustries = [
  {
    id: 5,
    name: "E-commerce",
    description: "test",
    created_at: "2025-09-11T14:43:05.000Z",
    updated_at: "2025-09-13T14:16:43.000Z",
  },
  {
    id: 4,
    name: "Education",
    description: "Education and training industry",
    created_at: "2025-09-11T14:43:05.000Z",
    updated_at: "2025-09-11T14:43:05.000Z",
  },
  {
    id: 3,
    name: "Finance",
    description: "Financial services and banking industry",
    created_at: "2025-09-11T14:43:05.000Z",
    updated_at: "2025-09-11T14:43:05.000Z",
  },
  {
    id: 9,
    name: "Food & Beverage",
    description: "Food and beverage industry",
    created_at: "2025-09-11T14:43:05.000Z",
    updated_at: "2025-09-11T14:43:05.000Z",
  },
  {
    id: 2,
    name: "Healthcare",
    description: "Healthcare and medical services industry",
    created_at: "2025-09-11T14:43:05.000Z",
    updated_at: "2025-09-11T14:43:05.000Z",
  },
  {
    id: 14,
    name: "IT",
    description: null,
    created_at: "2025-09-11T15:17:15.000Z",
    updated_at: "2025-09-11T15:17:15.000Z",
  },
  {
    id: 6,
    name: "Manufacturing",
    description: "Manufacturing and production industry",
    created_at: "2025-09-11T14:43:05.000Z",
    updated_at: "2025-09-11T14:43:05.000Z",
  },
  {
    id: 7,
    name: "Marketing",
    description: "Marketing and advertising industry",
    created_at: "2025-09-11T14:43:05.000Z",
    updated_at: "2025-09-11T14:43:05.000Z",
  },
  {
    id: 8,
    name: "Real Estate",
    description: "Real estate and property industry",
    created_at: "2025-09-11T14:43:05.000Z",
    updated_at: "2025-09-11T14:43:05.000Z",
  },
  {
    id: 1,
    name: "Technology",
    description: "Technology and software development industry",
    created_at: "2025-09-11T14:43:05.000Z",
    updated_at: "2025-09-11T14:43:05.000Z",
  },
];

export async function GET(_request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // TODO: Replace with actual API call to your backend
    // const response = await fetch(`${process.env.BACKEND_API_URL}/admin/industries`);
    // const data = await response.json();

    return NextResponse.json({
      success: true,
      data: mockIndustries,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalCount: mockIndustries.length,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
      message: "Industries fetched successfully",
    });
  } catch (error) {
    // console.error("Error fetching industries:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch industries",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

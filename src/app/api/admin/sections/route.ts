import { NextResponse } from "next/server";

// Mock data for sections
const mockSections = [
  {
    id: 1,
    name: "AI & Machine Learning",
    description:
      "Các section liên quan đến trí tuệ nhân tạo và machine learning",
    status: "active",
    order: 1,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Web Development",
    description: "Các section về phát triển web và frontend/backend",
    status: "active",
    order: 2,
    created_at: "2024-01-02T00:00:00.000Z",
    updated_at: "2024-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Mobile Development",
    description: "Các section về phát triển ứng dụng di động",
    status: "inactive",
    order: 3,
    created_at: "2024-01-03T00:00:00.000Z",
    updated_at: "2024-01-03T00:00:00.000Z",
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";

    // Filter sections based on search and status
    let filteredSections = mockSections;

    if (search) {
      filteredSections = filteredSections.filter(
        section =>
          section.name.toLowerCase().includes(search.toLowerCase()) ||
          section.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "all") {
      filteredSections = filteredSections.filter(
        section => section.status === status
      );
    }

    // Calculate pagination
    const totalItems = filteredSections.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedSections = filteredSections.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        sections: paginatedSections,
        totalItems,
        currentPage: page,
        pageSize,
        totalPages,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi khi lấy danh sách sections",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newSection = {
      id: mockSections.length + 1,
      name: body.name,
      description: body.description,
      status: body.status || "active",
      order: body.order || mockSections.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    mockSections.push(newSection);

    return NextResponse.json({
      success: true,
      data: newSection,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi khi tạo section",
      },
      { status: 500 }
    );
  }
}

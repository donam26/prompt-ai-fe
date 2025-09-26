import { NextResponse } from "next/server";

// Mock data for sections (same as in route.ts)
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sectionId = parseInt(params.id);
    const section = mockSections.find(s => s.id === sectionId);

    if (!section) {
      return NextResponse.json(
        {
          success: false,
          message: "Section không tồn tại",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: section,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi khi lấy thông tin section",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sectionId = parseInt(params.id);
    const body = await request.json();

    const sectionIndex = mockSections.findIndex(s => s.id === sectionId);

    if (sectionIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "Section không tồn tại",
        },
        { status: 404 }
      );
    }

    const updatedSection = {
      ...mockSections[sectionIndex],
      ...body,
      updated_at: new Date().toISOString(),
    };

    mockSections[sectionIndex] = updatedSection;

    return NextResponse.json({
      success: true,
      data: updatedSection,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi khi cập nhật section",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sectionId = parseInt(params.id);
    const sectionIndex = mockSections.findIndex(s => s.id === sectionId);

    if (sectionIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "Section không tồn tại",
        },
        { status: 404 }
      );
    }

    mockSections.splice(sectionIndex, 1);

    return NextResponse.json({
      success: true,
      message: "Xóa section thành công",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi khi xóa section",
      },
      { status: 500 }
    );
  }
}

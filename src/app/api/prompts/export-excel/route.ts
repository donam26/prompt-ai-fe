import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

/**
 * GET /api/prompts/export-excel - Export prompts to Excel file
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const search = searchParams.get("search") || "";
    const categoryIds = searchParams.getAll("categoryIds[]");
    const isType = searchParams.get("isType") || "";
    const industryIds = searchParams.getAll("industryIds[]");
    const dateFrom = searchParams.get("dateFrom") || "";
    const dateTo = searchParams.get("dateTo") || "";

    // Mock data - replace with actual database query
    const mockPrompts = [
      {
        id: 1,
        title: "AI Writing Assistant",
        content: "Help me write a professional email...",
        shortDescription:
          "AI-powered writing assistant for professional emails",
        categoryName: "Writing & Communication",
        industryNames: "Technology, Business",
        isType: "Premium",
        subType: "Advanced",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
        isComingSoon: false,
      },
      {
        id: 2,
        title: "Code Review Helper",
        content: "Review this code for best practices...",
        shortDescription: "Code review assistance for developers",
        categoryName: "Programming & Development",
        industryNames: "Technology",
        isType: "Free",
        subType: "Standard",
        createdAt: "2024-01-02",
        updatedAt: "2024-01-02",
        isComingSoon: false,
      },
      {
        id: 3,
        title: "Marketing Copy Generator",
        content: "Create compelling marketing copy...",
        shortDescription: "Marketing copy generation tool",
        categoryName: "Marketing & Sales",
        industryNames: "Business, Marketing",
        isType: "Premium",
        subType: "Advanced",
        createdAt: "2024-01-03",
        updatedAt: "2024-01-03",
        isComingSoon: true,
      },
    ];

    // Apply filters (same logic as main API)
    let filteredPrompts = mockPrompts;

    if (search) {
      filteredPrompts = filteredPrompts.filter(
        prompt =>
          prompt.title.toLowerCase().includes(search.toLowerCase()) ||
          prompt.content.toLowerCase().includes(search.toLowerCase()) ||
          prompt.short_description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryIds.length > 0) {
      filteredPrompts = filteredPrompts.filter(prompt =>
        categoryIds.includes(prompt.category_name)
      );
    }

    if (isType) {
      filteredPrompts = filteredPrompts.filter(
        prompt => prompt.is_type.toLowerCase() === isType.toLowerCase()
      );
    }

    if (industryIds.length > 0) {
      filteredPrompts = filteredPrompts.filter(prompt =>
        industryIds.some(id =>
          prompt.industryNames.toLowerCase().includes(id.toLowerCase())
        )
      );
    }

    if (dateFrom) {
      filteredPrompts = filteredPrompts.filter(
        prompt => new Date(prompt.createdAt) >= new Date(dateFrom)
      );
    }

    if (dateTo) {
      filteredPrompts = filteredPrompts.filter(
        prompt => new Date(prompt.createdAt) <= new Date(dateTo)
      );
    }

    // Prepare data for Excel export
    const excelData = filteredPrompts.map(prompt => ({
      ID: prompt.id,
      "Tiêu đề": prompt.title,
      "Mô tả ngắn": prompt.shortDescription,
      "Nội dung":
        prompt.content.substring(0, 200) +
        (prompt.content.length > 200 ? "..." : ""),
      "Danh mục": prompt.categoryName,
      "Ngành nghề": prompt.industryNames,
      Loại: prompt.isType,
      "Phân loại": prompt.subType,
      "Trạng thái": prompt.isComingSoon ? "Sắp ra mắt" : "Đang hoạt động",
      "Ngày tạo": prompt.createdAt,
      "Ngày cập nhật": prompt.updatedAt,
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const columnWidths = [
      { wch: 8 }, // ID
      { wch: 30 }, // Tiêu đề
      { wch: 40 }, // Mô tả ngắn
      { wch: 50 }, // Nội dung
      { wch: 20 }, // Danh mục
      { wch: 25 }, // Ngành nghề
      { wch: 12 }, // Loại
      { wch: 12 }, // Phân loại
      { wch: 15 }, // Trạng thái
      { wch: 12 }, // Ngày tạo
      { wch: 12 }, // Ngày cập nhật
    ];
    worksheet["!cols"] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Prompts");

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Create response with Excel file
    const response = new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="prompts-export-${new Date().toISOString().split("T")[0]}.xlsx"`,
        "Content-Length": excelBuffer.length.toString(),
      },
    });

    return response;
  } catch (error) {
    console.error("Export Excel error:", error);
    return NextResponse.json(
      { error: "Failed to export prompts to Excel" },
      { status: 500 }
    );
  }
}

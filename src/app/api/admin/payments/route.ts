import { NextResponse } from "next/server";

// Mock data for payments
const mockPayments = [
  {
    id: 1,
    amount: 100000,
    method: "credit_card",
    status: "completed",
    description: "Payment for premium subscription",
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    amount: 50000,
    method: "bank_transfer",
    status: "pending",
    description: "Payment for basic subscription",
    created_at: "2024-01-02T00:00:00.000Z",
    updated_at: "2024-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    amount: 200000,
    method: "paypal",
    status: "failed",
    description: "Payment for enterprise subscription",
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
    const method = searchParams.get("method") || "all";

    // Filter payments based on search, status, and method
    let filteredPayments = mockPayments;

    if (search) {
      filteredPayments = filteredPayments.filter(
        payment =>
          payment.description.toLowerCase().includes(search.toLowerCase()) ||
          payment.id.toString().includes(search)
      );
    }

    if (status !== "all") {
      filteredPayments = filteredPayments.filter(
        payment => payment.status === status
      );
    }

    if (method !== "all") {
      filteredPayments = filteredPayments.filter(
        payment => payment.method === method
      );
    }

    // Calculate pagination
    const totalItems = filteredPayments.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        payments: paginatedPayments,
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
        message: "Lỗi khi lấy danh sách payments",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newPayment = {
      id: mockPayments.length + 1,
      amount: body.amount,
      method: body.method,
      status: body.status || "pending",
      description: body.description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    mockPayments.push(newPayment);

    return NextResponse.json({
      success: true,
      data: newPayment,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi khi tạo payment",
      },
      { status: 500 }
    );
  }
}

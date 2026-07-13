import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    return NextResponse.json({
      success: true,
      message: "TODO: implement article query",
      route: "/api/get_articles",
      query: Object.fromEntries(searchParams.entries()),
    });
  } catch (error) {
    console.error("Error in GET /api/get_articles:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

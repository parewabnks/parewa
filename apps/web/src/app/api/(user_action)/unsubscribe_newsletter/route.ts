import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    return NextResponse.json({
      success: true,
      message: "TODO: implement newsletter unsubscription handler",
      route: "/api/unsubscribe_newsletter",
      received: body,
    });
  } catch (error) {
    console.error("Error in POST /api/unsubscribe_newsletter:", error);
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

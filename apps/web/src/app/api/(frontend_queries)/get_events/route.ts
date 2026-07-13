import { defineQuery } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";
import { datestring } from "@/schemas/backend_schemas/dateStringSchema";
import { z } from "zod";
import { convertToUTC } from "@/helpers/date_conversion";
import { client } from "@/sanity/client";

const GET_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && date >= "2026-07-13" && date < "2026-07-14"]{
    date,
    location,
    "slug": slug.current,
    title
  }
`)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Let's just by default convert the date to NPT
    // Date String "yyyy-mm-dd" is expected
    // We return the list of events happing at that date

    // The Data in Sanity's Content Lake is always stoed in UTC
    // So, wee need to convert the date on the frontend side to UTC then request, and convert back to local time

    const date = searchParams.get("date");

    const schemaVerification = datestring.safeParse(date);

    if (!schemaVerification.success){
      return NextResponse.json({
        success: false,
        message: "Invalid date format. Expected format: yyyy-mm-dd",
        errors: z.treeifyError(schemaVerification.error),
      });
    }

    const utcDate = convertToUTC(schemaVerification.data);

    const endDate = new Date(utcDate);

    endDate.setDate(endDate.getDate() + 1);

    const endDateString = endDate.toISOString();

    const events = await client.fetch(GET_EVENTS_QUERY,
      {
        startDate: utcDate,
        endDate: endDateString,
      }
    )
    
    return NextResponse.json({
      success: true,
      message: "Events fetched successfully",
      events,
      route: "/api/get_events",
      query: Object.fromEntries(searchParams.entries()),
    });
  } catch (error) {
    console.error("Error in GET /api/get_events:", error);
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

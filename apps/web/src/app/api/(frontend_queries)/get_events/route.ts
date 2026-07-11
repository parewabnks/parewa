import { client } from '@/sanity/client'
import { NextRequest, NextResponse } from "next/server";

import { getDayRangeUTC } from '@/helpers/timezone';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");
        const timezone = searchParams.get("timezone") || "UTC";
        const locale = searchParams.get("locale") || "en-US";

        if (!date) {
            return NextResponse.json({ success: false, message: "Date is required" }, { status: 400 });
        }

        let start: Date, end: Date;

        try {
            ({ start, end } = getDayRangeUTC(date, timezone));
        } catch {
            return NextResponse.json({ success: false, message: "Invalid timezone" }, { status: 400 });
        }

        const query = `*[_type == "event" && datetime >= $start && datetime < $end]{ title, datetime }`;

        const events = await client.fetch(query, {
            start: start.toISOString(),
            end: end.toISOString(),
        });

        return NextResponse.json({ success: true, events, locale, timezone }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching events from Sanity:", error);
        return NextResponse.json({ success: false, message: "Error fetching events from the server" }, { status: 400 });
    }
}
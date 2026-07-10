import { client } from '@/sanity/client'
import { NextRequest, NextResponse } from "next/server";

function getTimezoneOffsetMs(timeZone: string, date: Date): number {
    const dtf = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    const parts = dtf.formatToParts(date).reduce((acc, p) => {
        if (p.type !== "literal") acc[p.type] = p.value;
        return acc;
    }, {} as Record<string, string>);

    const asUTC = Date.UTC(
        Number(parts.year),
        Number(parts.month) - 1,
        Number(parts.day),
        Number(parts.hour),
        Number(parts.minute),
        Number(parts.second)
    );

    return asUTC - date.getTime();
}

function getDayRangeUTC(date: string, timeZone: string) {
    const [y, m, d] = date.split("-").map(Number);
    const guess = new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
    const offset = getTimezoneOffsetMs(timeZone, guess);
    const start = new Date(guess.getTime() - offset);
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

    return { start, end };
}

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
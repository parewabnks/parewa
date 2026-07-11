export function getTimezoneOffsetMs(timeZone: string, date: Date): number {
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

export function getDayRangeUTC(date: string, timeZone: string) {
    const [y, m, d] = date.split("-").map(Number);
    const guess = new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
    const offset = getTimezoneOffsetMs(timeZone, guess);
    const start = new Date(guess.getTime() - offset);
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

    return { start, end };
}
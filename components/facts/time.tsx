"use client";

import { compareTimezones, hours24ToHours12 } from "@/utils/time";
import { useEffect, useState } from "react";

export function LocalTime({ timezone }: { timezone: string; }) {
    const [diff, setDiff] = useState<string>();

    const date = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));

    const { hours, time } = hours24ToHours12(date.getHours());
    const clocktime = `${hours}:${date.getMinutes().toString().padStart(2, "0")} ${time}`;

    useEffect(() => {
        const timezoneDifference = compareTimezones(timezone, Intl.DateTimeFormat().resolvedOptions().timeZone);
        setDiff(timezoneDifference);
    }, []);

    return `${clocktime} - ${diff || "same as you"}`;
}

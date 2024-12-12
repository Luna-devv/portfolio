"use client";

import { compareTimezones, hours24ToHours12 } from "@/utils/time";
import { useEffect, useRef, useState } from "react";

export function LocalTime({ timezone }: { timezone: string; }) {
    const [clock, setClock] = useState<string>();
    const [diff, setDiff] = useState<string>();

    const ref = useRef<NodeJS.Timeout | null>(null);

    function updateTime() {
        const date = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
        const { hours, time } = hours24ToHours12(date.getHours());

        const str = `${hours}:${date.getMinutes().toString().padStart(2, "0")} ${time}`;

        if (str === clock) return str;
        setClock(str);

        return str;
    }

    useEffect(() => {
        const timezoneDifference = compareTimezones(timezone, Intl.DateTimeFormat().resolvedOptions().timeZone);
        setDiff(timezoneDifference);

        if (ref.current) return;

        ref.current = setInterval(() => {
            updateTime();
        }, 10_000);

        return (() => {
            if (ref.current) clearInterval(ref.current);
            ref.current = null;
        });
    }, []);

    return `${clock || updateTime()} - ${diff || "same as you"}`;
}
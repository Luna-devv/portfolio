export function hours24ToHours12(hours: number) {
    if (hours > 12) {
        return {
            hours: hours - 12,
            time: "PM"
        };
    }

    return {
        hours,
        time: "AM"
    };
}

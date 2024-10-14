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

export function compareTimezones(tz1: string, tz2: string) {
    const date = new Date();

    const options: Intl.DateTimeFormatOptions = {
        timeZone: tz1,
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    };

    const timeZone1Time = new Intl.DateTimeFormat("en-US", options).format(date);
    options.timeZone = tz2;
    const timeZone2Time = new Intl.DateTimeFormat("en-US", options).format(date);

    const [hours1, minutes1, seconds1] = timeZone1Time.split(":").map(Number);
    const [hours2, minutes2, seconds2] = timeZone2Time.split(":").map(Number);

    const totalSeconds1 = hours1 * 3_600 + minutes1 * 60 + seconds1;
    const totalSeconds2 = hours2 * 3_600 + minutes2 * 60 + seconds2;

    const diffSeconds = totalSeconds2 - totalSeconds1;
    const diffHours = Math.floor(Math.abs(diffSeconds) / 3_600);
    const diffMinutes = Math.floor((Math.abs(diffSeconds) % 3_600) / 60);

    if (diffSeconds > 0) {
        return `${diffHours} hours ${diffMinutes ? `and ${diffMinutes} minutes` : ""} ahead`;
    } else if (diffSeconds < 0) {
        return `${diffHours} hours ${diffMinutes ? `and ${diffMinutes} minutes` : ""} behind`;
    }

    return "same as you";
}
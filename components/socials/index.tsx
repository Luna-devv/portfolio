import Link from "next/link";
import type { ReactNode } from "react";

import { platforms } from "./constants";

export function Social({
    platform,
    url
}: {
    platform: string;
    url: string;
}) {
    return (
        <Link
            className="flex items-center gap-2 w-full"
            href={url.includes("@")
                ? `mailto:${url}`
                : url
            }
            target="_blank"
        >
            <span className="text-violet-400">
                {platforms[platform as keyof typeof platforms] as ReactNode}
            </span>

            {platform.replace(/^\w/, (char) => char.toUpperCase())}

            <span className="ml-auto text-base text-violet-400 hover:text-violet-300">
                {formatName(platform, url.split("/").pop()!)}
            </span>
        </Link>
    );
}

function formatName(platform: string, name: string) {
    switch (platform) {
        case "discord": return `.gg/${name}`;
    }

    return name;
}
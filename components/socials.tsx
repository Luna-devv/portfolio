import Link from "next/link";
import { BsDiscord } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { SiKofi } from "react-icons/si";

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
            href={url}
            target="_blank"
        >
            <span className="text-violet-400">
                <PlatformIcon platform={platform} />
            </span>

            {platform.replace(/^\w/, (char) => char.toUpperCase())}

            <span className="ml-auto text-base text-violet-400 hover:text-violet-300">
                {formatName(platform, url.split("/").pop()!)}
            </span>
        </Link>
    );
}

function PlatformIcon({ platform }: { platform: string; }) {
    switch (platform) {
        case "discord": return <BsDiscord />;
        case "github": return <FaGithub />;
        case "ko-fi": return <SiKofi />;
    }

    return <></>;
}

function formatName(platform: string, name: string) {
    switch (platform) {
        case "discord": return `.gg/${name}`;
    }

    return name;
}
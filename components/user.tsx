import type { Database } from "@/lib/database/schema";
import { cn } from "@/utils/cn";
import { lilita } from "@/utils/fonts";
import Image from "next/image";
import { HiChevronRight } from "react-icons/hi";

import { Fact } from "./facts";
import { Social } from "./socials";
import { Separator } from "./ui/separator";

export function User({
    config,
    facts,
    socials
}: {
    config: Database["config"];
    facts: Database["config_facts"][];
    socials: Database["config_socials"][];
}) {

    return (
        <div className="flex flex-col gap-2 md:max-w-96 w-full shrink-0">
            <Image
                alt={config.username}
                className="rounded-full avatar-animation duration-500 ease-in-out transform-gpu shadow-black aspect-square"
                height={512}
                src={config.avatar_url
                    ? config.avatar_url
                    : "https://cdn.discordapp.com/embed/avatars/5.png"
                }
                width={512}
            />

            <div className={cn(lilita.className, "flex items-end gap-3 mt-4")}>
                <span className="text-5xl">
                    {config.nickname}
                </span>
                <HiChevronRight className="mb-1.5 size-5" />
                <span className="text-3xl opacity-80">
                    {config.username}
                </span>
                <span className="text-3xl opacity-80 text-violet-200">
                    /{config.name_pronunciation}/
                </span>
            </div>

            <div className="text-xl">
                {config.bio}
            </div>

            <div className="flex flex-col gap-1 mt-4 text-lg">
                {facts
                    .sort((a, b) => a.id - b.id)
                    .map((fact) => (
                        <Fact
                            key={fact.name}
                            name={fact.name}
                            value={fact.value}
                        />
                    ))}
            </div>

            <Separator className="w-full bg-neutral-600/50 mt-2" />

            <div className="flex flex-col gap-1 mt-2 text-lg">
                {socials
                    .sort((a, b) => a.id - b.id)
                    .map((social) => (
                        <Social
                            key={social.platform}
                            platform={social.platform}
                            url={social.url}
                        />
                    ))}
            </div>
        </div>
    );
}
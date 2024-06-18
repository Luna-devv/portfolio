import type { Database } from "@/lib/database/schema";
import { cn } from "@/utils/cn";
import { lilita } from "@/utils/fonts";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import { HiChevronRight } from "react-icons/hi";

import { Fact } from "./facts";
import { Social } from "./socials";

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
        <div className="flex flex-col gap-2 max-w-96 w-full shrink-0">
            <Image
                alt={config.username}
                className="rounded-2xl avatar-animation duration-500 ease-in-out transform-gpu shadow-black"
                height={384}
                src={config.avatar_url
                    ? config.avatar_url + "?size=512"
                    : "https://cdn.discordapp.net/embed/avatars/3.png"
                }
                width={384}
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

            <Divider className="w-full bg-neutral-600/50 mt-2" />

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

import { cn } from "@/utils/cn";
import { config } from "@/utils/config";
import { lilita } from "@/utils/fonts";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import { HiChevronRight } from "react-icons/hi";

import { Fact } from "./facts";
import { Social } from "./socials";

export const revalidate = 1; // once per minute

export function User({
    avatar_url,
    bio,
    nickname,
    username
}: {
    avatar_url: string | null;
    bio: string;
    nickname: string | null;
    username: string;
}) {
    const conf = config();

    return (
        <div className="flex flex-col gap-2 max-w-96 w-full shrink-0">
            <Image
                alt={username}
                className="rounded-2xl avatar-animation duration-500 ease-in-out transform-gpu shadow-black"
                height={384}
                src={avatar_url
                    ? avatar_url + "?size=512"
                    : "https://cdn.discordapp.net/embed/avatars/3.png"
                }
                width={384}
            />

            <div className={cn(lilita.className, "flex items-end gap-3 mt-4")}>
                <span className="text-5xl">
                    {nickname}
                </span>
                <HiChevronRight className="mb-1.5 size-5" />
                <span className="text-3xl opacity-80">
                    {username}
                </span>
                <span className="text-3xl opacity-80 text-violet-200">
                    /{conf.name_pronunciation}/
                </span>
            </div>

            <div className="text-xl">
                {bio}
            </div>

            <div className="flex flex-col gap-1 mt-4 text-lg">
                {Object.entries(conf.facts).map(([name, variable]) => (
                    <Fact
                        key={name}
                        name={name}
                        variable={variable}
                    />
                ))}
            </div>

            <Divider className="w-full bg-neutral-600/50 mt-2" />

            <div className="flex flex-col gap-1 mt-2 text-lg">
                {Object.entries(conf.socials).map(([name, url]) => (
                    <Social
                        key={name}
                        platform={name}
                        url={url}
                    />
                ))}
            </div>
        </div>
    );
}

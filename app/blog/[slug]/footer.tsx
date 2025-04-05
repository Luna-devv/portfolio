import { Social } from "@/components/socials";
import { getConfig, getSocials } from "@/lib/database/config";
import { getUser } from "@/lib/database/users";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import type { HTMLProps } from "react";

const getData = unstable_cache(
    (userId: number) => Promise.all([
        getUser(userId),
        getConfig(),
        getSocials()
    ]),
    ["blog", "footer"],
    {
        tags: ["blog", "footer"],
        revalidate: false
    }
);

export async function BlogFooter({ userId }: { userId: number; }) {
    const [user, config, socials] = await getData(userId);

    if (!user) return <></>;

    return (
        <div className="relative bg-wamellow border border-wamellow-light text-neutral-200 rounded-md px-4 py-3 mt-8 w-full">
            <span className="text-sm text-neutral-500 font-medium relative bottom-1">Author of the Article</span>

            <div className="flex">
                <AuthorWrapper
                    isOwner={user.is_owner}
                    className="flex gap-3 mt-1 items-center w-fit"
                >
                    <Image
                        alt="avatar"
                        className="rounded-full size-14"
                        src={`https://cdn.discordapp.com/avatars/${user.discord_id}/${user.avatar}.webp`}
                        width={80}
                        height={80}
                    />
                    <div className="truncate">
                        <span className="text-lg font-semibold">{user.nickname || user.username}</span>
                        <p>{config?.bio}</p>
                    </div>
                </AuthorWrapper>

                <div className="flex gap-2 absolute top-3 right-4">
                    {socials
                        .sort((a, b) => a.id - b.id)
                        .map((social) => (
                            <Social
                                key={social.platform}
                                iconOnly
                                platform={social.platform}
                                url={social.url}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

function AuthorWrapper({
    children,
    isOwner,
    ...props
}: {
    children: React.ReactNode;
    isOwner: boolean;
} & HTMLProps<HTMLDivElement>) {
    if (isOwner) {
        return (
            <Link href="/" {...props as HTMLProps<HTMLAnchorElement>}>
                {children}
            </Link>
        );
    }

    return (
        <div {...props}>
            {children}
        </div>
    );
}
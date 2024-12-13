import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { getUser } from "@/lib/database/users";
import Image from "next/image";
import { HiCake } from "react-icons/hi";

const intlDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
});

export async function User({ id }: { id: number; }) {
    const user = await getUser(id);

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button
                    className="px-0.5 text-neutral-300"
                    variant="link"
                    disabled={!user}
                >
                    @{user?.username || "unknown-user"}
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 flex gap-4">
                <Image
                    alt="avatar"
                    className="rounded-full size-12"
                    src={`https://cdn.discordapp.com/avatars/${user?.discord_id}/${user?.avatar}.webp`}
                    width={80}
                    height={80}
                />
                <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                        <span className="text-sm font-semibold">{user?.nickname || user?.username}</span>
                        <div className="flex items-center">
                            <HiCake className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                                Joined {intlDate.format(user?.created_at)}
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
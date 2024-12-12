import { getUserFromCookies } from "@/utils/auth";
import { getAvatar } from "@/utils/fn";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";

export async function UserLogin() {
    const jar = await cookies();

    if (jar.has("session")) return <User />;
    return <Login />;
}

async function User() {
    const jar = await cookies();
    const user = await getUserFromCookies(jar);

    return (
        <div className="flex flex-col">
            <span className="uppercase text-xs font-semibold opacity-75 mb-1">
                logged in as
            </span>

            <Button
                asChild
                className="text-neutral-100 text-medium"
                variant="secondary"
            >
                <Link href="/profile">
                    <Image
                        alt="your profile picture"
                        className="size-6 rounded-full"
                        height={32}
                        src={getAvatar(user?.discord_id!, user?.avatar)}
                        width={32}
                    />
                    {user?.username}
                </Link>
            </Button>
        </div>
    );
}

function Login() {
    return (
        <Button
            asChild
            variant="secondary"
        >
            <Link href="/api/login">
                Login
            </Link>
        </Button>
    );
}
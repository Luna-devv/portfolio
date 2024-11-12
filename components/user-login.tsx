import { getUser } from "@/lib/database/users";
import { getAvatar } from "@/utils/fn";
import { verifySession } from "@/utils/jwt";
import { Button } from "@nextui-org/react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";

export async function UserLogin() {
    const jar = await cookies();

    if (jar.has("session")) return <User token={jar.get("session")?.value!} />;
    return <Login />;
}

async function User({ token }: { token: string; }) {
    const session = await verifySession(token);
    const user = await getUser(session.id);

    return (
        <div className="flex flex-col">
            <span className="uppercase text-xs font-semibold opacity-75 mb-1">
                logged in as
            </span>

            <Button
                as={Link}
                className="text-neutral-100 text-medium"
                href="/profile"
            >
                <Image
                    alt="your profile picture"
                    className="size-6 rounded-full"
                    height={32}
                    src={getAvatar(user?.discord_id!, user?.avatar)}
                    width={32}
                />
                {user?.username}
            </Button>
        </div>
    );
}

function Login() {
    return (
        <Button
            as={Link}
            href="/api/login"
        >
            Login
        </Button>
    );
}
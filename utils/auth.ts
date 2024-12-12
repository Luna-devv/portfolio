import { getUser } from "@/lib/database/users";
import { unstable_cache } from "next/cache";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { verifySession } from "./jwt";

export function getUserFromCookies(jar: ReadonlyRequestCookies) {
    const token = jar.get("session")?.value;
    if (!token) return null;

    return unstable_cache(
        async () => {
            const session = await verifySession(token);
            if (!session) return null;

            return getUser(session.id);
        },
        [token],
        {
            tags: ["users" + token],
            revalidate: false
        }
    )();
}

export async function isOwner(jar: ReadonlyRequestCookies) {
    const user = await getUserFromCookies(jar);
    return user?.is_owner || false;
}
import { db } from "@/lib/database";

export const revalidate = 3_600;

export async function GET() {
    const config = await db
        .selectFrom("config")
        .select("avatar_url")
        .executeTakeFirst();

    if (!config) throw Error("Failed to fetch config");

    return await fetch(config.avatar_url);
}
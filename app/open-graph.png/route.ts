import { getConfig } from "@/lib/database/get";

export const revalidate = 3_600 * 24; // 24 hours

export async function GET() {
    const config = await getConfig("en");

    if (!config) throw Error("Failed to fetch config");

    return await fetch(config.avatar_url);
}

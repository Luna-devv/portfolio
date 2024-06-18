import { getUser } from "@/libs/discord/users";
import { config } from "@/utils/config";

const conf = config();

export const revalidate = 3_600; // 1 hour

export async function GET() {
    const user = await getUser(conf.id);

    if (!user) throw Error("Failed to fetch user");


    return await fetch(user.avatar_url + "?size=512");
}

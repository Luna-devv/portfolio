import { createOrUpdateUser } from "@/lib/database/users";
import { exchangeOauthToken, getOauthUrl, getOauthUser } from "@/lib/discord/oauth";
import { signSession } from "@/utils/jwt";
import { getBaseUrl } from "@/utils/urls";
import { OAuth2Scopes } from "discord-api-types/v10";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const scopes = [OAuth2Scopes.Identify];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const code = searchParams.get("code");
    if (!code) {
        const url = getOauthUrl(scopes);
        redirect(url);
    }

    const grant = await exchangeOauthToken(code);

    if ("message" in grant) {
        return Response.json(grant);
    }

    if (scopes.find((scope) => !grant.scope.includes(scope))) {
        return Response.json({ message: "why would you do that...?" });
    }

    const user = await getOauthUser(grant.access_token);

    if ("message" in user) {
        return Response.json(user);
    }

    const userdb = await createOrUpdateUser({
        discord_id: user.id,
        username: user.username,
        nickname: user.global_name,
        avatar: user.avatar
    });

    if (!userdb) {
        return Response.json({ message: "oh welp postgres is fucked up" });
    }

    const token = signSession({
        id: userdb.id as unknown as number,
        is_owner: userdb.is_owner as unknown as boolean
    });

    const jar = await cookies();

    jar.set(
        "session",
        token,
        {
            secure: getBaseUrl().startsWith("https://"),
            httpOnly: true,
            sameSite: "strict",
            domain: getBaseUrl().split("://")[1]
        }
    );

    redirect("/");
}
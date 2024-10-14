import { config } from "@/utils/config";
import { getBaseUrl } from "@/utils/urls";
import { DefaultRestOptions } from "@discordjs/rest";
import { type OAuth2Scopes, type RESTError, type RESTGetAPIUserResult, type RESTPostOAuth2AccessTokenResult, Routes } from "discord-api-types/v10";

import { rest } from ".";

const conf = config();

export function getOauthUrl(scopes: OAuth2Scopes[]) {
    const params = new URLSearchParams({
        client_id: conf.client_id,
        response_type: "code",
        redirect_uri: getBaseUrl() + "/api/login",
        scope: scopes.join()
    });

    return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

export async function exchangeOauthToken(code: string) {

    const params = new URLSearchParams({
        client_id: conf.client_id,
        client_secret: conf.client_secret,
        grant_type: "authorization_code",
        redirect_uri: getBaseUrl() + "/api/login",
        code
    });

    const res = await rest.post(Routes.oauth2TokenExchange(), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params,
        passThroughBody: true
    });

    return res as RESTPostOAuth2AccessTokenResult | RESTError;
}

export async function getOauthUser(access_token: string) {
    const res = await fetch(DefaultRestOptions.api + Routes.user(), {
        headers: {
            authorization: `Bearer ${access_token}`
        }
    });

    return res.json() as Promise<RESTGetAPIUserResult | RESTError>;
}
import { db } from ".";

export function getConfig(language: string) {
    return db
        .selectFrom("config")
        .selectAll()
        .executeTakeFirst();
}

export function getSocials() {
    return db
        .selectFrom("socials")
        .selectAll()
        .execute();
}

import { db } from ".";

export function getConfig(language: string) {
    return db
        .selectFrom("config")
        .selectAll()
        .executeTakeFirst();
}

export function getFacts() {
    return db
        .selectFrom("config_facts")
        .selectAll()
        .execute();
}

export function getSocials() {
    return db
        .selectFrom("config_socials")
        .selectAll()
        .execute();
}

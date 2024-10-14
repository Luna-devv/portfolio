import type { Insertable } from "kysely";

import { db } from ".";
import type { Database } from "./schema";

export function getUser(id: number | string) {
    let builder = db
        .selectFrom("users")
        .selectAll();

    // determine if the provided id is a internal database or discord user id
    if (typeof id === "number") builder = builder.where("id", "=", id);
    else builder = builder.where("discord_id", "=", id);

    return builder.executeTakeFirst();
}

const DISALLOWED_UPDATE_COLUMNS = [
    "created_at"
] satisfies (keyof Database["users"])[];

export function createOrUpdateUser(user: Insertable<Database["users"]>) {
    const userUpdate = user;

    for (const k of Object.keys(userUpdate) as typeof DISALLOWED_UPDATE_COLUMNS) {
        if (!DISALLOWED_UPDATE_COLUMNS.includes(k)) continue;
        userUpdate[k] = undefined as unknown as never;
    }

    return db
        .insertInto("users")
        .values(user)
        .onConflict((oc) => oc
            .column("discord_id")
            .doUpdateSet(userUpdate)
        )
        .returningAll()
        // eh idk
        .executeTakeFirst() as unknown as Promise<Database["users"]>;
}
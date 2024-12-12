import { db } from ".";

export function getBlog(id: number | string) {
    let builder = db
        .selectFrom("blogs")
        .selectAll();

    // determine if the provided id is an id or slug
    if (typeof id === "number") builder = builder.where("id", "=", id);
    else builder = builder.where("slug", "=", id);

    return builder.executeTakeFirst();
}
import type { ColumnType, Generated, Selectable } from "kysely";
import { z } from "zod";

/* Config */

interface ConfigTable {
    avatar_url: string;
    bio: string;
    name_pronunciation: string;
    nickname: string;
    readme: string;
    username: string;
}

interface ConfigFactTable {
    id: number;
    name: string;
    value: string;
}

interface ConfigSocialTable {
    id: number;
    platform: string;
    url: string;
}

/* Non-Config */

interface UserTable {
    avatar: string | null;
    created_at: ColumnType<Date, string | undefined, never>;
    discord_id: string;
    id: Generated<number>;
    is_owner: ColumnType<boolean, boolean | undefined, boolean | undefined>;
    nickname: string | null;
    username: string;
}

export type PartialUserTable = Pick<Selectable<UserTable>, "id" | "is_owner">;

interface ReviewTable {
    content: string;
    created_at: ColumnType<Date, string | undefined, never>;
    id: Generated<number>;
    is_deleted: boolean;
    /**
     * 0 = Negative review
     * 1 = Positive review
     */
    rating: 0 | 1;
    user_id: Generated<number>;
}

interface BlogTable {
    created_at: ColumnType<Date, string | undefined, never>;
    description: string;
    id: Generated<number>;
    slug: string;
    text: string;
    title: string;
    user_id: number;
}

export const blog = z.object({
    description: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    text: z.string(),
    title: z.string()
});

/* Database herself */

export interface Database {
    blogs: BlogTable;
    config: ConfigTable;
    config_facts: ConfigFactTable;
    config_socials: ConfigSocialTable;
    reviews: ReviewTable;
    users: UserTable;
}
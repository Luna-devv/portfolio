import type { ColumnType } from "kysely";

/* Config */

interface ConfigTable {
    avatar_url: string;
    bio: string;
    birthday: string | null; // this should be like "17 April 2002"
    name_pronunciation: string;
    nickname: string;
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
    id: string;
    is_owner: boolean;
    nickname: string | null;
    username: string;
}

interface ReviewTable {
    content: string;
    created_at: ColumnType<Date, string | undefined, never>;
    id: string;
    is_deleted: boolean;
    rating: 0 | 1;
    user_id: string;
}

/* Database herself */

export interface Database {
    config: ConfigTable;
    config_facts: ConfigFactTable;
    config_socials: ConfigSocialTable;
    reviews: ReviewTable;
    users: UserTable;
}

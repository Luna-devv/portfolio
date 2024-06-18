import type { ColumnType } from "kysely";

interface ConfigTable {
    avatar_url: string;
    bio: string;
    birthday: string | null; // this should be like "17 April 2002"
    name_pronunciation: string;
    nickname: string;
    pronouns: string;
    timezone: string;
    username: string;
}

interface SocialTable {
    platform: string;
    url: string;
}

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

export interface Database {
    config: ConfigTable;
    reviews: ReviewTable;
    socials: SocialTable;
    users: UserTable;
}

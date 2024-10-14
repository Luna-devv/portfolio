import { config } from "@/utils/config";
import { createKysely } from "@vercel/postgres-kysely";

import type { Database } from "./schema";

const conf = config();

export const db = createKysely<Database>({
    connectionString: conf.postgres_url
});
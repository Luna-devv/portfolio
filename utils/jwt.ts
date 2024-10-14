import type { PartialUserTable } from "@/lib/database/schema";
import jwt from "jsonwebtoken";
import { createHash } from "node:crypto";

import { config } from "./config";

const conf = config();
const secret = createHash("sha256").update(conf.client_secret + conf.token).digest("hex");

export function signSession(data: PartialUserTable) {
    return jwt.sign(data, secret);
}

export async function verifySession(token: string): Promise<PartialUserTable> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded)=> {
            if (err) reject(err);
            resolve(decoded as PartialUserTable);
        });
    });
}
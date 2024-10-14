import { config } from "@/utils/config";
import { REST } from "@discordjs/rest";

const conf = config();

export const rest = new REST({ version: "10" }).setToken(conf.token);
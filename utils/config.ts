import configdata from "@/public/config.json";

export function config() {
    const conf: Record<string, unknown> = {};

    for (const [k, v] of Object.entries(configdata)) {

        if (typeof v === "string" && v.startsWith("env:")) {
            const val = process.env[v.split(":")[1]];

            if (val) conf[k] = val;
            continue;
        }

        conf[k] = v;
    }

    return conf as typeof configdata;
}

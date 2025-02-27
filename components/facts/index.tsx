import { HiClock, HiHeart } from "react-icons/hi";
import { SiPronounsdotpage } from "react-icons/si";

import { Badge } from "../ui/badge";
import { LocalTime } from "./time";

export function Fact({
    name,
    value
}: {
    name: string;
    value: string;
}) {

    function Children() {
        const { type, data } = parseValue(value);

        switch (type) {
            case "time":
                return <LocalTime timezone={data!} />;
        }

        return type;
    }

    return (
        <div className="flex items-center gap-2 w-full">
            <span className="text-violet-400">
                <FactIcon name={name} value={value} />
            </span>

            {name}

            <Badge
                color="secondary"
                className="ml-auto text-sm h-6 border-neutral-700 border-[1px] font-medium gap-1.5"
                variant="outline"
                radius="rounded"
            >
                <div className="size-2 bg-violet-400 rounded-full" />
                <Children />
            </Badge>
        </div>
    );
}

function FactIcon({
    name,
    value
}: {
    name: string;
    value: string;
}) {
    const { type } = parseValue(value);

    switch (type) {
        case "time": return <HiClock />;
    }

    switch (name.toLowerCase()) {
        case "pronouns": return <SiPronounsdotpage />;
        case "sexuality": return <HiHeart />;
    }

    return <></>;
}

function parseValue(input: string) {
    const regex = /^(\w+)\((.*?)\)$/;

    const match = input.match(regex);
    if (!match) {
        return {
            type: input,
            value: input
        };
    }

    return {
        type: match[1],
        data: match[2]
    };
}
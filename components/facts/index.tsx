import { Chip } from "@nextui-org/react";
import { HiClock } from "react-icons/hi";
import { SiPronounsdotpage } from "react-icons/si";

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

            <Chip
                color="secondary"
                className="ml-auto text-sm h-6 border-neutral-700 border-[px]"
                radius="full"
                variant="dot"
            >
                <span className="font-medium">
                    <Children />
                </span>
            </Chip>
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
        case "time":
            return <HiClock />;
    }

    switch (name.toLowerCase()) {
        case "pronouns":
            return <SiPronounsdotpage />;
    }

    return <></>;
}

function parseValue(input: string) {
    const regex = /^(\w+)\((.*?)\)$/;

    const match = input.match(regex);
    if (!match) return { type: input, value: input };

    const type = match[1];
    const data = match[2];
    return { type, data };
}

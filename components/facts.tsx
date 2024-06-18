import { hours24ToHours12 } from "@/utils/time";
import { Chip } from "@nextui-org/react";
import { HiClock } from "react-icons/hi";

export function Fact({
    name,
    variable
}: {
    name: string;
    variable: string;
}) {
    return (
        <div className="flex items-center gap-2 w-full">
            <span className="text-violet-400">
                <FactIcon variable={variable} />
            </span>

            {name}

            <Chip
                color="secondary"
                className="ml-auto text-base font-semibold"
                radius="sm"
                variant="flat"
            >
                <Children variable={variable} />
            </Chip>
        </div>
    );
}

function FactIcon({ variable }: { variable: string; }) {
    const type = varToType(variable);

    switch (type) {
        case "time":
            return <HiClock />;
    }

    return <></>;
}

export function Children({ variable }: { variable: string; }) {
    const type = varToType(variable);

    switch (type) {
        case "time": {
            const date = new Date();
            const { hours, time } = hours24ToHours12(date.getHours());

            return `${hours}:${date.getMinutes().toString().padStart(2, "0")} ${time} (UTC +${toggleSign(date.getTimezoneOffset() / 60)})`;
        }
    }

    return type;
}

function varToType(variable: string) {
    return variable.toLowerCase().split(":")[1] || variable;
}

function toggleSign(value) {
    return -value;
}

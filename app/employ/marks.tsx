import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";


type Mark = 1 | 2 | 3 | 4 | 5;

interface Props {
    marks: [string, Mark][];
}

export function Marks({ marks }: Props) {
    const [marks1, marks2] = splitArray(marks);

    return (
        <div className="md:flex gap-8">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Mandatory Subject</TableHead>
                        <TableHead className="text-right">Assessment</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {marks1.map(([subject, assesment]) =>
                        <TableRow key={subject}>
                            <TableCell className="font-medium">{subject}</TableCell>
                            <TableCell className="text-right">{assesment}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Mandatory Subject</TableHead>
                        <TableHead className="text-right">Assessment</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {marks2.map(([subject, assesment]) =>
                        <TableRow key={subject}>
                            <TableCell className="font-medium">{subject}</TableCell>
                            <TableCell className="text-right">{assesment}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

function splitArray<T>(arr: T[]): [T[], T[]] {
    const mid = Math.ceil(arr.length / 2);
    return [arr.slice(0, mid), arr.slice(mid)];
}
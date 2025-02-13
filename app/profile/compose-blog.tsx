"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    InputBase,
    InputBaseAdornment,
    InputBaseControl,
    InputBaseInput
} from "@/components/ui/input-base";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ApiError {
    message: string;
}

interface ApiResponse {
    idk: unknown;
}

export const schema = z.object({
    description: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    text: z.string(),
    title: z.string()
});

export function ComposeBlogPost({
    ...props
}: React.HTMLAttributes<HTMLFormElement>) {
    const [error, setError] = useState("");

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    });

    async function create(values: z.infer<typeof schema>) {
        const res = await fetch("/api/blogs", {
            method: "POST",
            body: JSON.stringify(values)
        })
            .then((res) => res.json())
            .catch(() => null) as ApiError | ApiResponse;

        if (!res || "message" in res) {
            setError(res.message || "Failed to fetch");
            return;
        }

        redirect("/blog/" + values.slug);
    }

    return (
        <Form {...form}>
            <h2 className="mb-2 font-medium text-xl">Create blog post</h2>

            <form
                onSubmit={form.handleSubmit(create)}
                {...props}
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <InputBase {...field} >
                                    <InputBaseAdornment>/blog/</InputBaseAdornment>
                                    <InputBaseControl>
                                        <InputBaseInput />
                                    </InputBaseControl>
                                </InputBase>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button
                    className="not-sm:w-full"
                    type="submit"
                >
                    Submit
                </Button>

                {error && (
                    <p className="text-red-400 mt-2">
                        {error}
                    </p>
                )}
            </form>
        </Form>
    );
}
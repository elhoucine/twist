"use client"
import { useState, useTransition } from "react"
import Image from "next/image"
import { BsSave } from 'react-icons/bs';
import { useForm } from "react-hook-form"
import { RocketIcon, StarIcon } from "lucide-react"
import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import MarkdownPreview from "@/components/markdown/MarkdownPreview"
import { BlogFormSchema, BlogFormSchematype } from "../schema"
import { BlogDetail } from "@/lib/types";

export default function BlogForm({
    blog,
    onSubmit
}: {
    blog?: BlogDetail
    onSubmit: (data: BlogFormSchematype) => void;
}) {
    const [isPending, startTransition] = useTransition();
    const [isPreview, setIsPreview] = useState(false);

    const form = useForm<BlogFormSchematype>({
        mode: "onTouched",
        resolver: zodResolver(BlogFormSchema),
        defaultValues: {
            title: blog?.title || "",
            content: blog?.blog_content?.content || "",
            image_url: blog?.image_url || "",
            is_premium: blog?.is_premium || false,
            is_published: blog?.is_published || false,
        },
    })

    function handleOnSubmit(data: BlogFormSchematype) {
        startTransition(() => {
            onSubmit(data);
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleOnSubmit)}
                className="w-full border rounded-md space-y-6 pb-10"
            >
                <div className="p-5 flex items-center flex-wrap justify-between border-b gap-5">
                    <div className="flex gap-5 items-center flex-wrap">
                        <span
                            role="button"
                            tabIndex={0}
                            className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md 
                                        hover:ring-2 hover:ring-zinc-400 transition-all"
                            onClick={() => setIsPreview(!isPreview && !form.getFieldState("image_url").invalid)}
                        >
                            {isPreview
                                ? (
                                    <>
                                        <Pencil1Icon />
                                        Edit
                                    </>
                                )
                                : (
                                    <>
                                        <EyeOpenIcon />
                                        Preview
                                    </>
                                )}
                        </span>

                        <FormField
                            control={form.control}
                            name="is_premium"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md">
                                            <StarIcon />
                                            <span>Premium</span>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="is_published"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md">
                                            <RocketIcon />
                                            <span>Publish</span>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                    </div>

                    <Button
                        type="submit"
                        className="flex items-center gap-1"
                        disabled={!form.formState.isValid || isPending}>
                        <BsSave className={cn("flex items-center gap-1", {
                            "animate-spin": isPending
                        })} /> Save
                    </Button>

                </div>

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className={cn("p-2 w-full flex break-words gap-2",
                                    isPreview ? "divide-x-0" : "divide-x",)}>
                                    <Input
                                        {...form.register('title')}
                                        placeholder="Title"
                                        className={cn("border-none text-lg font-medium leading-relaxed",
                                            isPreview ? "w-0 p-0" : "w-full lg:w-1/2")}
                                    />
                                    <div className={cn(
                                        "lg:px-10",
                                        isPreview ? "mx-auto w-full lg:w-4/5" : "w-1/2 lg:block hidden")}>
                                        <h1 className="text-3xl font-medium">
                                            {form.getValues().title}
                                        </h1>
                                    </div>
                                </div>
                            </FormControl>

                            {form.getFieldState('title').invalid &&
                                form.getValues().title && <FormMessage />}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className={cn("p-2 w-full flex break-words gap-2",
                                    isPreview ? "divide-x-0" : "divide-x",)}>
                                    <Input
                                        {...form.register('image_url')}
                                        placeholder="Image URL"
                                        className={cn("border-none text-lg font-medium leading-relaxed",
                                            isPreview ? "w-0 p-0" : "w-full lg:w-1/2")}
                                    />
                                    <div className={cn(
                                        "lg:px-10",
                                        isPreview ? "mx-auto w-full lg:w-4/5" : "w-1/2 lg:block hidden")}>
                                        {!isPreview ? <>
                                            <p>Click on preview to see image.</p>
                                        </> : <div className="relative h-80 mt-5 border rounded-md">
                                            <Image
                                                src={form.getValues().image_url}
                                                alt="preview"
                                                className="w-2 object-cover object-center rounded-md"
                                                fill
                                            />
                                        </div>
                                        }
                                    </div>
                                </div>
                            </FormControl>

                            {form.getFieldState('image_url').invalid &&
                                form.getValues().image_url && <div className="p-2 ">
                                    <FormMessage />
                                </div>
                            }
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className={cn("p-2 w-full flex break-words gap-2",
                                    isPreview ? "divide-x-0" : "divide-x h-70vh",)}>
                                    <Textarea
                                        {...form.register('content')}
                                        placeholder="content"
                                        className={cn("border-none text-lg font-medium leading-relaxed resize-none h-full",
                                            isPreview ? "w-0 p-0" : "w-full lg:w-1/2")}
                                    />
                                    <div className={cn(
                                        "overflow-y-auto",
                                        isPreview ? "mx-auto w-full lg:w-4/5" : "w-1/2 lg:block hidden")}>
                                        <MarkdownPreview content={form.getValues().content} />
                                    </div>
                                </div>
                            </FormControl>

                            {form.getFieldState('content').invalid &&
                                form.getValues().content && <FormMessage />}
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

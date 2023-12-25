"use client";
import React, { FormEvent, useTransition } from 'react'
import { deleteBlogById } from '@/lib/ations/blog';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TrashIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button'

export default function DeleteAlert({ blogId }: { blogId: string }) {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        startTransition(async () => {
            const result = await deleteBlogById(blogId);
            const { error } = JSON.parse(result);

            if (error?.message) {
                toast({
                    title: "Failed to delete post.",
                    description: (
                        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                            <code className="text-white">{error.message}</code>
                        </pre>
                    ),
                })
            } else {
                toast({
                    title: "Successfully deleted",
                });
            }

        })
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant='outline'
                    className='flex items-center gap-2'
                >
                    <TrashIcon />
                    Delete
                </Button >
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm deletion.</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this
                        post and remove it from the servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form onSubmit={handleSubmit}>
                        <Button
                            className='flex items-center gap-2'
                            disabled={isPending}
                        >
                            <AiOutlineLoading3Quarters
                                className={cn("animate-spin", {
                                    hidden: !isPending
                                })}
                            />
                            Continue
                        </Button>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

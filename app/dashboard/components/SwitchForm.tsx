"use client"
import React, { FormEvent } from 'react'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast';

export default function SwitchForm(
    { checked, onToggle, name }: { checked: boolean, onToggle: () => Promise<string>, name: string }
) {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { error } = JSON.parse(await onToggle());
        if (error?.message) {
            toast({
                title: "Failed to update " + name,
                description: (
                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                        <code className="text-white">{error?.message}</code>
                    </pre>
                ),
            })
        } else {
            toast({
                title: "Successfully updated " + name,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Switch checked={checked} type='submit' />
        </form>
    )
}

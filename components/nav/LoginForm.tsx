"use client";

import React from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Button } from '@/components/ui/button'
import { SiGithub } from "react-icons/si";
import { usePathname } from '@/node_modules/next/navigation';

export default function LoginForm() {
    const pathName = usePathname();

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleLogin = () => {
        supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: location.origin + "/auth/callback",
                next: '' + pathName
            }
        })
    }

    return (
        <Button
            variant="outline"
            className=' flex items-center gap-2'
            onClick={handleLogin}>
            <SiGithub />
            Login
        </Button>
    )
}

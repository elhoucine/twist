"use client";

import React from 'react'
import { usePathname } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr'
import { Button } from '@/components/ui/button'
import { SiGithub } from "react-icons/si";

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

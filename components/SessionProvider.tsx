"use client";
import React, { useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useUser } from '@/lib/store/user';
import { Database } from '@/lib/types/supabase';

export default function SessionProvider() {
    const setUser = useUser((state) => state.setUser);

    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const readUserSession = async () => {
        const { data: res } = await supabase.auth.getSession();
        const { data: userInfo } = await supabase
            .from('users')
            .select('*')
            .eq('id', res.session?.user?.id!)
            .single();
        setUser(userInfo);
    };

    useEffect(() => {
        readUserSession();
        // eslint-disable-next-line
    }, []);

    return (<div></div>)
}

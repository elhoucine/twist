import React from 'react'
import { DashboardIcon, LockOpen1Icon } from '@radix-ui/react-icons'
import { createBrowserClient } from '@supabase/ssr'
import { useUser } from '@/lib/store/user'
import Image from 'next/image';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover";

import Link from 'next/link';
import { Button } from '../ui/button';


export default function Profile() {
    const user = useUser((state: { user: any; }) => state.user);
    const setUser = useUser((state: { setUser: any; }) => state.setUser);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(undefined);
    }

    const isAdmin = user?.user_metadata?.role === "admin";


    return (
        <Popover>
            <PopoverTrigger>
                <Image
                    src={user?.user_metadata.avatar_url}
                    alt={user?.user_metadata.user_name}
                    width={50}
                    height={50}
                    className=' rounded-full ring-2 ring-green-500'
                />
            </PopoverTrigger>
            <PopoverContent className="p-2 space-y-3 devide-y">
                <div className="px-4 text-sm">
                    <p>{user?.user_metadata?.user_name}</p>
                    <p className="text-gray-500">
                        {user?.user_metadata.email}
                    </p>
                </div>
                {isAdmin && <Link href="/dashboard" className="block">
                    <PopoverClose>
                        <Button
                            className="w-full flex items-center justify-between">
                            Dashboard
                            <DashboardIcon />
                        </Button>
                    </PopoverClose>
                </Link>}
                <PopoverClose>
                    <Button
                        className="w-full flex items-center justify-between"
                        variant="ghost"
                        onClick={handleLogout}
                    >
                        Logout
                        <LockOpen1Icon />
                    </Button>
                </PopoverClose>
            </PopoverContent>
        </Popover>
    )
}

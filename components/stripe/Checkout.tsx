import React, { FormEvent, useTransition } from 'react'
import { usePathname } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { LightningBoltIcon } from '@radix-ui/react-icons'
import { checkout } from '@/lib/ations/stripe';
import { useUser } from '@/lib/store/user'
import { cn } from '@/lib/utils';
import LoginForm from '../nav/LoginForm';
import { Button } from '../ui/button'

export default function Checkout() {
    const user = useUser(state => state.user);
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const handleCheckout = (e: FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            const data = JSON.parse(await checkout(user?.user_metadata.email!, location.origin + pathname));
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
            await stripe?.redirectToCheckout({
                sessionId: data.id
            })
        });
    }

    if (!user?.id) {
        return (
            <div
                className='flex items-center h-96 w-full justify-center gap-2'>
                Please <LoginForm /> to read this post.
            </div>
        )
    }
    return (
        <form
            onSubmit={handleCheckout}
            className="h-96 w-full flex items-center justify-center">
            <Button
                className='flex flex-col p-12 gap-2 ring-2 ring-pink-500'
                variant='ghost'
            >
                <span className='flex items-center gap-2 text-2xl font-bold text-pink-500'>
                    <LightningBoltIcon
                        className={cn(
                            "text-pink-500",
                            !isPending
                                ? 'animate-bounce'
                                : 'animate-spin'
                        )}
                    />
                    Upgrade to Pro
                </span>
                <span>To read premium posts</span>
            </Button>
        </form>
    )
}
